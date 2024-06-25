// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Country } from "@/types";
import footprintApi from "@/utils/footprintApi";
import path from "path";
import { promises as fs } from "fs";

export const config = {
    api: {
        responseLimit: false,
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
    maxDuration: 1000,
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const countries: Array<Country> = req.body.countries;
        const filePath = path.join(process.cwd(), "public", "results.json");
        // Check if the file already exists
        try {
            const fileData = await fs.readFile(filePath, "utf-8");
            const jsonData = JSON.parse(fileData);
            res.setHeader("Cache-Control", "s-maxage=43200");
            return res.status(200).json({ result: jsonData });
        } catch (err) {
            // Fetch data from the API
            const result = await footprintApi.batchedGetDataForCountry(countries);

            // Store the result in a JSON file
            await fs.mkdir(path.dirname(filePath), { recursive: true });
            await fs.writeFile(filePath, JSON.stringify(result, null, 2), "utf-8");

            res.setHeader("Cache-Control", "s-maxage=43200");
            res.status(200).json({ result });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}
