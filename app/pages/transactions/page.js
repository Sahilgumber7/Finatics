"use client";
import TimePeriodList from "@/components/TimePeriodToggle";
import TransactionTable from "@/components/TransactionTable";
import React from "react";

const page = () => {
  return (
    <div className="mt-8 px-32">
      {/* Header + TimePeriod in a row */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-3xl font-medium text-gray-900">Transactions</div>
        <TimePeriodList />
      </div>

      {/* Table below */}
      <TransactionTable />
    </div>
  );
};

export default page;
