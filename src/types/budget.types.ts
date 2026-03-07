// ============================================================================
// API RESPONSE TYPES
// ============================================================================

import {ColumnDef} from "@tanstack/react-table";
import {BudgetCategoryResponse} from "@/types/budget-categories.types";

export interface BudgetResponse {
    id: string;
    name: string;
    amount: number;
    budgetType: BudgetType;
    budgetCategoryName: string;
    budgetCategoryId: string;
    budgetDate: string;
    createdAt?: string;
    updatedAt?: string;
}

export type BudgetType =
    | "INCOME"
    | "EXPENSE"
    | "SAVINGS"
    | "INVESTMENT"
    | "EXTRA";

export type GetBudgetsResponse = BudgetResponse[];

// ============================================================================
// API REQUEST TYPES
// ============================================================================

export interface CreateBudgetRequest {
    name: string;
    amount: number;
    budgetType: BudgetType;
    budgetCategoryId: string;
}

export interface UpdateBudgetRequest {
    name?: string;
    amount?: number;
    budgetType?: BudgetType;
    budgetCategoryId?: string;
}

// ============================================================================
// API PARAMS
// ============================================================================

export interface GetPaginationParams {
    sort?: string;
    filter?: string;
    page?: number;
    pageSize?: number;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface BudgetTableProps {
    data: BudgetResponse[];
    budgetCategories: BudgetCategoryResponse[];
    isLoading?: boolean;
    error?: string | null;
    onRefresh?: () => void;
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    categories: BudgetCategoryResponse[];
}


export interface FilterCondition {
    field: string;
    operation: string;
    value: string;
}