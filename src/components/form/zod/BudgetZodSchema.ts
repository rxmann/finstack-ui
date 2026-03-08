import z from "zod";

// Zod Schema
export const budgetSchema = z.object({
  name: z.string().max(50, "Name must not exceed 50 characters"),
  amount: z
    .string() // Keep as string
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Amount must be greater than 0"
    )
    .refine((val) => {
      const parts = val.split(".");
      if (parts.length > 2) return false;
      if (parts[0].length > 13) return false;
      if (parts[1] && parts[1].length > 2) return false;
      return true;
    }, "Amount must have max 13 integer and 2 decimal digits"),
  budgetDate: z.date(),
  budgetCategoryId: z.string().min(1, "Budget category is required"),
  tags: z.string().optional(),
  description: z
    .string()
    .max(300, "Description must not exceed 300 characters")
    .optional(),
});
