"use client";

import {ChartAreaInteractive} from "@/components/ChartAreaInteractive";
import {CardData, DashboardSectionCards,} from "@/components/DashboardSectionCard";

export default function DashboardPage() {
  const dashboardCards: CardData[] = [
    {
      label: "Total Budget",
      value: "$5,250.00",
      change: 12.5,
      description: "Trending up this month",
      footer: "Budget allocation for this period",
      trend: "up",
    },
    {
      label: "Income",
      value: "$8,500.00",
      change: 8.2,
      description: "Strong income this month",
      footer: "Total earnings received",
      trend: "up",
    },
    {
      label: "Expense",
      value: "$3,250.00",
      change: -5.3,
      description: "Down from last month",
      footer: "Total spending this period",
      trend: "down",
    },
    {
      label: "Recurring Budgets",
      value: "2",
      change: 1,
      description: "New today",
      footer: "Payments auto added today",
      trend: "up",
    },
    {
      label: "Reminders Today",
      value: "3",
      change: 0,
      description: "Pending actions",
      footer: "Payments due today",
      trend: "up",
    },
  ];

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <DashboardSectionCards cards={dashboardCards} />
        <div className="px-4 lg:px-4">
          <ChartAreaInteractive />
        </div>
        {/* <DataTable data={data} /> */}
      </div>
    </div>
  );
}