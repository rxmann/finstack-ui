'use client';

import { useState, useEffect } from "react";
import { BudgetResponse } from "@/types/budget.types";
import { BudgetTable } from "@/components/data-table/budget/BudgetTable";
import { getBudgets, createBudget, updateBudget, deleteBudget } from "@/lib/budget.api";
import { mapBudgetForDisplay } from "@/utils/budget.utils";
import { getBudgetCategories, createBudgetCategory, deleteBudgetCategory } from "@/lib/budget-categories.api";
import { BudgetSheet } from "@/components/form/BudgetForm";
import { CategoryManageModal } from "@/components/form/CategoryManageModal";
import { BudgetCategoryRequest } from "@/types/budget-categories.types";

export default function BudgetsPage() {
    const [budgets, setBudgets] = useState<BudgetResponse[]>([]);
    const [budgetCategories, setBudgetCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState<BudgetResponse | null>(null);

    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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
        try {
            const budgetCategories = await getBudgetCategories();
            setBudgetCategories(budgetCategories);
        } catch (err) {
            console.error("Failed to fetch budget categories:", err);
        }
    }

    const handleAddClick = () => {
        setSelectedBudget(null);
        setIsSheetOpen(true);
    };

    const handleEdit = (budget: BudgetResponse) => {
        setSelectedBudget(budget);
        setIsSheetOpen(true);
    };

    const handleDelete = async (budget: BudgetResponse) => {
        if (window.confirm("Are you sure you want to delete this budget?")) {
            try {
                await deleteBudget(budget.id);
                fetchBudgets();
            } catch (err) {
                console.error("Failed to delete budget:", err);
            }
        }
    };

    const handleSubmitForm = async (data: any) => {
        try {
            if (selectedBudget) {
                await updateBudget(selectedBudget.id, data);
            } else {
                console.log(data);
                await createBudget(data);
            }
            setIsSheetOpen(false);
            fetchBudgets();
        } catch (err) {
            console.error("Failed to save budget:", err);
        }
    };

    const handleCreateCategory = async (data: BudgetCategoryRequest) => {
        try {
            await createBudgetCategory(data);
            fetchBudgetCategories();
        } catch (err) {
            console.error("Failed to create category:", err);
        }
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await deleteBudgetCategory(id);
            fetchBudgetCategories();
        } catch (err) {
            console.error("Failed to delete category:", err);
        }
    };

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
                onAddClick={handleAddClick}
                onManageCategories={() => setIsCategoryModalOpen(true)}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <BudgetSheet
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                categories={budgetCategories}
                budget={selectedBudget}
                onSubmit={handleSubmitForm}
            />

            <CategoryManageModal 
                open={isCategoryModalOpen}
                onOpenChange={setIsCategoryModalOpen}
                categories={budgetCategories}
                onCreateCategory={handleCreateCategory}
                onDeleteCategory={handleDeleteCategory}
            />
        </div>
    );
}