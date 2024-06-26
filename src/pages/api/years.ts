// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";
import path from "path";
import { TWELVE_HOURS_TO_SECONDS } from "@/utils/constants";

async function getYearsData() {
    try {
        const filePath = path.join(process.cwd(), "public", "years.json");
        const countriesData = await fs.readFile(filePath, "utf8");
        return countriesData;
    } catch (error) {
        return error;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await getYearsData()
        res.setHeader('Cache-Control', `s-maxage=${TWELVE_HOURS_TO_SECONDS}`);
        res.status(200).json({ result })
    } catch (err) {
        res.status(500).json({ err })
    }
}
