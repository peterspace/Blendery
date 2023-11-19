import React, { useState } from 'react';

import { MdQrCodeScanner } from 'react-icons/md';

export const BankInfo = (props) => {
  const {
    setPercentageProgress,
    userAddress,
    setUserAddress,
    service,
    fValue,
    fToken,
    provider,
    fullName,
    setFullName,
    bankName,
    setBankName,
    cardNumber,
    setCardNumber,
    phone,
    setPhone,
  } = props;

  const [isNextStep, setIsNextStep] = useState(false);

  const bankInfo = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-4 mt-2">
            <div
              className={`cursor-pointer hover:text-mediumspringgreen leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
            >
              Payment Details
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[320px] xs:w-[340px] h-px" />
        </div>
        {provider?.name === 'Phone' && (
          <>
            <div className="flex flex-col w-[320px] xs:w-[340px] md:w-[452px] gap-[8px]">
              <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Receivers wallet address
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                    placeholder="0x05301d500C789bd5..."
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
              <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Name
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                    placeholder="Aleksadra Romanov"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
              <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Phone
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                    placeholder="89809000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
              <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Bank
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                    placeholder="Sberbank"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    className="outline-none bg-whitesmoke-100 accent-mediumspringgreen focus:accent-mediumspringgreen/30"
                  />

                  <div className="flex flex-row gap-1 text-xs md:text-smi">
                    <div className="leading-[20px] text-darkslategray-200 inline-block">
                      I agree with Terms of Use, Privacy Policy and AML/KYC
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {provider?.name === 'Card' && (
          <>
            <div className="flex flex-col w-[320px] xs:w-[340px] md:w-[452px] gap-[8px]">
              <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Receivers wallet address
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                    placeholder="0x05301d500C789bd5..."
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
              <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Name
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                    placeholder="Aleksadra Romanov"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
              <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
                <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                  <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                    Card
                  </div>
                  <input
                    type="text"
                    className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                    placeholder="5543001289004530"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                  <MdQrCodeScanner size={15} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-2">
                  <input
                    type="checkbox"
                    className="outline-none bg-whitesmoke-100 accent-mediumspringgreen focus:accent-mediumspringgreen/30"
                  />

                  <div className="flex flex-row gap-1 text-xs md:text-smi">
                    <div className="leading-[20px] text-darkslategray-200 inline-block">
                      I agree with Terms of Use, Privacy Policy and AML/KYC
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {isNextStep ? (
          <div
            className="mb-4 cursor-pointer flex flex-row justify-center items-center w-full bg-mediumspringgreen hover:opacity-90 text-white h-[49px] shrink-0 rounded"
            onClick={() => {
              setPercentageProgress(3);
            }}
          >
            Next step
          </div>
        ) : (
          <div
            className="mb-4 cursor-pointer flex flex-row justify-center items-center w-full bg-mediumspringgreen hover:opacity-90 text-white h-[49px] shrink-0 rounded"
            onClick={() => {
              setIsNextStep(true);
            }}
          >
            {service} {fValue} {fToken?.symbol}
          </div>
        )}
      </div>
    </div>
  );
  return <>{bankInfo}</>;
};
