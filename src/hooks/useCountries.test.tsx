import { renderHook } from "@testing-library/react-hooks";
import { describe, it, expect, afterEach, vi } from "vitest";
import useCountries from "./useCountries";
import { Country, CountryEmission, KeyedEmissions } from "@/types";
import { cleanup } from "@testing-library/react";

const mockYears = [1961, 1962];
const mockCountries: Country[] = [
  {
    countryCode: 1,
    countryName: "Country A",
    shortName: "A",
    isoa2: "",
    score: "3A",
  },
  {
    countryCode: 2,
    countryName: "Country B",
    shortName: "B",
    isoa2: "B2",
    score: "3A",
  },
];
const mockBatchedAllCountriesCarbonData: KeyedEmissions[] = [
  {
    "1": {
      countryCode: 1,
      countryName: "Country A",
      shortName: "A",
      carbon: 10,
      year: 1961,
      cropLand: 1,
      isoa2: "",
      record: "EFConsPerCap",
      value: 1,
      grazingLand: 1,
      fishingGround: 1,
      forestLand: 1,
      score: "3A",
      builtupLand: 1,
    } satisfies CountryEmission,
    "2": {
      countryCode: 2,
      countryName: "Country B",
      shortName: "B",
      carbon: 20,
      year: 1961,
      cropLand: 1,
      isoa2: "",
      record: "EFConsPerCap",
      value: 1,
      grazingLand: 1,
      fishingGround: 1,
      forestLand: 1,
      score: "3A",
      builtupLand: 1,
    } satisfies CountryEmission,
  },
  {
    "3": {
      countryCode: 1,
      countryName: "Country A",
      shortName: "A",
      carbon: 15,
      year: 1962,
      cropLand: 1,
      isoa2: "",
      record: "EFConsPerCap",
      value: 1,
      grazingLand: 1,
      fishingGround: 1,
      forestLand: 1,
      score: "3A",
      builtupLand: 1,
    } satisfies CountryEmission,
    "4": {
      countryCode: 2,
      countryName: "Country B",
      shortName: "B",
      carbon: 40,
      year: 1962,
      cropLand: 1,
      isoa2: "",
      record: "EFConsPerCap",
      value: 1,
      grazingLand: 1,
      fishingGround: 1,
      forestLand: 1,
      score: "3A",
      builtupLand: 1,
    } satisfies CountryEmission,
    "5": {
      countryCode: 1,
      countryName: "Country A",
      shortName: "A",
      carbon: 10,
      year: 1961,
      cropLand: 1,
      isoa2: "",
      record: "EFConsTotGHA",
      value: 1,
      grazingLand: 1,
      fishingGround: 1,
      forestLand: 1,
      score: "3A",
      builtupLand: 1,
    } satisfies CountryEmission,
    "6": {
      countryCode: 1,
      countryName: "Country A",
      shortName: "A",
      carbon: 10,
      year: 1962,
      cropLand: 1,
      isoa2: "",
      record: "EFConsTotGHA",
      value: 1,
      grazingLand: 1,
      fishingGround: 1,
      forestLand: 1,
      score: "3A",
      builtupLand: 1,
    } satisfies CountryEmission,
  },
];

describe("useCountries hook", () => {
  afterEach(() => {
    cleanup();
  });

  it("should memoize countries and sort years", () => {
    const { result } = renderHook(() =>
      useCountries(mockCountries, mockYears, mockBatchedAllCountriesCarbonData)
    );

    expect(result.current.countriesMemo).toBe(mockCountries);
    expect(result.current.yearsMemo).toEqual([1961, 1962]);
  });

  it("should sort data by year and carbon emissions correctly", () => {
    const { result } = renderHook(() =>
      useCountries(mockCountries, mockYears, mockBatchedAllCountriesCarbonData)
    );

    const expectedSortedData = {
      1961: [
        {
          countryCode: 2,
          countryName: "Country B",
          shortName: "B",
          carbon: 20,
          year: 1961,
          cropLand: 1,
          isoa2: "",
          record: "EFConsPerCap",
          value: 1,
          grazingLand: 1,
          fishingGround: 1,
          forestLand: 1,
          score: "3A",
          builtupLand: 1,
        } satisfies CountryEmission,
        {
          countryCode: 1,
          countryName: "Country A",
          shortName: "A",
          carbon: 10,
          year: 1961,
          cropLand: 1,
          isoa2: "",
          record: "EFConsPerCap",
          value: 1,
          grazingLand: 1,
          fishingGround: 1,
          forestLand: 1,
          score: "3A",
          builtupLand: 1,
        } satisfies CountryEmission,
      ],
      1962: [
        {
          countryCode: 2,
          countryName: "Country B",
          shortName: "B",
          carbon: 40,
          year: 1962,
          cropLand: 1,
          isoa2: "",
          record: "EFConsPerCap",
          value: 1,
          grazingLand: 1,
          fishingGround: 1,
          forestLand: 1,
          score: "3A",
          builtupLand: 1,
        } satisfies CountryEmission,
        {
          countryCode: 1,
          countryName: "Country A",
          shortName: "A",
          carbon: 15,
          year: 1962,
          record: "EFConsPerCap",
          value: 1,
          score: "3A",
          cropLand: 1,
          fishingGround: 1,
          forestLand: 1,
          grazingLand: 1,
          isoa2: "",
          builtupLand: 1,
        } satisfies CountryEmission,
      ],
    };

    expect(result.current.groupByYearSorted).toEqual(expectedSortedData);
  });
});
