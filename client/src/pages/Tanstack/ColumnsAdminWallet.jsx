import { Button } from './components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';

import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Checkbox } from './components/ui/checkbox';

export const ColumnsAdminWallet = [
  {
    id: 'select',
    header: ({ table }) => {
      return (
        <Checkbox
          // className="outline-none bg-bgSecondary accent-bgPrimary focus:accent-bgPrimary/30"
          className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-bgDarker focus:ring-2 dark:bg-bgDarkMode dark:border-gray-600"
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          // className="outline-none bg-bgSecondary accent-bgPrimary focus:accent-bgPrimary/30"
          className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-bgDarker focus:ring-2 dark:bg-bgDarkMode dark:border-gray-600"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: ({ column }) => {
      return (
        // <Button
        //   variant="ghost"
        //   onClick={() => {
        //     column.toggleSorting(column.getIsSorted() === "asc");
        //   }}
        // >
        //   Person ID
        //   <ArrowUpDown className="ml-2 h-4 w-4" />
        // </Button>

        <div
          className="cursor-pointer shadow-lg hover:-translate-y-0.5 transform transition flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white shrink-0 rounded px-4 py-2"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          <div className="flex flex-row gap-2">
            <div className="leading-[20px] inline-block"> Person ID</div>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      );
    },
    accessorKey: 'id',
  },
  {
    header: 'First Name',
    accessorKey: 'first_name',
  },
  {
    header: 'Last Name',
    accessorKey: 'last_name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Gender',
    accessorKey: 'gender',
  },
  {
    header: 'Date of Birth',
    accessorKey: 'date_of_birth',
    cell: ({ row }) => {
      const date_of_birth = row.getValue('date_of_birth');
      const formatted = new Date(date_of_birth).toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const person = row.original;
      const personId = person.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button> */}
            {/* <button className="cursor-pointer w-8 h-8 p-0 bg-bgPrimary hover:opacity-90 text-white">
              <MoreHorizontal className="h-4 w-4" />
            </button> */}
            <div className="flex flex-row justify-center items-center hover:rounded hover:bg-indigo-600 h-8">
              <MoreHorizontal className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(person.first_name.toString());
              }}
            >
              Copy person name
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
