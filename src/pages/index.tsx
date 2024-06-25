import Head from "next/head";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout/Layout";
import ChartWrapper from "@/components/ChartWrapper/ChartWrapper";
import { GetStaticProps } from "next";
import { Country, KeyedEmissions } from "@/types";
import useCountries from "@/hooks/useCountries";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  countries: Array<Country>;
  years: Array<number>;
  batchedAllCountriesCarbonData: Array<KeyedEmissions>;
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps = (async () => {
  const [countriesRaw, yearsRaw] = await Promise.all([
    fetch("http:localhost:3000/api/countries"),
    fetch("http:localhost:3000/api/years"),
  ]);

  const [countriesResult, yearsResult] = await Promise.all([
    countriesRaw.json(),
    yearsRaw.json(),
  ]);

  const countries = JSON.parse(countriesResult.result);
  const years: Array<{ year: number }> = JSON.parse(yearsResult.result);
  const yearsMappedToSingleArray = years.map((item) => item.year);

  const batchedAllCountriesCarbonDataRaw = await fetch(
    "http:localhost:3000/api/countriesCarbon",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ countries }),
    }
  );

  const batchedAllCountriesCarbonDataResult =
    await batchedAllCountriesCarbonDataRaw.json();

  const batchedAllCountriesCarbonData =
    batchedAllCountriesCarbonDataResult.result;

  return {
    props: {
      countries,
      years: yearsMappedToSingleArray,
      batchedAllCountriesCarbonData,
    },
    // Next.js will attempt to re-generate the page:
    revalidate: 43200, // 12 hours to seconds
  };
}) satisfies GetStaticProps<Props>;

export default function Home({
  countries,
  years,
  batchedAllCountriesCarbonData,
}: Props) {
  const { groupByYearSorted, yearsMemo } = useCountries(
    countries,
    years,
    batchedAllCountriesCarbonData
  );

  return (
    <>
      <Head>
        <title>Historic global carbon footprint</title>
        <meta name="description" content="Historic global carbon footprint" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <Layout>
          <ChartWrapper
            groupByYearSorted={groupByYearSorted}
            years={yearsMemo}
          />
        </Layout>
      </main>
    </>
  );
}
