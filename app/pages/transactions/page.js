"use client";

import AddTransactionDialog from "@/components/AddTransactionDialog";
import TimePeriodList from "@/components/TimePeriodToggle";
import TransactionTable from "@/components/TransactionTable";
import React, { useState } from "react";

const Page = () => {
  const [timePeriod, setTimePeriod] = useState("week");
  const [refreshFlag, setRefreshFlag] = useState(false); // ✅ Add this

  // ✅ Triggered when a transaction is added
  const handleTransactionAdded = () => {
    setRefreshFlag((prev) => !prev); // toggle the flag to refetch
  };

  return (
    <div className="mt-8 px-32">
      <div className="flex items-center justify-between mb-6">
        <div className="text-3xl font-medium text-gray-900">Transactions</div>
        <div className="flex items-center space-x-4">
          <TimePeriodList selectedPeriod={timePeriod} onChange={setTimePeriod} />
          <AddTransactionDialog onTransactionAdded={handleTransactionAdded} />
        </div>
      </div>

      <TransactionTable timePeriod={timePeriod} refreshFlag={refreshFlag} />
    </div>
  );
};

export default Page;
