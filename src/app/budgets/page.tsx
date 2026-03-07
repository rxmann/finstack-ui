'use client'; // Add this

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {BudgetResponse} from "@/types/Budget";
import {getBudgetData} from "@/lib/mock-data";
import {BudgetTable} from "@/components/data-table/budget/BudgetTable";

export default function BudgetsPage() {
    const [data, setData] = useState<BudgetResponse[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Client-side auth check
        async function checkAuth() {
            try {
                const res = await fetch("http://localhost:8080/api/v1/users/profile", {
                    credentials: "include",
                });
                if (!res.ok) {
                    router.push("/login");
                }
            } catch {
                router.push("/login");
            }
        }
        checkAuth();

        getBudgetData().then(setData);
    }, [router]);

    return (
        <div className="@container/main flex mx-auto p-4 space-y-4 flex-col">
            <div>
                <h1 className="text-3xl font-bold">Budgets</h1>
                <p className="text-muted-foreground">
                    Manage your budgets and expenses
                </p>
            </div>

            <BudgetTable data={data} />
        </div>
    );
}