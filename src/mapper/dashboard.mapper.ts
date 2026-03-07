import {DashboardAnalyticsResponse, StatCardProps} from "@/types/Dashboard";
import {AlertCircle, DollarSign, RotateCcw, TrendingDown} from "lucide-react";
import {formatCurrency, getTrendDirection} from "@/utils/helper";

export function analyticsToCardsMapper(
    data: DashboardAnalyticsResponse
): {
    statCards: StatCardProps[];
    net: number;
} {
    // Income Card
    const incomeCard: StatCardProps = {
        label: "Income",
        value: formatCurrency(data.income.current),
        change: data.income.percentageChange,
        description: data.income.message,
        footer: `Previous: ${formatCurrency(data.income.previous)}`,
        trend: getTrendDirection(data.income.trend),
        icon: DollarSign,
    };

    // Expense Card
    const expenseCard: StatCardProps = {
        label: "Expenses",
        value: formatCurrency(data.expense.current),
        change: data.expense.percentageChange,
        description: data.expense.message,
        footer: `Previous: ${formatCurrency(data.expense.previous)}`,
        trend: getTrendDirection(data.expense.trend),
        icon: TrendingDown,
    };

    // Recurring Card
    const recurringCard: StatCardProps = {
        label: "Recurring Payments",
        value: formatCurrency(data.recurring.totalSum),
        change: 0,
        description: `${data.recurring.totalCount} payments`,
        footer: data.recurring.message,
        icon: RotateCcw,
    };

    // Reminders Card
    const remindersCard: StatCardProps = {
        label: "Payment Reminders",
        value: data.reminders.totalReminders,
        change: data.reminders.overdueCount > 0 ? -100 : 0,
        description: data.reminders.message,
        footer: data.reminders.overdueCount > 0
            ? `${data.reminders.overdueCount} overdue`
            : `${data.reminders.dueSoonCount} due soon`,
        trend: data.reminders.overdueCount > 0 ? "down" : "up",
        icon: AlertCircle,
    };

    return {
        statCards: [incomeCard, expenseCard, recurringCard, remindersCard],
        net: data.net,
    };
}