import {DataTable} from "../DataTable";
import {budgetColumns} from "./BudgetColumns";
import {BudgetTableProps} from "@/types/budget.types";

export function BudgetTable({
                                data,
                                budgetCategories,
                                isLoading,
                                error,
                                onRefresh,
                                onAddClick,
                                onManageCategories,
                                onEdit,
                                onDelete
                            }: BudgetTableProps) {
    if (error) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-800">Error loading budgets</p>
                <p className="text-sm text-red-600 mt-1">{error}</p>
                {onRefresh && (
                    <button
                        onClick={onRefresh}
                        className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-red-100 text-red-800 hover:bg-red-200"
                    >
                        Retry
                    </button>
                )}
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="rounded-lg border p-8">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-2 text-muted-foreground">Loading budgets...</span>
                </div>
            </div>
        );
    }

    return <DataTable columns={budgetColumns} onAddClick={onAddClick} onManageCategories={onManageCategories} onEdit={onEdit} onDelete={onDelete} data={data}/>;
}