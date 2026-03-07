import {BudgetResponse, BudgetType, FilterCondition} from "@/types/budget.types";

/**
 * Formats a number to USD currency string
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

/**
 * Converts BudgetType enum to readable label
 * @param type - The budget type
 * @returns Formatted budget type label
 */
export function formatBudgetType(type: BudgetType): string {
    const typeMap: Record<BudgetType, string> = {
        INCOME: "Income",
        EXPENSE: "Expense",
        SAVINGS: "Savings",
        INVESTMENT: "Investment",
        EXTRA: "Extra",
    };
    return typeMap[type] || type;
}

/**
 * Returns Tailwind color classes for budget type badge
 * @param type - The budget type
 * @returns Tailwind color class string
 */
export function getBudgetTypeColor(type: BudgetType): string {
    const colorMap: Record<BudgetType, string> = {
        INCOME: "bg-green-100 text-green-800",
        EXPENSE: "bg-red-100 text-red-800",
        SAVINGS: "bg-blue-100 text-blue-800",
        INVESTMENT: "bg-purple-100 text-purple-800",
        EXTRA: "bg-gray-100 text-gray-800",
    };
    return colorMap[type] || "bg-gray-100 text-gray-800";
}

/**
 * Formats a date string to local date format
 * @param dateString - ISO date string
 * @returns Formatted date or "-" if invalid
 */
export function formatDate(dateString: string | undefined): string {
    if (!dateString) return "-";

    try {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    } catch {
        return "-";
    }
}

/**
 * Maps BudgetResponse to display-friendly format
 * @param budget - Budget response from API
 * @returns Budget with formatted fields
 */
export function mapBudgetForDisplay(budget: BudgetResponse) {
    return {
        ...budget,
        typeLabel: formatBudgetType(budget.budgetType),
        typeColor: getBudgetTypeColor(budget.budgetType),
    };
}

export function filterDataByConditions(
    data: any[],
    conditions: FilterCondition[]
): any[] {
    if (conditions.length === 0) return data;

    return data.filter((item) => {
        return conditions.every((condition) => {
            const value = (item as Record<string, any>)[condition.field];

            if (value === undefined || value === null) return false;

            const stringValue = String(value).toLowerCase();
            const filterValue = condition.value.toLowerCase();

            switch (condition.operation) {
                case "equals":
                    return stringValue === filterValue;
                case "contains":
                    return stringValue.includes(filterValue);
                case "gt":
                    return Number(value) > Number(condition.value);
                case "lt":
                    return Number(value) < Number(condition.value);
                case "between":
                    const [min, max] = filterValue.split(",").map(Number);
                    return Number(value) >= min && Number(value) <= max;
                default:
                    return true;
            }
        });
    });
}