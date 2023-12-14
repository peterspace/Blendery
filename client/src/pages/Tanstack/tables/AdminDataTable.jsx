import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { ThemeToggle } from "../components/ThemeToggle";
import { DownloadToExcel } from "../components/lib/XlsxAdmin";
import { IoSearch } from "react-icons/io5";

import { PiExportBold } from "react-icons/pi";

//==============={type2}=======================================
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import DebouncedInput from "../components/ui/DebouncedInput";
import { statuses } from "../../../constants/statuses";

export function AdminDataTable({ columns, data, theme, setTheme }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [status, setStatus] = useState(null);

  const [globalFilter, setGlobalFilter] = useState("");

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

  // useEffect(() => {
  //   setGlobalFilter(status.name);
  // }, [status]);

  const handleToggleDropdown = () => {
    console.log("oldTableData: ", data);
    console.log("oldTableColumns: ", columns);
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
  };

  const handleSelectStatus = (status) => {
    setStatus(status);
    setIsStatusDropdownOpen(false);
  };

  return (
    <div>
      <div className="flex my-6">
        <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:justify-between items-center w-full">
          <div className="lg:ml-4 flex justify-between">
            <div className="relative flex items-center gap-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-600">
                <IoSearch color={"#4f46e5"} size={20} />
              </div>

              <DebouncedInput
                value={globalFilter ?? ""}
                onChange={(value) => setGlobalFilter(String(value))}
                className="w-80 h-10 py-4 px-2 pl-10 pr-2 bg-white rounded-lg border border-solid border-[#E7E7E7] shadow-md outline-none box-border"
                placeholder="Search"
              />
            </div>

            <div className="relative inline-block text-left ml-6">
              <div>
                <button
                  type="button"
                  className="inline-flex w-80 h-10 mt-0 mx-0 p-4 justify-between items-center text-xs rounded-lg leading-[18px] text-[#111111] gap-[8px] bg-white shadow-md active:bg-white active:shadow-none border border-solid border-[#E7E7E7] box-border"
                  onClick={handleToggleDropdown}
                >
                  <div className="flex w-full justify-between items-center">
                    {status ? (
                      <>
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <span
                              className={`w-2.5 h-2.5 mr-2 rounded-md ${status.color}`}
                            />
                            <span className="text-black font-normal text-sm">
                              {status.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex h-full items-center">
                          {isStatusDropdownOpen ? (
                            <FaChevronUp size={12} color="#111111" />
                          ) : (
                            <FaChevronDown size={12} color="#111111" />
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="flex w-full items-center justify-between">
                        <span className="text-[#B4B4B4]">{"Status"}</span>
                        {isStatusDropdownOpen ? (
                          <FaChevronUp size={16} />
                        ) : (
                          <FaChevronDown size={16} />
                        )}
                      </div>
                    )}
                  </div>
                </button>
              </div>
              {isStatusDropdownOpen && (
                <div className="origin-top-right w-80 absolute right-0 mt-2 rounded-md bg-white shadow-2xl">
                  <div className="max-h-60 overflow-y-auto">
                    {statuses.map((status, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-4 py-4 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectStatus(status)}
                      >
                        <div className="flex items-center">
                          <span
                            className={`w-2.5 h-2.5 mr-2 rounded-md ${status.color}`}
                          />
                          <span>{status.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

export default AdminDataTable;
