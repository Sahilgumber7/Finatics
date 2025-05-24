"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

/**
 * @param {{ labels: string[], incomeData: number[], expenseData: number[] }}
 */
export default function IncomeExpenseBarChart({ labels, incomeData, expenseData }) {
  const data = labels.map((date, index) => ({
    date,
    income: incomeData[index],
    expense: expenseData[index],
  }));

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Income vs Expense</CardTitle>
        <CardDescription>Last 30 Days Overview</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] px-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} angle={-45} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
