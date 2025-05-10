"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/**
 * @param {{ labels: string[], incomeData: number[], expenseData: number[] }}
 */
const SplineChart = ({ labels, incomeData, expenseData }) => {
  const chartData = labels.map((date, index) => ({
    date,
    income: incomeData[index],
    expense: expenseData[index],
  }));

  const chartConfig = {
    income: {
      label: "Income",
      color: "#22c55e", // green-500
    },
    expense: {
      label: "Expense",
      color: "#ef4444", // red-500
    },
  };

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Daily Income vs Expense</CardTitle>
        <CardDescription>Last 30 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
          data={chartData}
          margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)} // MM-DD
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="income"
              type="monotone"
              stroke={chartConfig.income.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="expense"
              type="monotone"
              stroke={chartConfig.expense.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          30-day performance trend <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SplineChart;
