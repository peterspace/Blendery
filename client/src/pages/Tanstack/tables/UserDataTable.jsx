import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Moon, Sun } from "lucide-react";

import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ThemeToggle } from "../components/ThemeToggle";
import { DownloadToExcel } from "../components/lib/XlsxUser";

import { SiHiveBlockchain } from "react-icons/si";
import { BsFillForwardFill } from "react-icons/bs";

import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { BsFillMoonStarsFill, BsMoonStars } from "react-icons/bs"; // Bitcoin
import { IoSearch } from "react-icons/io5";

import { PiExportBold } from "react-icons/pi";

//==============={type2}=======================================
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import DebouncedInput from "../components/ui/DebouncedInput";
import { SearchIcon } from "../../Tables/Icons/Icons";

export function UserDataTable({ columns, data, theme, setTheme }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const [globalFilter, setGlobalFilter] = useState("");

  console.log(rowSelection);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div>
      {/* input */}
      <div className="flex py-4">
        <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:justify-between items-center w-full">
          <div className="lg:ml-4 flex justify-between">
            <div className="w-full flex items-center gap-1">
              <IoSearch color={"#4f46e5"} size={20} />
              <DebouncedInput
                value={globalFilter ?? ""}
                onChange={(value) => setGlobalFilter(String(value))}
                className="p-2 bg-transparent outline-none border-b-2 w-[300px] focus:w-[300px] duration-300 border-indigo-500 text-black dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-200"
                placeholder="Search by Address/TxId/Hash/Token/Value"
              />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="flex flex-row justify-center items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-bgPrimary hover:opacity-90">
                    <ArrowUpDown className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Toggle theme</span>
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
                          onCheckedChange={(value) => {
                            column.toggleVisibility(!!value);
                          }}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              onClick={() => DownloadToExcel(data)}
              className="bg-bgPrimary hover:opacity-90"
            >
              {/* Export to Excel */}
              <div className="flex flex-row gap-2">
                <PiExportBold size={20} color="#ffffff" />
              </div>
            </Button>
            <ThemeToggle setTheme={setTheme} theme={theme} />
          </div>
        </div>
      </div>

      {/* table */}
      <div className="rounded-md border outline bg-white outline-lightslategray-300 outline-[1px] dark:bg-bgDark dark:outline-bgDarkOutline">
        <Table>
          <TableHeader className="h-[64px] bg-gray-100 dark:bg-bgDarker outline outline-lightslategray-300 dark:outline-bgDarkOutline outline-[1px]">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                <TableCell>No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination */}
      <div className="flex items-center justify-start space-x-2 py-4">
        <div className="flex flex-row justify-between w-full">
          <div
            className="cursor-pointer shadow-lg hover:-translate-y-0.5 transform transition flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white shrink-0 rounded px-4 py-2"
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <div className="flex flex-row gap-2">
              <IoIosArrowBack size={20} color="#ffffff" />
              <div className="leading-[20px] inline-block">Previous</div>
            </div>
          </div>
          <div
            className="cursor-pointer shadow-lg hover:-translate-y-0.5 transform transition flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white shrink-0 rounded px-4 py-2"
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            <div className="flex flex-row gap-2">
              <div className="leading-[20px] inline-block">Next</div>
              <MdArrowForwardIos size={20} color="#ffffff" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 text-sm text-text-black dark:text-white">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected
      </div>
    </div>
  );
}

export default UserDataTable;
