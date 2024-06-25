import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCharts } from "@/hooks";
import styles from "./ChartWrapper.module.css";
import { CountryEmission } from "@/types";
import BarChartSVG from "../BarChart/BarChart";

interface Props {
  years: number[];
  groupByYearSorted: Partial<Record<number, Array<CountryEmission>>>;
}

const ChartWrapper = ({ years, groupByYearSorted }: Props) => {
  const { currentYearMemo, globalTotal, chartDataByTopEmissions } = useCharts(
    groupByYearSorted,
    years
  );

  return (
    <div className={styles.chartContainer}>
      <div className={styles.dataGroup}>
        <div className={styles.dataItem}>
          <span className={styles.label}>year</span>
          <span className={styles.value}>{currentYearMemo}</span>
        </div>
        {globalTotal && (
          <div className={styles.dataItem}>
            <span className={styles.label}>global total</span>
            <span className={styles.value}>{globalTotal}</span>
          </div>
        )}
      </div>
      {chartDataByTopEmissions && (
        <div className={styles.barChartContainer} data-testid="Bar-Chart">
          <BarChartSVG
            width={600}
            height={400}
            data={chartDataByTopEmissions}
          />
        </div>
      )}
    </div>
  );
};

export default ChartWrapper;
