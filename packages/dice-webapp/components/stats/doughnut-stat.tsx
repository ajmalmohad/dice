"use client";
import { PieChart, pieChartDefaultProps } from "react-minimal-pie-chart";
import React, { useState } from "react";

type StatCardProps = {
  ActiveCred: number;
  PendingCred: number;
};

export const DoughnutStat = ({ ActiveCred, PendingCred }: StatCardProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const lineWidth = 60;
  return (
    <PieChart
      radius={pieChartDefaultProps.radius - 15}
      lineWidth={60}
      paddingAngle={hoveredIndex !== null ? 0.35 : 0}
      segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
      animate
      data={[
        {
          title: "Active Credentials",
          value: ActiveCred,
          color: hoveredIndex === 0 ? "#16A34A" : "#22E55E",
        },
        {
          title: "Pending Credentials",
          value: PendingCred,
          color: hoveredIndex === 1 ? "#EA580C" : "#F97316",
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
  );
};
