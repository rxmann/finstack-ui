"use client";

import {
    ColumnFiltersState,
    ColumnSizingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {DataTablePagination} from "./TablePagination";
import {useState} from "react";
import {Plus} from "lucide-react";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {FilterComponent} from "./FilterComponent";
import {BudgetSheet} from "../form/BudgetForm";
import {BudgetResponse, DataTableProps, FilterCondition} from "@/types/budget.types";
import {filterDataByConditions} from "@/utils/budget.utils";


export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             categories
                                         }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [appliedFilters, setAppliedFilters] = useState<FilterCondition[]>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editBudget, setEditBudget] = useState<BudgetResponse | null>(null);

    const table = useReactTable({
        data: filterDataByConditions(data, appliedFilters),
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            columnSizing,
        },
        onColumnSizingChange: setColumnSizing,
        columnResizeMode: "onChange",
    });


    return (
        <div className="w-full space-y-4">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Filter Budgets..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-xl min-w-sm"
                    />
                    <FilterComponent onApplyFilter={setAppliedFilters}/>
                </div>

                <Button
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => setIsSheetOpen(true)}
                >
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New Budget
                </Button>
            </div>

            <BudgetSheet
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                categories={categories}
                budget={editBudget}
                onSubmit={(data) => {
                    console.log("Budget submitted:", data);
                    // Handle your API call here
                }}
            />

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            onClick={() => {
                                                console.log(cell.row.original)
                                                setEditBudget(cell.row.original as BudgetResponse);
                                                setIsSheetOpen(true);
                                            }}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination table={table}/>
        </div>
    );
}