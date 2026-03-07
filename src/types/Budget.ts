export interface BudgetResponse {
  id: string;
  name: string;
  amount: number;
  budgetType: string;
  budgetCategoryName: string;
  budgetCategoryId: string;
  createdAt: string;
}

export type BudgetType =
  | "INCOME"
  | "EXPENSE"
  | "SAVINGS"
  | "INVESTMENT"
  | "EXTRA";

export interface BudgetCategoryResponse {
  id: string;
  name: string;
  notes: string;
  budgetType: BudgetType;
  lastModifiedAt: string;
}
