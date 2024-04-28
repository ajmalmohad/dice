"use client";

import { PieChart } from "react-minimal-pie-chart";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

type DonutStatProps = {
  ActiveCred: number;
  PendingCred: number;
  className?: string;
};

type chartDataProps = { title: string; value: number; color: string };

function makeTooltipContent(entry: {
  active: number;
  pending: number;
  hoveredIndex: number | null;
}) {
  switch (entry.hoveredIndex) {
  case 0:
    return entry.active + " " + "Active Credentials";
  case 1:
    return entry.pending + " " + "Pending Credentials";
  case 2:
    return "No Credentials issued so far!";
  default:
    return "";
  }
}

export const DonutStat = ({
  ActiveCred,
  PendingCred,
  className,
}: DonutStatProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chartData: chartDataProps[] = [];
  if (ActiveCred <= 0 && PendingCred <= 0) {
    chartData.push({
      title: "No Credentials",
      value: -1,
      color: hoveredIndex === 2 ? "#323232" : "#505050",
    });
  } else {
    if (ActiveCred > 0) {
      chartData.push({
        title: "Active Credentials",
        value: ActiveCred,
        color: hoveredIndex === 0 ? "#16A34A" : "#22E55E",
      });
    }
    if (PendingCred > 0) {
      chartData.push({
        title: "Pending Credentials",
        value: PendingCred,
        color: hoveredIndex === 1 ? "#EA580C" : "#F97316",
      });
    }
  }
  return (
    <div className={className} data-tooltip-id="chart">
      <PieChart
        lineWidth={60}
        segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
        animate
        data={chartData}
        label={({ dataEntry }) =>
          dataEntry.value == -1 ? "" : Math.round(dataEntry.percentage) + "%"
        }
        labelStyle={(index) => ({
          fontSize: "10px",
          fontWeight: "600",
          fill: "#FFFFFF",
          opacity: hoveredIndex === index ? 1.0 : 0.75,
          pointerEvents: "none",
        })}
        labelPosition={70}
        onMouseOver={(_, index) => {
          if (ActiveCred <= 0 && PendingCred <= 0) {
            setHoveredIndex(2);
          } else if (ActiveCred <= 0) {
            setHoveredIndex(1);
          } else {
            setHoveredIndex(index);
          }
        }}
        onMouseOut={() => {
          setHoveredIndex(null);
        }}
      />
      <Tooltip
        id="chart"
        content={makeTooltipContent({
          active: ActiveCred,
          pending: PendingCred,
          hoveredIndex: hoveredIndex,
        })}
        float={true}
      />
    </div>
  );
};
