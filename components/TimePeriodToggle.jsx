const listVals = [
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Last Month", value: "lastMonth" },
  { label: "This Year", value: "year" },
  { label: "Last 12 Months", value: "last12" },
];

export default function TimePeriodList({ selectedPeriod, onChange }) {
  return (
    <ul className="flex flex-wrap items-center justify-center rounded-lg border border-border bg-background p-1 text-foreground">
      {listVals.map((item, index) => (
        <div key={item.value} className="flex flex-row items-center">
          <li>
            <button
              onClick={() => onChange(item.value)}
              className={`px-2 py-1 transition-colors hover:text-primary ${
                selectedPeriod === item.value
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </button>
          </li>
          {index !== listVals.length - 1 && (
            <div className="mx-1 h-4 w-px self-stretch bg-border opacity-25" />
          )}
        </div>
      ))}
    </ul>
  );
}
