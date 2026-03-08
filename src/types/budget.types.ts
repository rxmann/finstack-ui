// ============================================================================
// API RESPONSE TYPES
// ============================================================================

import {ColumnDef, RowData} from "@tanstack/react-table";
import {BudgetCategoryResponse} from "@/types/budget-categories.types";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onEdit?: (record: TData) => void;
    onDelete?: (record: TData) => void;
  }
}

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
    budgetCategoryId: string;
    budgetDate: string; // ISO date string or Date
    receiptUrl?: string;
    tags?: string[];
}

export interface UpdateBudgetRequest {
    name?: string;
    amount?: number;
    budgetCategoryId?: string;
    budgetDate?: string;
    receiptUrl?: string;
    tags?: string[];
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
    onAddClick?: () => void;
    onManageCategories?: () => void;
    onEdit?: (record: BudgetResponse) => void;
    onDelete?: (record: BudgetResponse) => void;
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onAddClick?: () => void;
    onManageCategories?: () => void;
    onEdit?: (record: TData) => void;
    onDelete?: (record: TData) => void;
}


export interface FilterCondition {
    field: string;
    operation: string;
    value: string;
}