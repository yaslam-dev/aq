import { Country, CountryEmission, KeyedEmissions } from "@/types";
import { groupBy } from "@/utils";
import { useMemo } from "react";

const useCountries = (
  countries: Array<Country>,
  years: Array<number>,
  batchedAllCountriesCarbonData: Array<KeyedEmissions>
) => {
  const countriesMemo = useMemo(() => {
    return countries;
  }, [countries]);

  const yearsMemo = useMemo(() => {
    return years.sort((a, b) => a - b);
  }, [years]);

  /**
   *  converts [{"1": {}, "2": {}, "3": {}}, {"4": {}, ...}] to [{}, {}, {}]
   */
  const flattenedAndToArray = useMemo(() => {
    const arr: CountryEmission[] = [];

    const flattenBatchedCountries = batchedAllCountriesCarbonData.flat();

    for (let i = 0; i < flattenBatchedCountries.length; i++) {
      const s = flattenBatchedCountries[i];
      const keys = Object.keys(s);
      for (let j = 0; j < keys.length; j++) {
        const key = keys[j];
        const item = flattenBatchedCountries[i][key];
        arr.push(item);
      }
    }
    return arr;
  }, [batchedAllCountriesCarbonData]);

  /**
   * converts [{ year: 1961, code: 1}] to ["1961": [{code: 1, year: 1961}]]
   */
  const groupByYearUnsorted = useMemo(() => {
    return groupBy(flattenedAndToArray, (item) => item.year);
  }, [flattenedAndToArray, yearsMemo]);

  /**
   * Filter [{year: 1961, record: 'EFConsPerCap'}]  record === EFConsPerCap values only
   */
  const filterByEFConsPerCap = useMemo(() => {
    const obj: Partial<Record<number, CountryEmission[]>> = {};

    const keys = Object.keys(groupByYearUnsorted);
    for (let i = 0; i < keys.length; i++) {
      const key = Number(keys[i]);
      const foundByYear = groupByYearUnsorted[key];
      if (foundByYear) {
        const EFConsPerCap = foundByYear.filter(
          (item) => item.record === "EFConsPerCap"
        );
        obj[key] = [...EFConsPerCap];
      }
    }
    return obj;
  }, [groupByYearUnsorted]);

  /**
   * Iterating through each year key then sorting values in descending order
   */
  const groupByYearSorted = useMemo(() => {
    const obj: Partial<Record<number, CountryEmission[]>> = {};
    const keys = Object.keys(filterByEFConsPerCap);

    for (let i = 0; i < keys.length; i++) {
      const key = Number(keys[i]);
      const foundByYear = filterByEFConsPerCap[key];
      if (foundByYear) {
        const sortedFoundByYear = foundByYear.toSorted(
          (a, b) => b.carbon - a.carbon
        );
        obj[key] = [...sortedFoundByYear];
      }
    }
    return obj;
  }, [filterByEFConsPerCap]);

  return {
    countriesMemo,
    yearsMemo,
    groupByYearSorted,
  };
};

export default useCountries;
