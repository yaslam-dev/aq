import { renderHook, act } from "@testing-library/react-hooks";
import { describe, it, expect, vi, afterEach } from "vitest";
import { ChartData, CountryEmission } from "@/types";
import useCharts from "./useCharts";

const mockGroupByYearSorted: Partial<Record<number, Array<CountryEmission>>> = {
  1961: [
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
    },
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
    },
  ],
  1962: [
    {
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
    },

    {
      countryCode: 2,
      countryName: "Country B",
      shortName: "B",
      carbon: 25,
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
    },
  ],
};

const mockYears = [1961, 1962];

describe("useCharts hook", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should initialize with the first year", () => {
    const { result } = renderHook(() =>
      useCharts(mockGroupByYearSorted, mockYears)
    );

    expect(result.current.currentYearMemo).toBe(1961);
  });

  it("should calculate global total correctly", () => {
    const { result } = renderHook(() =>
      useCharts(mockGroupByYearSorted, mockYears)
    );

    expect(result.current.globalTotal).toBe(3000);
  });

  it("should return top emissions data", () => {
    const { result } = renderHook(() =>
      useCharts(mockGroupByYearSorted, mockYears)
    );

    const expectedTopEmissions: ChartData[] = [
      { key: 1, shortName: "A", country: "Country A", value: 1000 },
      { key: 2, shortName: "B", country: "Country B", value: 2000 },
    ];

    expect(result.current.chartDataByTopEmissions).toEqual(
      expectedTopEmissions
    );
  });

  it("should update year and recalculate data after interval", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() =>
      useCharts(mockGroupByYearSorted, mockYears)
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.currentYearMemo).toBe(1962);
    expect(result.current.globalTotal).toBe(4000);

    const expectedTopEmissions: ChartData[] = [
      { key: 1, shortName: "A", country: "Country A", value: 1500 },
      { key: 2, shortName: "B", country: "Country B", value: 2500 },
    ];

    expect(result.current.chartDataByTopEmissions).toEqual(
      expectedTopEmissions
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.currentYearMemo).toBe(1961);
  });
});
