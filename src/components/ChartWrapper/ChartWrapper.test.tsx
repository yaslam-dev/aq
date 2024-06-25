import React from "react";
import {
  RenderResult,
  cleanup,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import { describe, it, expect, vi, afterEach, Mock } from "vitest";
import ChartWrapper from "./ChartWrapper";
import { useCharts } from "@/hooks";
import { CountryEmission } from "@/types";

// Mock the useCharts hook
vi.mock("@/hooks", () => ({
  useCharts: vi.fn(),
}));

const mockUseCharts = useCharts as Mock;

// Mock the ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal("ResizeObserver", ResizeObserverMock);

const mockYears = [1961, 1962];
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
      carbon: 10,
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
      carbon: 20,
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

describe("ChartWrapper component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render current year and global total", () => {
    mockUseCharts.mockReturnValue({
      currentYearMemo: 1961,
      globalTotal: 30,
      chartDataByTopEmissions: [
        { key: 1, shortName: "A", country: "Country A", value: 10 },
        { key: 2, shortName: "B", country: "Country B", value: 20 },
      ],
    });

    render(
      <ChartWrapper
        years={mockYears}
        groupByYearSorted={mockGroupByYearSorted}
      />
    );

    expect(screen.getByText("year")).toBeDefined();
    expect(screen.getByText("1961")).toBeDefined();
    expect(screen.getByText("global total")).toBeDefined();
    expect(screen.getByText("30")).toBeDefined();
  });

  it("should render the bar chart with correct data", () => {
    mockUseCharts.mockReturnValue({
      currentYearMemo: 1961,
      globalTotal: 30,
      chartDataByTopEmissions: [
        { key: 1, shortName: "A", country: "Country A", value: 10 },
        { key: 2, shortName: "B", country: "Country B", value: 20 },
      ],
    });

    const { getByTestId }: RenderResult = render(
      <ChartWrapper
        years={mockYears}
        groupByYearSorted={mockGroupByYearSorted}
      />
    );

    expect(getByTestId("Bar-Chart")).toBeDefined();
  });

  it("should not render global total when it is undefined", () => {
    mockUseCharts.mockReturnValue({
      currentYearMemo: 1961,
      globalTotal: undefined,
      chartDataByTopEmissions: undefined,
    });

    const { queryByText }: RenderResult = render(
      <ChartWrapper
        years={mockYears}
        groupByYearSorted={mockGroupByYearSorted}
      />
    );

    expect(queryByText("global total")).toBeNull();
  });

  it("should not render bar chart when chartDataByTopEmissions is undefined", () => {
    mockUseCharts.mockReturnValue({
      currentYearMemo: 1961,
      globalTotal: 30,
      chartDataByTopEmissions: undefined,
    });

    render(
      <ChartWrapper
        years={mockYears}
        groupByYearSorted={mockGroupByYearSorted}
      />
    );

    expect(screen.queryByText("A")).toBeNull();
    expect(screen.queryByText("B")).toBeNull();
  });
});
