import { useState, useContext, useCallback, useEffect } from "react";

import Popover from "./Popover";
import { IoCopyOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { TransActionUpdateModalContext } from "../pages/Dashboard/AdminDashboard";
import { IoDocumentTextOutline } from "react-icons/io5";

function PopoverWrapper({ selectedRowId, tableData, isAdmin }) {
  const {
    setIsTransactionUpdateModalOpen,
    selectedRowData,
    setSelectedRowData,
    setSelectedRowFullData,
  } = useContext(TransActionUpdateModalContext);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value);
  };

  const handleOpenPopover = () => {
    // unformatted data of selected transaction
    const getSelectedTransaction = tableData.find(
      (transaction) => transaction._id === selectedRowId
    );
    setSelectedRowFullData(getSelectedTransaction);

    // formatted data of selected transaction
    const selectedRowDetails = formatTableData(tableData);
    const getSelectedTransformedTransaction = selectedRowDetails?.find(
      (formattedTransaction) => formattedTransaction.id === selectedRowId
    );
    setSelectedRowData(getSelectedTransformedTransaction);

    setIsPopoverOpen(!isPopoverOpen);
  };

  const formatTableData = useCallback((data) => {
    const details = data.reduce((accumulator, obj) => {
      const formattedObj = {
        id: obj._id,
        orderNo: obj.orderNo,
        status: obj.status,
        from: `${obj.fValue} ${obj.fToken.symbol.toUpperCase()}`,
        to: `${obj.tValue} ${obj.tToken.symbol.toUpperCase()}`,
        timeLeft: obj.timeLeft,
        amount: obj.amount,
        userAddress: obj.userAddress,
        blenderyAddress: obj.blenderyAddress,
        hash: obj.hash,
        hashOut: obj.hashOut,
        country: obj.country,
      };

      accumulator.push(formattedObj);
      return accumulator;
    }, []);

    return details;
  }, []);

  return (
    <div className="flex justify-center select-none">
      <Popover
        isPopoverOpen={isPopoverOpen}
        setIsPopoverOpen={setIsPopoverOpen}
        handleOpenPopover={handleOpenPopover}
        content={
          <div className="flex flex-col text-[#111] font-normal">
            <div
              onClick={() => {
                copyToClipboard(selectedRowData?.orderNo);
                setIsPopoverOpen(false);
              }}
              className="flex items-center p-2 gap-2 hover:bg-[#F6F6F6] cursor-pointer transition-all"
            >
              <IoCopyOutline size={24} />
              <div>Copy transaction ID</div>
            </div>
            <div
              onClick={() => {
                copyToClipboard(selectedRowData?.userAddress);
                setIsPopoverOpen(false);
              }}
              className="flex items-center p-2 gap-2 hover:bg-[#F6F6F6] cursor-pointer transition-all"
            >
              <IoCopyOutline size={24} />
              <div>Copy user address</div>
            </div>
            <div
              onClick={() => {
                copyToClipboard(selectedRowData?.blenderyAddress);
                setIsPopoverOpen(false);
              }}
              className="flex items-center p-2 gap-2 hover:bg-[#F6F6F6] cursor-pointer transition-all"
            >
              <IoCopyOutline size={24} />
              <div>Copy blendery address</div>
            </div>
            {isAdmin ? (
              <div
                className="flex items-center p-2 gap-2 hover:bg-[#F6F6F6] cursor-pointer transition-all"
                // onClick={() => {
                //   localStorage.setItem(
                //     "txDataUpdate",
                //     JSON.stringify(selectedRowData)
                //   );
                //   localStorage.setItem("isUpdate", JSON.stringify(true));
                // }}
                onClick={() => {
                  setIsTransactionUpdateModalOpen(true);
                  setIsPopoverOpen(false);
                }}
              >
                <CiEdit size={24} />
                <div>Update</div>
              </div>
            ) : (
              <div
                className="flex items-center p-2 gap-2 hover:bg-[#F6F6F6] cursor-pointer transition-all"
                onClick={() => {
                  localStorage.setItem(
                    "txDataUpdate",
                    JSON.stringify(selectedRowData?.transactionInfo)
                  );
                  localStorage.setItem("isViewIng", JSON.stringify(true));
                }}
              >
                <IoDocumentTextOutline size={24} />
                <div>Details</div>
              </div>
            )}
          </div>
        }
      >
        <MdOutlineMoreHoriz size={24} />
      </Popover>
    </div>
  );
}

export default PopoverWrapper;
