import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

import { banksOptions } from "../constants";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const BanksDropdown = ({ handleBankSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    handleSearchBank(selectedBank?.name);
  }, [searchTerm]);

  useEffect(() => {
    if (selectedBank?.name) {
      handleBankSelect(selectedBank?.name);
    }
  }, [selectedBank]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      // Reset search term and focus on input when opening dropdown
      setSearchTerm("");
    }
  };

  const handleSelectBank = (bank) => {
    setSelectedBank(bank);
    setIsOpen(false);
  };

  const handleSearchBank = () => {
    const filteredBanks = banksOptions.filter((bank) =>
      bank.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setBanks(filteredBanks);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex mt-0 justify-between items-center text-xs leading-[18px] text-[#B4B4B4] w-[320px] xs:w-[340px] md:w-[452px] h-[62px] gap-[8px] bg-whitesmoke-100 shadow-none active:bg-whitesmoke-100 active:shadow-none mx-0 px-4"
          onClick={handleToggleDropdown}
        >
          <div className="flex w-full justify-between items-center">
            {selectedBank ? (
              <>
                <div className="flex items-center">
                  <img
                    src={selectedBank?.image}
                    alt="Bank Logo"
                    className="w-16 mr-6"
                  />

                  <div className="text-black font-normal text-[16px]">
                    {selectedBank?.name}
                  </div>
                </div>
                <div className="flex h-full items-center">
                  {isOpen ? (
                    <FaChevronUp size={16} />
                  ) : (
                    <FaChevronDown size={16} />
                  )}
                </div>
              </>
            ) : (
              <div className="flex w-full items-center justify-between">
                <span className="text-darkslategray-200">
                  {"Select a Bank"}
                </span>
                {isOpen ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )}
              </div>
            )}
          </div>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white w-[320px] xs:w-[340px] md:w-[452px]">
          <div className="py-1">
            <div className="relative text-gray-600">
              <input
                type="text"
                className="pl-2 pr-10 py-2 w-[320px] xs:w-[340px] md:w-[452px] box-border outline-none border-0"
                placeholder="Search banks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-600">
                <FiSearch color="gray" />
              </div>
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {banks.map((bank, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectBank(bank)}
              >
                <div className="flex items-center">
                  <img src={bank.image} alt="Bank Logo" className="w-16 mr-6" />
                  <span>{bank.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BanksDropdown;
