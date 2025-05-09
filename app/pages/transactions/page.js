"use client";
import AddTransactionDialog from "@/components/AddTransactionDialog";
import TimePeriodList from "@/components/TimePeriodToggle";
import TransactionTable from "@/components/TransactionTable";
import React, { useState } from "react";

const page = () => {
  const [timePeriod, setTimePeriod] = useState("week"); // Default to "week"

  return (
    <div className="mt-8 px-32">
      <div className="flex items-center justify-between mb-6">
        <div className="text-3xl font-medium text-gray-900">Transactions</div>
        <div className="flex items-center space-x-4">
          {/* Pass timePeriod and setTimePeriod as props */}
          <TimePeriodList selectedPeriod={timePeriod} onChange={setTimePeriod} />
          <AddTransactionDialog />
        </div>
      </div>

      {/* Pass selected timePeriod to TransactionTable */}
      <TransactionTable timePeriod={timePeriod} />
    </div>
  );
};

export default page;

