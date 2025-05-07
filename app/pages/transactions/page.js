"use client";
import TimePeriodList from "@/components/TimePeriodToggle";
import TransactionTable from "@/components/TransactionTable";
import React from "react";

const page = () => {
  return (
    <>
      <div className="mt-8 px-32 ">
        <div className="text-3xl font-medium text-grey-900 mb-6">Transactions</div>
        <div>
          <TimePeriodList />
          <TransactionTable />
        </div>
      </div>
    </>
  );
};

export default page;