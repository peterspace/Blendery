import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import CloseIcon from "../assets/icons/close.svg";
import { TransActionUpdateModalContext } from "../pages/Dashboard/AdminDashboard";
import TransactionStatusDropdown from "./TransactionStatusDropdown";
import { updateTransactionByIdService } from "../services/apiService";

import CircularProgress from "./CircularProgress";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.40)",
  },
  content: {
    width: "80%",
    height: "535px",
    padding: "2rem",
    borderRadius: "1.25rem",
    border: "none",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
  },
};

Modal.setAppElement("#root");

function TransactionUpdateModal({ page }) {
  const {
    isTransactionUpdateModalOpen,
    setIsTransactionUpdateModalOpen,
    selectedRowData,
    selectedRowFullData,
    setRevalidateExchange,
    setRevalidateBuyCard,
    setRevalidateBuyCash,
    setRevalidateSellCard,
    setRevalidateSellCash,
    setRevalidateDefi,
    setRefetchTxData,
  } = useContext(TransActionUpdateModalContext);

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [isManuallyUpdatAvailable, setManuallyUpdatAvailable] = useState(false);
  const [isTransactionUpdateLoading, setTransactionUpdateLoading] =
    useState(false);
  const [formValues, setFormValues] = useState({
    hash: "",
    dispatcherTelegram: "",
    status: "",
  });

  useEffect(() => {
    resetForm();
    setStatus(null);
  }, [isManuallyUpdatAvailable]);

  useEffect(() => {
    if (status) {
      setFormValues({ ...formValues, status: status.name });
    }
  }, [status]);

  const closeModal = () => {
    setIsTransactionUpdateModalOpen(false);
    setStatus(null);
    setManuallyUpdatAvailable(false);
  };

  const handleToggleDropdown = () => {
    if (isManuallyUpdatAvailable) {
      setIsStatusDropdownOpen(!isStatusDropdownOpen);
    }
  };

  const resetForm = () => {
    setFormValues({
      hash: "",
      dispatcherTelegram: "",
      status: "",
    });
  };

  const updateTransactionMutate = async () => {
    const { status, hash, dispatcherTelegram } = formValues;
    let updatedTransactionData;

    switch (
      `${selectedRowFullData?.service}-${selectedRowFullData?.subService}`
    ) {
      case "exchange-exchange":
        updatedTransactionData = {
          id: selectedRowFullData?._id,
          status,
          hashOut: hash,
          service: selectedRowFullData?.service,
          subService: selectedRowFullData?.subService,
          progress: selectedRowFullData?.percentageProgress,
        };
        break;

      case "defi-defi":
        updatedTransactionData = {
          id: selectedRowFullData?._id,
          status,
          service: selectedRowFullData?.service,
          subService: selectedRowFullData?.subService,
          progress: selectedRowFullData?.percentageProgress,
        };
        break;

      case "buy-buyCash":
        updatedTransactionData = {
          id: selectedRowFullData?._id,
          status,
          dispatcherTelegram,
          hashOut: hash,
          service: selectedRowFullData?.service,
          subService: selectedRowFullData?.subService,
          progress: selectedRowFullData?.percentageProgress,
        };
        break;

      case "buy-buyCard":
        updatedTransactionData = {
          id: selectedRowFullData?._id,
          status,
          hashOut: hash,
          service: selectedRowFullData?.service,
          subService: selectedRowFullData?.subService,
          progress: selectedRowFullData?.percentageProgress,
        };
        break;

      case "sell-sellCash":
        updatedTransactionData = {
          id: selectedRowFullData?._id,
          status,
          dispatcherTelegram,
          service: selectedRowFullData?.service,
          subService: selectedRowFullData?.subService,
          progress: selectedRowFullData?.percentageProgress,
        };
        break;

      case "sell-sellCard":
        updatedTransactionData = {
          id: selectedRowFullData?._id,
          status,
          service: selectedRowFullData?.service,
          subService: selectedRowFullData?.subService,
          progress: selectedRowFullData?.percentageProgress,
        };
        break;
      default:
        console.error("Service and subservice are unknown");
    }

    try {
      setTransactionUpdateLoading(true);
      const response = await updateTransactionByIdService(
        updatedTransactionData
      );
      if (response) {
        revalidateRelatedServiceData();
        setRefetchTxData(true);
        localStorage.removeItem("txDataUpdate"); // remove from local storage to allow new data
        localStorage.removeItem("isUpdate"); // remove from local storage to allow new data
        localStorage.removeItem("isUpdating"); // remove from local storage to allow new data
      }
      toast.success("Updated successfully");
    } catch (e) {
      toast.error(e);
    } finally {
      setTransactionUpdateLoading(false);
      closeModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const revalidateRelatedServiceData = () => {
    switch (
      `${selectedRowFullData?.service}-${selectedRowFullData?.subService}`
    ) {
      case "exchange-exchange":
        setRevalidateExchange(true);
        break;

      case "defi-defi":
        setRevalidateDefi(true);
        break;

      case "buy-buyCash":
        setRevalidateBuyCash(true);
        break;

      case "buy-buyCard":
        setRevalidateBuyCard(true);
        break;

      case "sell-sellCash":
        setRevalidateSellCash(true);
        break;

      case "sell-sellCard":
        setRevalidateSellCard(true);
        break;
      default:
        console.error("Service and subservice are unknown");
    }
  };

  return (
    <Modal
      isOpen={isTransactionUpdateModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Token Modal"
    >
      <div className="flex flex-col">
        {isTransactionUpdateLoading && (
          <div
            className="w-full h-full flex fixed top-0 left-0 justify-center items-center gap-y-4 z-50"
            style={{ background: "rgba(255, 255, 255, 0.7)" }}
          >
            <CircularProgress />
          </div>
        )}
        <div className="flex justify-end">
          <img
            className="cursor-pointer"
            src={CloseIcon}
            alt="Close modal"
            onClick={closeModal}
          />
        </div>
        <div className="flex">
          <div className="flex flex-col w-[60%] h-full border-r border-solid border-[#E7E7E7] pr-10">
            <div className="text-11xl font-medium mb-7">
              Transaction Details
            </div>
            <table>
              <tbody>
                <tr className="h-8">
                  <th className="text-start w-1/5" scope="row">
                    Order №
                  </th>
                  <td className="w-full pl-6">
                    {selectedRowData?.orderNo || "-"}
                  </td>
                </tr>
                <tr className="h-8">
                  <th className="text-start w-1/5" scope="row">
                    From
                  </th>
                  <td className="w-full pl-6">
                    {selectedRowData?.from || "-"}
                  </td>
                </tr>
                <tr className="h-8">
                  <th className="text-start w-1/5" scope="row">
                    To
                  </th>
                  <td className="w-full pl-6">{selectedRowData?.to || "-"}</td>
                </tr>
                <tr className="h-8">
                  <th className="text-start w-1/5" scope="row">
                    Status
                  </th>
                  <td className="w-full pl-6">
                    {selectedRowData?.status || "-"}
                  </td>
                </tr>
                <tr className="h-8">
                  <th className="text-start w-1/5" scope="row">
                    Amount
                  </th>
                  <td className="w-full pl-6">
                    {selectedRowData?.amount || "-"}
                  </td>
                </tr>
                <tr className="h-8">
                  <th className="text-start w-1/5" scope="row">
                    User
                  </th>
                  <td className="w-full pl-6">
                    {selectedRowData?.userAddress || "-"}
                  </td>
                </tr>
                <tr className="h-8">
                  <th className="text-start w-1/5" scope="row">
                    Blendery
                  </th>
                  <td className="w-full pl-6">
                    {selectedRowData?.blenderyAddress || "-"}
                  </td>
                </tr>
                <tr className="h-8">
                  <th className="text-start w-1/5" scope="row">
                    Hash
                  </th>
                  <td className="w-full pl-6">
                    {selectedRowData?.hash || "-"}
                  </td>
                </tr>
                <tr className="h-8">
                  <th className="text-start w-1/5" scope="row">
                    Hash out
                  </th>
                  <td className="w-full pl-6">
                    {selectedRowData?.hashOut || "-"}
                  </td>
                </tr>
                <tr className="h-8">
                  <th className="text-start w-1/5" scope="row">
                    Country
                  </th>
                  <td className="w-full pl-6">
                    {selectedRowData?.country || "-"}
                  </td>
                </tr>
                <tr className="h-8">
                  <th className="text-start w-1/5" scope="row">
                    Timeleft
                  </th>
                  <td className="w-full pl-6">
                    {selectedRowData?.timeLeft || "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex flex-col justify-center items-center w-[40%] h-full">
            <div className="text-11xl font-medium mb-6">Update Transaction</div>
            <div className="flex">
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                  <label className="text-sm text-[#525252]">
                    Blendery payment status
                  </label>
                  <TransactionStatusDropdown
                    isStatusDropdownOpen={isStatusDropdownOpen}
                    setIsStatusDropdownOpen={setIsStatusDropdownOpen}
                    status={status}
                    setStatus={setStatus}
                    handleToggleDropdown={handleToggleDropdown}
                  />
                </div>
                {!["Defi", "Sell (Card)"].includes(page) && (
                  <>
                    {!["Sell (Cash)"].includes(page) && (
                      <div className="flex flex-col gap-y-2">
                        <label
                          htmlFor="hash"
                          className="text-sm text-[#525252]"
                        >
                          Transaction hash
                        </label>
                        <input
                          className="w-80 h-10 py-4 px-4 bg-white rounded-lg border border-solid border-[#E7E7E7] shadow-md outline-none box-border placeholder-[#B4B4B4] placeholder:font-semibold"
                          placeholder="Hash"
                          disabled={!isManuallyUpdatAvailable}
                          id="hash"
                          name="hash"
                          value={formValues.hash}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                    {["Sell (Cash)", "Buy (Cash)"].includes(page) && (
                      <div className="flex flex-col gap-y-2">
                        <label
                          htmlFor="dispatcherTelegram"
                          className="text-sm text-[#525252]"
                        >
                          Dispatcher Telegram
                        </label>
                        <input
                          className="w-80 h-10 py-4 px-4 bg-white rounded-lg border border-solid border-[#E7E7E7] shadow-md outline-none box-border placeholder-[#B4B4B4] placeholder:font-semibold"
                          placeholder="@username"
                          disabled={!isManuallyUpdatAvailable}
                          id="dispatcherTelegram"
                          name="dispatcherTelegram"
                          value={formValues.dispatcherTelegram}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="flex items-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value={isManuallyUpdatAvailable}
                    onChange={() =>
                      setManuallyUpdatAvailable(!isManuallyUpdatAvailable)
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ms-2 text-sm font-medium text-[#525252]"
                  >
                    Update manually
                  </label>
                </div>
                <button
                  type="button"
                  onClick={updateTransactionMutate}
                  disabled={
                    !isManuallyUpdatAvailable || isTransactionUpdateLoading
                  }
                  className="w-full p-2 m-0 bg-[#5046E5] rounded-lg font-medium shadow-none active:bg-[#5046E5] active:shadow-none disabled:bg-[#F6F6F6] disabled:text-[#484545]"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TransactionUpdateModal;
