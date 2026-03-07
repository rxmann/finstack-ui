import { ColumnDef } from "@tanstack/react-table";
import { BudgetResponse } from "@/types/budget.types";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

const budgetTypeColors: Record<string, string> = {
  INCOME: "bg-green-800 text-white",
  EXPENSE: "bg-red-800 text-white",
  SAVINGS: "bg-blue-800 text-white",
  INVESTMENT: "bg-purple-800 text-white",
  LOAN: "bg-yellow-800 text-white",
  LEND: "bg-orange-800 text-white",
  EXTRA: "bg-pink-800 text-white",
};

// const columnHelper = createColumnHelper<BudgetResponse>();

export const budgetColumns: ColumnDef<BudgetResponse>[] = [
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ getValue }) => (
      <div className="font-medium text-foreground">{getValue<string>()}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "budgetCategoryName",
    header: "CATEGORY",
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "budgetType",
    header: () => <div className="">BUDGET TYPE</div>,
    cell: (info) => {
      const type = info.getValue() as string;
      return (
        <div className="flex">
          <Badge className={budgetTypeColors[type] || ""}>{type}</Badge>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="flex">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex"
        >
          AMOUNT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="font-semibold text-emerald-600 dark:text-emerald-400">
          {formatted}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "budgetDate",
    header: ({ column }) => (
      <div className="flex">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex"
        >
          DATE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: (info) => {
      const value = info.getValue() as string;
      const date = new Date(value);
      const formatted = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return <div className="">{formatted}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    size: 20,
    header: () => <div className="text-center">ACTIONS</div>,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                View{" "}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Edit{" "}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                variant="destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];