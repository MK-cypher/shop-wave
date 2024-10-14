"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {ArrowUpDown, ChevronDown, MoreHorizontal} from "lucide-react";
import * as React from "react";

import {Button, buttonVariants} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import AddProducts from "./AddProducts";
import Image from "next/image";
import FilterPage from "@/components/filter/filterPage";
import {product} from "@/lib/types";
import SearchFilter from "@/components/filter/SearchFilter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {deleteProduct} from "@/actions/products";
import {toast} from "@/components/ui/use-toast";

export const columns: ColumnDef<product>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({row}) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "main_img",
    header: "Image",
    cell: ({row}) => (
      <div className="shrink-0 h-14 w-14">
        <img src={row.getValue("main_img")} alt="product" className="h-14 w-14 rounded-full object-cover shrink-0" />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => <div className="h-full line-clamp-4">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "max_quantity",
    header: ({column}) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="mx-auto"
          >
            Quantity
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({row}) => <div className="lowercase text-center">{row.getValue("max_quantity")}</div>,
  },
  {
    accessorKey: "price",
    header: ({column}) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="mx-auto"
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({row}) => <div className="lowercase text-center">${row.getValue("price")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({row}) => {
      const product = row.original;

      const handleDelete = async () => {
        const res = await deleteProduct(product.id);
        if (res) {
          toast({
            title: "Product was deleted successfully",
            variant: "success",
          });
        } else {
          toast({
            title: "Something went wrong",
            variant: "destructive",
          });
        }
      };

      return (
        <AlertDialog>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                onCloseAutoFocus={(e) => {
                  e.preventDefault();
                }}
              >
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>
                  Copy Product ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <DialogTrigger>Edit Product</DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <AlertDialogTrigger className="text-red-400 transition-all duration-300 hover:text-destructive">
                    Delete Product
                  </AlertDialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AddProducts
              productData={product}
              defaultCategory={product.category}
              defaultSubCategory={product.sub_category}
            />
          </Dialog>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you wish to delete this Product?</AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className={buttonVariants({variant: "destructive"})} onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];

export function ProductsTable({
  data,
  searchParams,
  total,
}: {
  data: product[];
  searchParams: {[key: string]: string};
  total: number;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const PRODUCTS_PER_PAGE = 5;
  const FINAL_PAGE = data.length < PRODUCTS_PER_PAGE ? total : false;
  const START_NUMBER =
    data.length > 0
      ? searchParams.page
        ? +searchParams.page > 1
          ? +searchParams.page * PRODUCTS_PER_PAGE - PRODUCTS_PER_PAGE + 1
          : 1
        : 1
      : 0;
  const END_NUMBER =
    data.length > 0
      ? FINAL_PAGE
        ? FINAL_PAGE
        : searchParams.page
        ? +searchParams.page * PRODUCTS_PER_PAGE
        : PRODUCTS_PER_PAGE
      : 0;

  const table = useReactTable({
    data,
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
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <SearchFilter link="dashboard/products/" searchParams={searchParams} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {START_NUMBER} to {END_NUMBER} of {total} rows
        </div>
        <div className="space-x-2">
          <FilterPage
            searchParams={searchParams}
            total={total}
            category="dashboard/products"
            link="dashboard/products"
          />
        </div>
      </div>
    </div>
  );
}
