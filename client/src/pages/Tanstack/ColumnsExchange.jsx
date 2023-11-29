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
import { TimerFormat } from '../../components/TimerFormat';

export const ColumnsExchange = [
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
            <div className="leading-[20px] inline-block"> TxId</div>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </div>
      );
    },
    accessorKey: 'orderNo',
    cell: ({ row }) => {
      const orderNo = row.getValue('orderNo');

      return (
        <span
          className={`flex items-center text-center text-black dark:text-white`}
        >
          {orderNo}
        </span>
      );
    },
  },
  {
    header: 'From',
    accessorKey: 'fToken',
    cell: ({ row }) => {
      const fToken = row.getValue('fToken');

      return (
        <div className="flex flex-row items-center gap-1 text-black dark:text-white">
          <span className="text-xs">{fToken?.symbol?.toUpperCase()}</span>
        </div>
      );
    },
  },
  {
    header: 'From',
    accessorKey: 'fValue',
  },
  {
    header: 'To',
    accessorKey: 'tToken',
    cell: ({ row }) => {
      const tToken = row.getValue('tToken');
      return (
        <div className="flex flex-row items-center gap-1 text-black dark:text-white">
          <span className="text-xs">{tToken?.symbol?.toUpperCase()}</span>
        </div>
      );
    },
  },
  {
    header: 'To Value',
    accessorKey: 'tValue',
  },
  {
    header: 'Blendery',
    accessorKey: 'blenderyAddress',
  },
  {
    header: 'User',
    accessorKey: 'userAddress',
  },
  {
    header: 'Blendery Out',
    accessorKey: 'blenderyAddressOut',
  },
  {
    header: 'Pin',
    accessorKey: 'pin',
  },
  {
    header: 'Dispatcher Id',
    accessorKey: 'dispatcherId',
  },
  {
    header: 'Hash',
    accessorKey: 'hash',
  },
  {
    header: 'Hash Out',
    accessorKey: 'hashOut',
  },
  {
    header: 'Time left',
    accessorKey: 'timeLeft',
    cell: ({ row }) => {
      const timeLeft = row.getValue('timeLeft');
      const service = row.getValue('service');
      const status = row.getValue('status');
      const timeStatus = row.getValue('timeStatus');

      return (
        <>
          {' '}
          {status === 'Received' || service === 'defi' ? (
            <span
              className={`flex items-center text-center text-black dark:text-white`}
            >
              {`-- : -- : --`}
            </span>
          ) : (
            <span
              className={`flex items-center text-center text-black dark:text-white`}
            >
              {timeStatus === 'Expired' ? (
                <div
                  className={`text-base leading-[24px] text-red-600 inline-block w-[69px]`}
                >
                  Expired
                </div>
              ) : (
                <div
                  className={`text-base leading-[24px] text-black dark:text-white inline-block w-[69px]`}
                >
                  <TimerFormat duration={timeLeft} />
                </div>
              )}
            </span>
          )}
        </>
      );
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const transactionInfo = row.original;
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
                navigator.clipboard.writeText(
                  transactionInfo.orderNo.toString()
                );
              }}
            >
              Copy Transaction ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(
                  transactionInfo.userAddress
                    ? transactionInfo.userAddress.toString()
                    : ''
                );
              }}
            >
              Copy User Address
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(
                  transactionInfo.blenderyAddress
                    ? transactionInfo.blenderyAddress.toString()
                    : ''
                );
              }}
            >
              Copy Blendery Address
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                // setTxInfo(item);
                // dispatch(getTransactionByTxIdInternal(item)); // dispatch txData globally
                // setIsUpdate(true);
                // setIsView(false);
                // setIsTx(false);
              }}
            >
              update
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
