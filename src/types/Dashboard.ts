// API Response Types
export interface MetricTrend {
    current: number;
    previous: number;
    trend: "Up" | "Down" | "Flat";
    message: string;
    percentageChange: number;
    net: number | null;
}

export interface RecurringData {
    totalCount: number;
    totalSum: number;
    message: string;
}

export interface RemindersData {
    overdueCount: number;
    dueSoonCount: number;
    totalReminders: number;
    nextDueDate: string | null;
    message: string;
}

export interface DashboardAnalyticsResponse {
    income: MetricTrend;
    expense: MetricTrend;
    recurring: RecurringData;
    reminders: RemindersData;
    net: number;
}

// Card Component Types
export interface StatCardProps {
    label: string;
    value: string | number;
    change: number;
    description: string;
    footer: string;
    trend?: "up" | "down";
    icon?: React.ComponentType<{ className?: string }>;
}

export interface SectionCardsProps {
    cards: StatCardProps[];
}