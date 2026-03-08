import {GetPaginationParams} from "@/types/budget.types";
import {api} from "@/lib/api";
import {
    GetBudgetsCategoriesResponse,
    BudgetCategoryRequest,
    BudgetCategoryResponse
} from "@/types/budget-categories.types";

/**
 * Fetch all budgets with optional filters and sorting
 */
export async function getBudgetCategories(params?: GetPaginationParams): Promise<GetBudgetsCategoriesResponse> {
    try {
        const response = await api.get<GetBudgetsCategoriesResponse>("/budgets/categories", {
            params,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createBudgetCategory(data: BudgetCategoryRequest): Promise<BudgetCategoryResponse> {
    try {
        const response = await api.post<BudgetCategoryResponse>("/budgets/categories", data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteBudgetCategory(categoryId: string): Promise<void> {
    try {
        await api.delete(`/budgets/categories/${categoryId}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}