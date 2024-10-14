"use client";

import * as React from "react";
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts";

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {ChartData} from "@/lib/types";

const chartConfig = {
  Users: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
  Sales: {
    label: "Sales",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartBox({chartData}: {chartData: ChartData[]}) {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("Users");

  const total = React.useMemo(
    () => ({
      Users: chartData.reduce((acc, curr) => acc + curr.Users, 0),
      Sales: chartData.reduce((acc, curr) => acc + curr.Sales, 0),
    }),
    []
  );

  return (
    <Card className="bg-secondary border-foreground/40">
      <CardHeader className="flex items-stretch border-b p-0 border-foreground/40">
        <div className="flex">
          {["Users", "Sales"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left data-[active=true]:bg-popover odd:rounded-tl-lg even:rounded-tr-lg sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {chartConfig[chart].label == "Sales" ? "$" : ""}
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            {/* <XAxisWrapper /> */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: any) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export const XAxisWrapper = () => (
  <XAxis
    dataKey="date"
    tickLine={false}
    axisLine={false}
    tickMargin={8}
    minTickGap={32}
    tickFormatter={(value: any) => {
      const date = new Date(value);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }}
  />
);
