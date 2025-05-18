// pages/dashboard.js

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getUserTransactions,
  calculateTotals,
  getLast30DaysTransactions,
  groupTransactionsByDay,
} from "@/lib/db/dashboard";
import CreditCard from "@/components/CreditCard";
import SplineChart from "@/components/SplineChart";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="text-center mt-20 text-lg text-gray-700">
        Please log in to access the dashboard.
      </div>
    );
  }

  

  const transactions = await getUserTransactions(session.user.id);
  const { income, expense, balance } = calculateTotals(transactions);

  const dailyTransactions = await getLast30DaysTransactions(session.user.id);
  const groupedData = groupTransactionsByDay(dailyTransactions);

  const labels = Object.keys(groupedData);
  const incomeData = labels.map((date) => groupedData[date].income);
  const expenseData = labels.map((date) => groupedData[date].expense);

  return (
    <div className="pt-8 px-12">
      <h1 className="text-3xl font-medium text-gray-900 dark:text-gray-100">
        Welcome, {session.user.email}!
      </h1>

      <div className="flex space-x-6 items-stretch">
        {/* Credit Card - 30% */}
        <div className="w-[30%] h-full">
          <CreditCard
            username={session.user.email}
            balance={balance}
            income={income}
            expense={expense}
          />
        </div>

        {/* Chart - 70% */}
        <div className="w-[40%] h-full p-4 border rounded-lg bg-white shadow-lg">
          <SplineChart
            labels={labels}
            incomeData={incomeData}
            expenseData={expenseData}
          />
        </div>
        <div className="p-4 border rounded-lg bg-white shadow-lg">
        </div>
      </div>
    </div>
  );
}
