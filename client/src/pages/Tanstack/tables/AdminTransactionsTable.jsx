/* eslint-disable react/jsx-key */
import { useEffect, useMemo, useState, memo } from 'react';
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
  AiOutlineDoubleRight,
  AiOutlineDoubleLeft,
  AiOutlineRight,
  AiOutlineLeft,
} from 'react-icons/ai';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { IoCopyOutline } from 'react-icons/io5';

import { Button } from '../components/ui/button';
import { DownloadToExcel } from '../components/lib/XlsxAdmin';
import { IoSearch } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { BsInfoSquare } from 'react-icons/bs';

import { PiExportBold } from 'react-icons/pi';
import DebouncedInput from '../components/ui/DebouncedInput';
import { statuses } from '../../../constants/statuses';
import Popover from '../../../components/Popover';

const AdminTransactionsTable = ({ data, tableData, theme, setTheme }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isGoToPageDisabled, setIsGoToPageDisabled] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = useMemo(() => {
    const baseColumns = [
      {
        Header: 'Order №',
        accessor: 'orderNo',
        sortType: 'basic',
      },
      {
        Header: 'Status',
        accessor: 'status',
        sortType: 'basic',
        Cell: ({ row }) => {
          const { status } = row.values;
          return (
            <div className="flex items-center">
              <span
                className={`w-2.5 h-2.5 mr-2 rounded-md ${statuses[status].color}`}
              />
              <span className="text-black font-normal text-sm">{status}</span>
            </div>
          );
        },
      },
      {
        Header: 'From',
        accessor: 'from',
        sortType: 'basic',
      },
      {
        Header: 'To',
        accessor: 'to',
        sortType: 'basic',
      },
      {
        Header: 'Pin',
        accessor: 'pin',
        sortType: 'basic',
        Cell: ({ value }) => (value ? <div>{value}</div> : <div>-</div>),
      },
      {
        Header: 'Dispatcher ID',
        accessor: 'dispatcherId',
        sortType: 'basic',
        Cell: ({ value }) => (value ? <div>{value}</div> : <div>-</div>),
      },
      {
        Header: 'Time left',
        accessor: 'timeLeft',
        sortType: 'basic',
        Cell: ({ value }) => {
          const timeToLeft = renderTimeToLeft(value);
          return (
            <div className="flex justify-start">
              <div>{timeToLeft}</div>
            </div>
          );
        },
      },
      {
        accessor: 'id',
        Cell: ({ value }) => {
          const getSelectedRowData = data?.find((item) => item._id === value);
          const { userAddress, blenderyAddress, _id, orderNo } =
            getSelectedRowData;
          const transactionInfo = getSelectedRowData;
          const copyToClipboard = (value) => {
            navigator.clipboard.writeText(value);
          };

          return (
            <div className="flex justify-center select-none">
              <Popover
                content={
                  <div className="flex flex-col text-[#111] font-normal">
                    <div
                      onClick={() => copyToClipboard(orderNo)}
                      className="flex items-center p-2 gap-2 hover:bg-[#F6F6F6] cursor-pointer transition-all"
                    >
                      <IoCopyOutline size={24} />
                      <div>Copy transaction ID</div>
                    </div>
                    <div
                      onClick={() => copyToClipboard(userAddress)}
                      className="flex items-center p-2 gap-2 hover:bg-[#F6F6F6] cursor-pointer transition-all"
                    >
                      <IoCopyOutline size={24} />
                      <div>Copy user address</div>
                    </div>
                    <div
                      onClick={() => copyToClipboard(blenderyAddress)}
                      className="flex items-center p-2 gap-2 hover:bg-[#F6F6F6] cursor-pointer transition-all"
                    >
                      <IoCopyOutline size={24} />
                      <div>Copy blendery address</div>
                    </div>
                    <div
                      className="flex items-center p-2 gap-2 hover:bg-[#F6F6F6] cursor-pointer transition-all"
                      onClick={() => {
                        localStorage.setItem(
                          'txDataUpdate',
                          JSON.stringify(transactionInfo)
                        );
                        localStorage.setItem('isUpdate', JSON.stringify(true));
                      }}
                    >
                      <CiEdit size={24} />
                      <div>Update</div>
                    </div>
                  </div>
                }
              >
                <MdOutlineMoreHoriz size={24} />
              </Popover>
            </div>
          );
        },
      },
    ];
    return baseColumns;
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    gotoPage,
    nextPage,
    previousPage,
    pageCount,
    canNextPage,
    canPreviousPage,
    setPageSize,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const { pageIndex } = state;

  useEffect(() => {
    if (pageNumber > pageCount || pageNumber < 1) {
      setIsGoToPageDisabled(true);
    } else {
      setIsGoToPageDisabled(false);
    }
  }, [pageNumber, pageCount]);

  useEffect(() => {
    if (status?.name) {
      setGlobalFilter(status?.name);
    }
  }, [status]);

  useEffect(() => {
    setGlobalFilter(searchTerm);
  }, [searchTerm]);

  const handlePageInputChange = (e) => {
    const inputPage = e.target.value;
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber)) {
      setPageNumber(pageNumber);
    }
  };

  const handleGoToPage = () => {
    if (pageNumber <= pageCount && pageNumber >= 1) {
      gotoPage(pageNumber - 1);
    }
  };

  const handleToggleDropdown = () => {
    setSearchTerm('');
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
  };

  const handleSelectStatus = (status) => {
    setStatus(status);
    setIsStatusDropdownOpen(false);
  };

  const renderTimeToLeft = (timeToLeft) => {
    let timeLeftFormatted;
    const targetDate = new Date(timeToLeft);

    const currentTime = new Date();

    const timeDifference = targetDate - currentTime;

    if (timeDifference <= 0) {
      return (timeLeftFormatted = '00:00:00');
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    timeLeftFormatted = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return timeLeftFormatted;
  };

  return (
    <div>
      <div className="flex my-6">
        <div className="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:justify-between items-center w-full">
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-between">
              <div className="relative flex items-center gap-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-600">
                  <IoSearch color={'#4f46e5'} size={20} />
                </div>

                <DebouncedInput
                  value={searchTerm}
                  onChange={(value) => setSearchTerm(value)}
                  onFocus={() => {
                    if (status) {
                      setStatus(null);
                      setGlobalFilter('');
                    }
                  }}
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
                          <span className="text-[#B4B4B4]">{'Status'}</span>
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
                  <div className="origin-top-right w-80 absolute right-0 mt-2 rounded-md bg-white shadow-2xl z-50">
                    <div className="max-h-62 overflow-y-auto">
                      {statuses.statusList.map((status, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-4 py-4 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectStatus(statuses[status])}
                        >
                          <div className="flex items-center">
                            <span
                              className={`w-2.5 h-2.5 mr-2 rounded-md ${statuses[status].color}`}
                            />
                            <span>{statuses[status].name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <Button
                onClick={() => DownloadToExcel(data)}
                className="bg-bgPrimary hover:opacity-90 m-0"
              >
                <div className="flex flex-row gap-2">
                  <PiExportBold size={20} color="#ffffff" />
                </div>
              </Button>
              {/* <ThemeToggle setTheme={setTheme} theme={theme} /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white min-h-[595px]">
        <div className="relative mt-2">
          <table
            {...getTableProps()}
            className="min-w-full table-fixed font-normal"
          >
            <thead className="bg-gray-10">
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="text-left border-b border-solid border-gray-300"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-4 text-base leading-6 font-medium text-[#636060]"
                    >
                      <div className="flex">{column.render('Header')}</div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="py-6">
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="text-left">
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="whitespace-nowrap px-6 py-3"
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {pageCount !== 1 ? (
        <div className="pagination mt-2 mt-8 flex items-center justify-center self-center">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={`${
              !canPreviousPage
                ? 'cursor-not-allowed border border-solid border-[#BAB9C1]'
                : 'border border-solid border-[#5046E5]'
            } flex h-10 w-10 items-center justify-center rounded-lg p-2 m-0 shadow-none bg-none bg-transparent active:bg-transparent active:shadow-none`}
          >
            <AiOutlineDoubleLeft
              size={16}
              color={!canPreviousPage ? '#BAB9C1' : '#5046E5'}
            />
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`${
              !canPreviousPage
                ? 'cursor-not-allowed border border-solid border-[#BAB9C1]'
                : 'border border-solid border-[#5046E5]'
            } ml-2 flex h-10 w-10 items-center justify-center rounded-lg p-2 m-0 shadow-none bg-none bg-transparent active:bg-transparent active:shadow-none`}
          >
            <AiOutlineLeft
              size={16}
              color={!canPreviousPage ? '#BAB9C1' : '#5046E5'}
            />
          </button>
          <span className="mx-6 text-base font-medium text-[#2C2C2C] ">
            {`Page ${pageIndex + 1} of ${pageCount}`}
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={` ${
              !canNextPage
                ? 'cursor-not-allowed border border-solid border-[#BAB9C1]'
                : 'border border-solid border-[#5046E5]'
            } m-0 mr-2 flex h-10 w-10 items-center justify-center rounded-lg p-2 shadow-none bg-none bg-transparent active:bg-transparent active:shadow-none`}
          >
            <AiOutlineRight
              size={16}
              color={!canNextPage ? '#BAB9C1' : '#5046E5'}
            />
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className={`${
              !canNextPage
                ? 'cursor-not-allowed border border-solid border-[#BAB9C1]'
                : 'border border-solid border-[#5046E5]'
            } m-0 flex h-10 w-10 items-center justify-center rounded-lg p-2 shadow-none bg-none bg-transparent active:bg-transparent active:shadow-none`}
          >
            <AiOutlineDoubleRight
              size={16}
              color={!canNextPage ? '#BAB9C1' : '#5046E5'}
            />
          </button>

          <div className="flex items-center">
            <span className="ml-6 mr-2 text-base font-medium text-[#2C2C2C]">
              Go to
            </span>
            <input
              type="number"
              value={pageNumber}
              onChange={handlePageInputChange}
              className="h-[40px] w-[60px] p-2 rounded-lg bg-transparent border border-solid border-[#5046E5] box-border"
            />
            <button
              disabled={isGoToPageDisabled}
              onClick={handleGoToPage}
              className={`m-0 ml-2 flex h-[40px] w-fit items-center justify-center rounded-md px-4 py-[10px] text-base font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 active:bg-[#5046E5] active:shadow-none ${
                isGoToPageDisabled
                  ? 'cursor-not-allowed bg-[#BAB9C1] text-[#E1E1E1]'
                  : 'bg-[#5046E5] text-white'
              }`}
            >
              Go
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const MemoizedAdminTransactionsTable = memo(AdminTransactionsTable);

export default MemoizedAdminTransactionsTable;
