"use client"
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BudgetResponse } from "@/types/budget.types";
import { budgetSchema } from "./zod/BudgetZodSchema";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { BudgetCategoryResponse } from "@/types/budget-categories.types";

interface BudgetFormData {
    name: string;
    amount: string;
    budgetDate: Date;
    budgetCategoryId: string;
    tags?: string;
    description?: string;
}

interface BudgetSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categories: BudgetCategoryResponse[];
    budget?: BudgetResponse | null;
    onSubmit: (data: any) => void;
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
        control,
        handleSubmit,
        formState: { errors },
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
        const d = new Date(data.budgetDate);
        const isoDate = !isNaN(d.getTime()) ? d.toISOString() : new Date().toISOString();
        const apiData = {
            name: data.name,
            amount: Number(data.amount),
            budgetDate: isoDate,
            budgetCategoryId: data.budgetCategoryId,
            tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
            description: data.description || "",
        };

        console.log(apiData);

        onSubmit(apiData);
        onOpenChange(false);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted. Validating...", errors);
        handleSubmit(onSubmitForm, (errs) => console.log("Validation errors:", errs))(e);
    };

    return (
        <Sheet key={budget?.id} open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <form onSubmit={handleFormSubmit}>
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
                        <Input id="name" placeholder="eg. Groceries, Salary" {...register("name")} />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="amount">Amount *</Label>
                        <Input id="amount" type="number" step="0.01" {...register("amount")} />
                        {errors.amount && (
                            <p className="text-sm text-red-500">{errors.amount.message}</p>
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="budgetDate">Date *</Label>
                        <Controller
                            control={control}
                            name="budgetDate"
                            render={({ field }) => (
                                <Input
                                    id="budgetDate"
                                    type="date"
                                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                    onChange={(e) => field.onChange(new Date(e.target.value))}
                                />
                            )}
                        />
                        {errors.budgetDate && (
                            <p className="text-sm text-red-500">{errors.budgetDate.message}</p>
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="budgetCategoryId">Category *</Label>
                        <Controller
                            control={control}
                            name="budgetCategoryId"
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            className="w-full"
                                            placeholder="Select a budget category."
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Categories</SelectLabel>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id}> {cat.name} </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.budgetCategoryId && (
                            <p className="text-sm text-red-500">{errors.budgetCategoryId.message}</p>
                        )}
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
                </form>
            </SheetContent>
        </Sheet>
    );
}