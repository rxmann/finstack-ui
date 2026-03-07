import {
    BudgetResponse,
    CreateBudgetRequest,
    GetPaginationParams,
    GetBudgetsResponse,
    UpdateBudgetRequest
} from "@/types/budget.types";
import {api} from "@/lib/api";

/**
 * Fetch all budgets with optional filters and sorting
 */
export async function getBudgets(params?: GetPaginationParams): Promise<GetBudgetsResponse> {
    try {
        const response = await api.get<GetBudgetsResponse>("/budgets", {
            params,
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


/**
 * Fetch a single budget by ID
 */
export async function getBudgetById(id: string): Promise<BudgetResponse> {
    try {
        const response = await api.get<BudgetResponse>(`/budgets/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Create a new budget
 */
export async function createBudget(budget: CreateBudgetRequest): Promise<BudgetResponse> {
    try {
        const response = await api.post<BudgetResponse>(
            "/budgets",
            budget
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Update an existing budget
 */
export async function updateBudget(
    id: string,
    budget: UpdateBudgetRequest
): Promise<BudgetResponse> {
    try {
        const response = await api.put<BudgetResponse>(
            `/budgets/${id}`,
            budget
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Delete a budget
 */
export async function deleteBudget(id: string): Promise<void> {
    try {
        await api.delete(`/budgets/${id}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}