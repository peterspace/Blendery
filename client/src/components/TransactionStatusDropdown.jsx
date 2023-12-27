import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { statuses } from "../constants/statuses";

function TransactionStatusDropdown({
  isStatusDropdownOpen,
  setIsStatusDropdownOpen,
  handleToggleDropdown,
  status,
  setStatus,
}) {
  const handleSelectStatus = (status) => {
    setStatus(status);
    setIsStatusDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
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
  );
}

export default TransactionStatusDropdown;
