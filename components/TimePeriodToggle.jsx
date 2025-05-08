"use client";
import React, { useState } from "react";
import { time } from "@/app/context/context";

const TimePeriodList = () => {
  const [selected, setSelected] = useState(1);

  const listVals = [
    "This Week",
    "This Month",
    "Last Month",
    "This Year",
    "Last 12 Months",
  ];

  return (
    <ul className="flex-wrap items-center justify-center p-1 text-gray-900 border flex rounded-lg">
      {listVals.map((item, index) => (
        <div key={index} className="flex flex-row">
          <li>
            <button
              onClick={() => setSelected(index)}
              className={`px-2 hover:text-blue-500 ${
                selected === index ? "text-blue-500" : ""
              }`}
            >
              {item}
            </button>
          </li>
          {index != listVals.length - 1 && (
            <div className="min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25"></div>
          )}
        </div>
      ))}
    </ul>
  );
};

export default TimePeriodList;