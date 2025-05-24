import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  getUserTransactions,
  calculateTotals,
  getLast30DaysTransactions,
  groupTransactionsByDay,
} from "@/lib/db/dashboard";

import CreditCard from "@/components/CreditCard";
import IncomeExpenseBarChart from "@/components/BarChart";
import SavingsPreview from "@/components/SavingsPreview";
import TransactionTableDashboard from "@/components/TransactionTableD";


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
    <div className="pt-8 px-4 sm:px-8 lg:px-12 min-h-screen space-y-6">
      <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 dark:text-gray-100">
        Welcome, {session.user.email}!
      </h1>

      {/* Row 1: CreditCard + Chart */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[30%] w-full">
          <CreditCard
            username={session.user.email}
            balance={balance}
            income={income}
            expense={expense}
          />
        </div>
        <div className="lg:w-[70%] w-full p-4 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-800 shadow-lg">
          <div className="h-[260px]">
            <IncomeExpenseBarChart
      labels={labels}
      incomeData={incomeData}
      expenseData={expenseData}
    />
          </div>
        </div>
      </div>

      {/* Row 2: Transactions + Savings */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[70%] w-full p-4 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-800 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Latest Transactions
          </h2>
          <TransactionTableDashboard />
        </div>

        <div className="lg:w-[30%] w-full p-4 border rounded-lg bg-white dark:bg-gray-900 dark:border-gray-800 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Savings Snapshot
          </h2>
          <SavingsPreview />
        </div>
      </div>
    </div>
  );
}

