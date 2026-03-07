import {BudgetType} from "@/types/budget.types";

export interface BudgetCategoryResponse {
    id: string;
    name: string;
    notes?: string;
    budgetType: BudgetType;
    lastModifiedAt?: string;
    createdAt?: string;
}

export type GetBudgetsCategoriesResponse = BudgetCategoryResponse[];