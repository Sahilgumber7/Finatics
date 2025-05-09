// pages/dashboard.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserTransactions, calculateTotals, getLast30DaysTransactions, groupTransactionsByDay } from "@/lib/db/dashboard";
import CreditCard from "@/components/CreditCard";
import SplineChart from "@/components/SplineChart"; // Import the SplineChart component

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="text-center mt-20 text-lg text-gray-700">
        Please log in to access the dashboard.
      </div>
    );
  }

  // Fetching the user transactions
  const transactions = await getUserTransactions(session.user.id);
  const { income, expense, balance } = calculateTotals(transactions);

  // Fetching and grouping the transactions for the last 30 days
  const dailyTransactions = await getLast30DaysTransactions(session.user.id);
  const groupedData = groupTransactionsByDay(dailyTransactions);

  // Extracting labels and data for the chart
  const labels = Object.keys(groupedData);
  const incomeData = labels.map((date) => groupedData[date].income);
  const expenseData = labels.map((date) => groupedData[date].expense);

  return (
    <div className="pt-8 px-12 flex space-x-8">
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome, {session.user.email}!
        </h1>

        <div className="my-6">
          <CreditCard
            username={session.user.email}
            balance={balance}
            income={income}
            expense={expense}
          />
        </div>
      </div>

      {/* Spline Chart for Daily Income vs. Expense */}
      <div className="flex-none w-72 p-4 border rounded-lg bg-white shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Income vs Expense</h2>
        <SplineChart labels={labels} incomeData={incomeData} expenseData={expenseData} />
      </div>
    </div>
  );
}
