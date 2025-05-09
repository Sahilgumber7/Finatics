const listVals = [
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "Last Month", value: "lastMonth" },
    { label: "This Year", value: "year" },
    { label: "Last 12 Months", value: "last12" },
  ];
  
  export default function TimePeriodList({ selectedPeriod, onChange }) {
    return (
      <ul className="flex-wrap items-center justify-center p-1 text-gray-900 border flex rounded-lg">
        {listVals.map((item, index) => (
          <div key={item.value} className="flex flex-row">
            <li>
              <button
                onClick={() => onChange(item.value)}
                className={`px-2 hover:text-blue-500 ${
                  selectedPeriod === item.value ? "text-blue-500 font-semibold" : ""
                }`}
              >
                {item.label}
              </button>
            </li>
            {index !== listVals.length - 1 && (
              <div className="min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25"></div>
            )}
          </div>
        ))}
      </ul>
    );
  }
  