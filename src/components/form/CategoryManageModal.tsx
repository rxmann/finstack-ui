import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BudgetCategoryResponse, BudgetCategoryRequest } from "@/types/budget-categories.types";
import { BudgetType } from "@/types/budget.types";
import { Trash2, Plus } from "lucide-react";

interface CategoryManageModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categories: BudgetCategoryResponse[];
    onDeleteCategory: (id: string) => Promise<void>;
    onCreateCategory: (data: BudgetCategoryRequest) => Promise<void>;
}

export function CategoryManageModal({
    open,
    onOpenChange,
    categories,
    onDeleteCategory,
    onCreateCategory,
}: CategoryManageModalProps) {
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    
    // Form state
    const [newName, setNewName] = useState("");
    const [newType, setNewType] = useState<BudgetType>("EXPENSE");
    const [newNotes, setNewNotes] = useState("");

    const handleDelete = async (id: string) => {
        setIsDeleting(id);
        try {
            await onDeleteCategory(id);
        } finally {
            setIsDeleting(null);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName.trim()) return;

        setIsCreating(true);
        try {
            await onCreateCategory({
                name: newName.trim(),
                budgetType: newType,
                notes: newNotes.trim() ? newNotes.trim() : undefined,
            });
            setNewName("");
            setNewType("EXPENSE");
            setNewNotes("");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>Manage Categories</DialogTitle>
                    <DialogDescription>
                        View and remove your existing budget categories here.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 py-4 overflow-y-auto min-h-[100px] max-h-[300px] pr-2">
                    {categories.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            No categories found.
                        </p>
                    ) : (
                        categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="flex items-center justify-between p-3 border rounded-md"
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm">{cat.name}</span>
                                    <span className="text-xs text-muted-foreground uppercase">
                                        {cat.budgetType}
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                                    onClick={() => handleDelete(cat.id)}
                                    disabled={isDeleting === cat.id}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                <div className="pt-4 border-t mt-auto">
                    <h4 className="text-sm font-medium mb-3">Add New Category</h4>
                    <form onSubmit={handleCreate} className="flex flex-col gap-3">
                        <div className="flex gap-2 w-full">
                            <Input
                                placeholder="Category Name"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                disabled={isCreating}
                                className="flex-1"
                                required
                            />
                            <Select 
                                value={newType} 
                                onValueChange={(val) => setNewType(val as BudgetType)}
                                disabled={isCreating}
                            >
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="EXPENSE">Expense</SelectItem>
                                        <SelectItem value="INCOME">Income</SelectItem>
                                        <SelectItem value="SAVINGS">Savings</SelectItem>
                                        <SelectItem value="INVESTMENT">Investment</SelectItem>
                                        <SelectItem value="LOAN">Loan</SelectItem>
                                        <SelectItem value="LEND">Lend</SelectItem>
                                        <SelectItem value="EXTRA">Extra</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Textarea 
                            placeholder="Notes (optional)"
                            value={newNotes}
                            onChange={(e) => setNewNotes(e.target.value)}
                            disabled={isCreating}
                            rows={2}
                            className="w-full resize-none"
                        />
                        <Button type="submit" disabled={isCreating || !newName.trim()} className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Category
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
