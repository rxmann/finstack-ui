// ============================================================================
// API SERVICE
// ============================================================================

import {DashboardAnalyticsResponse} from "@/types/Dashboard";
import {api} from "@/lib/api";

// API Service
export async function getDashboardAnalytics(
    filter: "THIS_WEEK" | "THIS_MONTH" | "THIS_QUARTER" | "THIS_YEAR"
): Promise<DashboardAnalyticsResponse | null> {
    try {
        const res = await api.get<DashboardAnalyticsResponse>(
            `/dashboard/analytics?filter=${filter}`
        );
        return res.data;
    } catch (err) {
        console.error("Dashboard API error:", err);
        return null;
    }
}