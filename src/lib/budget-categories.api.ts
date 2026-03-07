import {GetPaginationParams} from "@/types/budget.types";
import {api} from "@/lib/api";
import {GetBudgetsCategoriesResponse} from "@/types/budget-categories.types";

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