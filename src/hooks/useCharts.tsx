import { useState, useMemo, useEffect } from "react";
import { ChartData, CountryEmission } from "@/types";

export const useCharts = (
  groupByYearSorted: Partial<Record<number, Array<CountryEmission>>>,
  years: number[]
) => {
  const [currentYearIndex, setCurrentYearIndex] = useState<number>(0);

  const currentYearMemo = useMemo(() => {
    return years[currentYearIndex];
  }, [years, currentYearIndex]);

  const chartData: ChartData[] | undefined = useMemo(() => {
    const groupByYearSortedEmissions = groupByYearSorted[currentYearMemo];
    if (!groupByYearSortedEmissions) return undefined;

    return groupByYearSortedEmissions.map(
      (item) =>
        ({
          key: item.countryCode,
          shortName: item.shortName.toString(),
          country: item.countryName.toString(),
          value: (item.carbon * 100) | 0,
        } satisfies ChartData)
    );
  }, [groupByYearSorted, currentYearMemo]);

  const chartDataByTopEmissions = useMemo(() => {
    if (!chartData) return undefined;

    return chartData.slice(0, 11);
  }, [chartData]);

  const globalTotal: number | undefined = useMemo(() => {
    if (!chartData) return undefined;

    return chartData.reduce((a, b) => {
      return a + b.value;
    }, 0);
  }, [chartData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentYearIndex((prevIndex) => (prevIndex + 1) % years.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [years.length]);

  return {
    currentYearMemo,
    globalTotal,
    chartDataByTopEmissions,
  };
};

export default useCharts;
