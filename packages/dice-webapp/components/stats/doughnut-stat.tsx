"use client";

import { PieChart, pieChartDefaultProps, PieChartProps } from "react-minimal-pie-chart";
import React, { useState } from "react";
import { Tooltip } from 'react-tooltip'

type StatCardProps = {
  ActiveCred: number;
  PendingCred: number;
};

function makeTooltipContent(
  entry: any
) {
  switch (entry.hoveredIndex) {
  case 0:
    return entry.active + " Active Credentials";
  case 1:
    return entry.pending + " Pending Credentials";
  default:
    return "";
  }
}

export const DoughnutStat = ({ ActiveCred, PendingCred }: StatCardProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const lineWidth = 60;
  return (
    <div data-tooltip-id="chart">
      <PieChart
        radius={pieChartDefaultProps.radius - 10}
        lineWidth={60}
        paddingAngle={hoveredIndex !== null ? 0.35 : 0}
        segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
        animate
        data={[
          {
            title: "Active Credentials",
            value: ActiveCred,
            color: hoveredIndex === 0 ? "#16A34A" : "#22E55E",
            tooltip: "Active",
          },
          {
            title: "Pending Credentials",
            value: PendingCred,
            color: hoveredIndex === 1 ? "#EA580C" : "#F97316",
            tooltip: "Pending",
          },
        ]}
        label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
        labelStyle={(index) => ({
          fontFamily:
            '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
          fontSize: "5px",
          fontWeight: "600",
          fill: "#FFFFFF",
          opacity: hoveredIndex === index ? 1.0 : 0.75,
          pointerEvents: "none",
        })}
        labelPosition={100 - lineWidth / 2}
        onMouseOver={(_, index) => {
          setHoveredIndex(index);
        }}
        onMouseOut={() => {
          setHoveredIndex(null);
        }}
      />
      <Tooltip id="chart" content={makeTooltipContent({
        active: ActiveCred,
        pending: PendingCred,
        hoveredIndex: hoveredIndex,
      })} float={true} />
    </div>
  );
};
