"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { calculateScore } from "@/lib/scoring";
import { UserWeekDetails } from "../participant-form/week-client-form";

const chartConfig: Record<string, { label: string; color: string }> = {
  score: {
    label: "Score",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function WeeklyBarChart({
  weeklyUserProgress,
}: {
  weeklyUserProgress: UserWeekDetails[];
}) {
  const chartData = calculateScore(weeklyUserProgress);
  console.log(chartData);
  return (
    <Card className="w-full min-h-[550px]">
      <CardHeader>
        <CardTitle>Weekly Score</CardTitle>
        <CardDescription>Nov 2024 - January 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full min-h-[350px]">
          <BarChart
            height={400}
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 10 }}
            style={{ width: "100%", height: "100%" }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="week"
              type="category"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => `Week ${value}`}
              style={{ fontSize: "0.8rem" }}
              className="w-full h-full"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="score" fill={chartConfig.score.color} radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Weekly score track <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing weekly score breakdown
        </div>
      </CardFooter>
    </Card>
  );
}
