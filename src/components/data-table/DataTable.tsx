"use client";

import {
  ColumnDef,
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./TablePagination";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FilterComponent } from "./FilterComponent";
import { BudgetSheet } from "../form/BudgetForm";
import { BudgetResponse } from "@/types/Budget";
import { dummyCategories } from "@/lib/mock-data";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

interface FilterCondition {
  field: string;
  operation: string;
  value: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
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

  function filterDataByConditions(
    data: TData[],
    conditions: FilterCondition[]
  ): TData[] {
    if (conditions.length === 0) return data;

    return data.filter((item) => {
      return conditions.every((condition) => {
        const value = (item as Record<string, any>)[condition.field];

        if (value === undefined || value === null) return false;

        const stringValue = String(value).toLowerCase();
        const filterValue = condition.value.toLowerCase();

        switch (condition.operation) {
          case "equals":
            return stringValue === filterValue;
          case "contains":
            return stringValue.includes(filterValue);
          case "gt":
            return Number(value) > Number(condition.value);
          case "lt":
            return Number(value) < Number(condition.value);
          case "between":
            const [min, max] = filterValue.split(",").map(Number);
            return Number(value) >= min && Number(value) <= max;
          default:
            return true;
        }
      });
    });
  }

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
          <FilterComponent onApplyFilter={setAppliedFilters} />
        </div>

        <Button
          size="sm"
          className="cursor-pointer"
          onClick={() => setIsSheetOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Budget
        </Button>
      </div>

      <BudgetSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        categories={dummyCategories}
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

      <DataTablePagination table={table} />
    </div>
  );
}
