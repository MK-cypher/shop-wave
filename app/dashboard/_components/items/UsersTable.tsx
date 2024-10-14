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

import {Button} from "@/components/ui/button";
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
import {User} from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {userRoles, userStatus} from "@/lib/consts";
import {updateUserRole, updateUserStatus} from "@/actions/users";
import {toast} from "@/components/ui/use-toast";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({row}) => (
      <div className="capitalize max-w-[60px] text-ellipsis overflow-hidden whitespace-nowrap">
        {row.getValue("id")}
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
    cell: ({row}) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "username",
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => <div className="lowercase">{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => <div className="lowercase">{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "status",
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const [selectedStatus, setSelectedStatus] = React.useState<any>(row.getValue("status"));
      const color = userStatus.find((item) => item.status == selectedStatus)?.color;

      const handleStatusChange = async (id: string, status: string) => {
        const res = JSON.parse(await updateUserStatus(id, status));
        if (res.error) {
          toast({
            title: "Something went wrong",
            variant: "destructive",
          });
        } else {
          toast({
            title: "User status has been updated successfully",
            variant: "success",
          });
        }
      };
      return (
        <div style={{color}}>
          <Select
            value={selectedStatus}
            onValueChange={(newStatus) => {
              setSelectedStatus(newStatus);
              handleStatusChange(row.original.id, newStatus);
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder={row.getValue("status")} style={{color}} />
            </SelectTrigger>
            <SelectContent
              onCloseAutoFocus={(e) => {
                e.preventDefault();
              }}
            >
              <SelectGroup>
                {userStatus.map((item, i) => (
                  <SelectItem key={i} style={{color: `${item.color}`}} className={`capitalize`} value={item.status}>
                    {item.status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({column}) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({row}) => {
      const handleRoleChange = async (id: string, role: string) => {
        const res = JSON.parse(await updateUserRole(id, role));
        if (res.error) {
          toast({
            title: "Something went wrong",
            variant: "destructive",
          });
        } else {
          toast({
            title: "User status has been updated successfully",
            variant: "success",
          });
        }
      };
      return (
        <div>
          <Select
            defaultValue={row.getValue("role")}
            onValueChange={(newRole) => {
              handleRoleChange(row.original.id, newRole);
            }}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder={row.getValue("role")} />
            </SelectTrigger>
            <SelectContent
              onCloseAutoFocus={(e) => {
                e.preventDefault();
              }}
            >
              <SelectGroup>
                {userRoles.map((item, i) => (
                  <SelectItem key={i} className={`capitalize`} value={item.role}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({row}) => {
      const order = row.original;

      return (
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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>Copy User ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger>Delete User</DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];

export function UsersTable({initialData}: {initialData: User[]}) {
  const [data, setData] = React.useState(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleSearch = async (term: string) => {};

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

  let pages = [];
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  pages.push(
    <Button key={1} variant={currentPage === 1 ? "default" : "outline"} size="sm" onClick={() => table.setPageIndex(0)}>
      1
    </Button>
  );

  if (currentPage > 3) {
    pages.push(<span key="ellipsis1">...</span>);
  }

  let rangeStart = Math.max(2, currentPage - 1);
  let rangeEnd = Math.min(totalPages - 1, currentPage + 1);

  if (currentPage === totalPages) {
    rangeStart = Math.max(2, totalPages - 2);
    rangeEnd = totalPages;
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(
      <Button
        key={i}
        variant={currentPage === i ? "default" : "outline"}
        size="sm"
        onClick={() => table.setPageIndex(i - 1)}
      >
        {i}
      </Button>
    );
  }

  if (currentPage < totalPages - 2 && totalPages > rangeEnd) {
    pages.push(<span key="ellipsis2">...</span>);
  }

  if (totalPages > 1 && totalPages !== rangeEnd) {
    pages.push(
      <Button
        key={totalPages}
        variant={currentPage === totalPages ? "default" : "outline"}
        size="sm"
        onClick={() => table.setPageIndex(totalPages - 1)}
      >
        {totalPages}
      </Button>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <input
          placeholder="Filter Users..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("email")?.setFilterValue(event.target.value);
            handleSearch(event.target.value);
          }}
          className="max-w-sm"
        />
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
          Showing{" "}
          {table.getRowModel().rows.length === 0
            ? 0
            : table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} rows
        </div>
        <div className="space-x-2">{pages}</div>
      </div>
    </div>
  );
}
