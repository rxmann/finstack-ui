export function formatCurrency(value: number | null): string {
    if (value === null) return "$0.00";
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function getTrendDirection(trend: string): "up" | "down" {
    if (trend === "Up") return "up";
    if (trend === "Down") return "down";
    return "up";
}