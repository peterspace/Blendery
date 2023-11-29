import React, { useState, useEffect } from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { USERS } from '../data';
// import { useState } from "react";
import DownloadBtn from './DownloadBtn';
import DebouncedInput from './DebouncedInput';
import { SearchIcon } from '../Icons/Icons';
import { useDispatch, useSelector } from 'react-redux';

//==========================================

import { getUserBuyCash, getUserBuyCard } from '../../../services/apiService';
import { getTransactionByTxIdInternal } from '../../../redux/features/transaction/transactionSlice';

const TanStackTable = () => {
  const columnHelper = createColumnHelper();
  const { user } = useSelector((state) => state.user);

  // const [allBuyCashTransactions, setAllBuyCashTransactions] = useState();
  // const [allBuyCardTransactions, setAllBuyCardTransactions] = useState();
  // console.log({ allBuyCashTransactions: allBuyCashTransactions });
  // console.log({ allBuyCardTransactions: allBuyCardTransactions });

  // //=========={Pages}================================================================

  // //=======================================================================================
  // // Simulate fetching expected prices
  // useEffect(() => {
  //   const fetchPrices = async () => {
  //     fetchAllTransactionData();
  //   };
  //   // Fetch prices immediately and then every 2 minutes
  //   // Fetch prices immediately and then every minute

  //   fetchPrices();
  //   // const priceInterval = setInterval(fetchPrices, 2 * 60 * 1000);
  //   const priceInterval = setInterval(fetchPrices, 60000);
  //   // Clear the interval on unmount
  //   return () => clearInterval(priceInterval);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [allBuyCashTransactions, allBuyCardTransactions]);

  // async function fetchAllTransactionData() {
  //   if (user?.role == 'User') {
  //     const response4 = await getUserBuyCash();
  //     if (response4) {
  //       setAllBuyCashTransactions(response4);
  //     }
  //     const response5 = await getUserBuyCard();
  //     if (response5) {
  //       setAllBuyCardTransactions(response5);
  //     }
  //   }
  // }

  const transactions = localStorage.getItem('transactions')
    ? JSON.parse(localStorage.getItem('transactions'))
    : null;

  console.log({ transactions: transactions });

  let keyData = transactions;

  const columns = [
    columnHelper.accessor('', {
      id: '#',
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: '#',
    }),
    columnHelper.accessor('txId', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'TxId',
    }),

    columnHelper.accessor('fValue', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'From',
    }),
    columnHelper.accessor('tValue', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'To',
    }),
    columnHelper.accessor('status', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Status',
    }),
  ];
  const [data] = useState(() => [...USERS]);
  // const data = keyData;

  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400">
      <div className="flex justify-between mb-2">
        <div className="w-full flex items-center gap-1">
          <SearchIcon />
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
            placeholder="Search all columns..."
          />
        </div>
        <DownloadBtn data={data} fileName={'peoples'} />
      </div>
      <table className="border border-gray-700 w-full text-left">
        <thead className="bg-indigo-600">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3.5 py-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`
                ${i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3.5 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>No Recoard Found!</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {'<'}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {'>'}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-transparent"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-transparent"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TanStackTable;
