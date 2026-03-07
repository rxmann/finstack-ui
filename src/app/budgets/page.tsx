'use client';

import {useState, useEffect} from "react";
import {BudgetResponse} from "@/types/budget.types";
import {BudgetTable} from "@/components/data-table/budget/BudgetTable";
import {getBudgets} from "@/lib/budget.api";
import {mapBudgetForDisplay} from "@/utils/budget.utils";
import {getBudgetCategories} from "@/lib/budget-categories.api";

export default function BudgetsPage() {
    const [budgets, setBudgets] = useState<BudgetResponse[]>([]);
    const [budgetCategories, setBudgetCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBudgets();
        fetchBudgetCategories();
    }, []);

    async function fetchBudgets() {
        try {
            setIsLoading(true);
            setError(null);
            const budgets = await getBudgets({
                sort: "budgetDate,desc",
            });
            const displayBudgets = budgets.map(b => mapBudgetForDisplay(b));
            setBudgets(displayBudgets);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to fetch budgets";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchBudgetCategories() {
        const budgetCategories = await getBudgetCategories();
        setBudgetCategories(budgetCategories);
    }


    return (
        <div className="@container/main flex mx-auto p-4 space-y-4 flex-col">
            <div>
                <h1 className="text-3xl font-bold">Budgets</h1>
                <p className="text-muted-foreground">
                    Manage your budgets and expenses
                </p>
            </div>

            <BudgetTable
                data={budgets}
                budgetCategories={budgetCategories}
                isLoading={isLoading}
                error={error}
                onRefresh={fetchBudgets}
            />
        </div>
    );
}