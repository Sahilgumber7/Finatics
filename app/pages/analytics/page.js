import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getLast30DaysTransactions,
  groupTransactionsByDay,
} from "@/lib/db/dashboard";
import SplineChart from "@/components/SplineChart";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="text-center mt-20 text-lg text-gray-700">
        Please log in to view your analytics.
      </div>
    );
  }

  const dailyTransactions = await getLast30DaysTransactions(session.user.id);
  const groupedData = groupTransactionsByDay(dailyTransactions);

  const labels = Object.keys(groupedData);
  const incomeData = labels.map((date) => groupedData[date].income);
  const expenseData = labels.map((date) => groupedData[date].expense);

  return (
    <div className="pt-8 px-12">
      <h2 className="text-3xl font-medium text-gray-900 dark:text-gray-100">Analytics Overview</h2>
      <div className="flex flex-wrap gap-6">
        {/* Spline Chart: Income vs Expense */}
        <div className="w-full md:w-[60%] p-4 border rounded-lg bg-white shadow-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Income vs Expense (Last 30 Days)
          </h2>
          <SplineChart
            labels={labels}
            incomeData={incomeData}
            expenseData={expenseData}
          />
        </div>
      </div>
    </div>
  );
}
