import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {BudgetResponse} from "@/types/budget.types";
import {budgetSchema} from "./zod/BudgetZodSchema";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import {BudgetCategoryResponse} from "@/types/budget-categories.types";

interface BudgetFormData {
    name: string;
    amount: string;
    budgetDate: Date;
    budgetCategoryId: string;
    tags: string;
    description: string;
}

interface BudgetSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categories: BudgetCategoryResponse[];
    budget?: BudgetResponse | null;
    onSubmit: (data: BudgetFormData) => void;
}

// Budget Sheet Component
export function BudgetSheet({
                                open,
                                onOpenChange,
                                categories,
                                budget,
                                onSubmit,
                            }: BudgetSheetProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
        watch,
    } = useForm<BudgetFormData>({
        resolver: zodResolver(budgetSchema),
        defaultValues: {
            name: "",
            amount: "0.0",
            budgetDate: new Date(),
            budgetCategoryId: "",
            tags: "",
            description: "",
        },
    });


    useEffect(() => {
        if (budget && budget.name) {
            reset({
                name: budget.name || "",
                amount: budget.amount.toString(),
                budgetDate: new Date(),
                budgetCategoryId: budget.budgetCategoryId,
                tags: "",
                description: "",
            });
        } else {
            reset({
                name: "",
                amount: "0.0",
                budgetDate: new Date(),
                budgetCategoryId: "",
                tags: "",
                description: "",
            });
        }
    }, [budget, open, reset]);

    const onSubmitForm = (data: BudgetFormData) => {
        const apiData = {
            name: data.name,
            amount: data.amount.toString(),
            budgetDate: new Date(data.budgetDate),
            budgetCategoryId: data.budgetCategoryId,
            tags: data.tags ? data.tags : "",
            description: data.description || "",
        };

        onSubmit(apiData);
        onOpenChange(false);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(() => onSubmitForm)(e);
    };

    return (
        <Sheet key={budget?.id} open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="font-bold text-2xl">
                        {budget ? "Edit Budget" : "Add New Budget"}
                    </SheetTitle>
                    <SheetDescription>
                        {budget
                            ? "Update your budget details below."
                            : "Fill in the details to create a new budget entry."}
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Name *</Label>
                        <Input required id="name" placeholder="eg. Groceries, Salary"/>
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="amount">Amount *</Label>
                        <Input required id="amount" defaultValue={0.0} type="number"/>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="budgetDate">Date *</Label>
                        <Input required id="budgetDate" defaultValue={0.0} type="date"/>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="budgetCategoryId">Category *</Label>
                        <Select required>
                            <SelectTrigger className="w-full">
                                <SelectValue
                                    className="w-full"
                                    placeholder="Select a budget category."
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="">
                                    <SelectLabel>Categories</SelectLabel>
                                    {categories.map((cat) => (
                                        <SelectItem value={cat.id}> {cat.name} </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <SheetFooter>
                    {/* Actions */}
                    {/* <div className="flex gap-3 pt-4">
            <Button onClick={handleFormSubmit} className="flex-1">
              {budget ? "Update" : "Create"} Budget
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div> */}

                    <Button
                        className="cursor-pointer"
                        type="submit"
                        onClick={handleFormSubmit}
                    >
                        {budget ? "Update" : "Create"} Budget
                    </Button>
                    <SheetClose asChild>
                        <Button
                            className="cursor-pointer"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}