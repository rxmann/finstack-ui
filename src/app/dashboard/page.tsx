"use client"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {DashboardAnalyticsResponse} from "@/types/Dashboard";
import {useAuth} from "@/components/providers/AuthProvider";
import {analyticsToCardsMapper} from "@/mapper/dashboard.mapper";
import {DashboardSectionCards} from "@/components/cards/cards";
import {ChartAreaInteractive} from "@/components/ChartAreaInteractive";
import {getDashboardAnalytics} from "@/lib/dashboard.api";

// Dashboard Page
export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] =
      useState<DashboardAnalyticsResponse | null>(null);

  // Auth guard
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  // Fetch analytics
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const data = await getDashboardAnalytics("THIS_MONTH");
      setAnalyticsData(data);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-muted-foreground">Loading...</p>
        </div>
    );
  }

  if (!analyticsData) {
    return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-destructive">Failed to load dashboard</p>
        </div>
    );
  }

  const { statCards, net } = analyticsToCardsMapper(analyticsData);

  return (
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* 4 Stat Cards */}
          <DashboardSectionCards cards={statCards} />

          {/* Net Balance */}
          <div className="px-4 text-sm text-muted-foreground">
            Net Balance:{" "}
            <span className="font-semibold text-foreground">
            ${net.toFixed(2)}
          </span>
          </div>

          {/* Chart */}
          <div className="px-4 lg:px-4">
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
  );
}