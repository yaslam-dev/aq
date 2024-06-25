// Inspired from https://codepen.io/frontendcharts/pen/jpGYoV/

import React, { useMemo } from "react";
import { ChartData } from "@/types";
import styles from "./BarChart.module.css";

interface Props {
  width: number;
  height: number;
  data: ChartData[];
}

const barPadding = 1;
const barColour = "#348AA7";

function BarGroup({
  d,
  barHeight,
  maxBarWidth,
  chartWidth,
}: {
  d: ChartData;
  barHeight: number;
  maxBarWidth: number;
  chartWidth: number;
}) {
  const availableWidth = chartWidth - 280;
  const widthScale = useMemo(
    () => (d.value / maxBarWidth) * availableWidth,
    [d.value, maxBarWidth, availableWidth]
  );

  const yMid = barHeight * 0.5;
  const labelInside = widthScale > 40; // Threshold to decide label position

  return (
    <g className={styles.barGroup}>
      <text
        className={styles.nameLabel}
        x="-10"
        y={yMid}
        alignmentBaseline="middle"
      >
        {d.shortName}
      </text>
      <rect
        y={barPadding * 0.5}
        width={widthScale}
        height={barHeight - barPadding}
        fill={barColour}
      />
      <text
        className={styles.valueLabel}
        x={labelInside ? widthScale - 5 : widthScale + 5}
        y={yMid}
        alignmentBaseline="middle"
        textAnchor={labelInside ? "end" : "start"}
        fill={labelInside ? "#fff" : "#000"}
      >
        {d.value}
      </text>
    </g>
  );
}

const BarChartSVG = ({ data, width, height }: Props) => {
  const maxBarWidth = useMemo(
    () => Math.max(...data.map((item) => item.value)),
    [data]
  );

  const barHeight = useMemo(
    () => Math.min(50, (height - 60) / data.length),
    [height, data.length]
  );
  const chartHeight = barHeight * data.length;

  const barGroups = useMemo(() => {
    return data.map((d, i) => (
      <g key={i} transform={`translate(0, ${i * barHeight})`}>
        <BarGroup
          d={d}
          barHeight={barHeight}
          maxBarWidth={maxBarWidth}
          chartWidth={width}
        />
      </g>
    ));
  }, [data, barHeight, width]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${chartHeight + 60}`}
    >
      <g className="container">
        <g className="chart" transform="translate(250,30)">
          {barGroups}
        </g>
      </g>
    </svg>
  );
};

export default BarChartSVG;
