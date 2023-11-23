import React, { useState } from "react";
import { MdQrCodeScanner } from "react-icons/md";

export const CashInfo = (props) => {
  const {
    setPercentageProgress,
    userAddress,
    setUserAddress,
    service,
    fValue,
    fToken,
    telegram,
    setTelegram,
  } = props;

  // const [city, setCity] = useState(cities[0]);
  const [isNextStep, setIsNextStep] = useState(false);

  const cashInfo = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-4 mt-2">
            <div
              className={`cursor-pointer hover:text-mediumspringgreen leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
            >
              Cash Payment Detail
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[320px] xs:w-[340px] h-px" />
        </div>

        <div className="flex flex-col w-[320px] xs:w-[340px] md:w-[452px] gap-[8px]">
          {/* <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
            <div className="md:w-[452px] w-[320px] xs:w-[340px]">
              <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                City
              </div>
              <div className="ml-2 flex flex-row gap-[8px] items-center w-[320px] xs:w-[340px] md:w-[452px] mt-[13px]">
                <div className="mr-4 w-[320px] xs:w-[340px] md:w-[452px]">
                  <select
                    name="city"
                    className={`[border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block bg-[transparent]`}
                    value={city}
                    onChange={(ev) => setCity(ev.target.value)}
                  >
                    {cities &&
                      cities.map((city, index) => (
                        <option key={index} value={city?.name}>
                          {city?.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
              <MdQrCodeScanner size={15} />
            </div>
          </div> */}
          <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between">
            <div className="md:w-[452px] w-[320px] xs:w-[340px]">
              <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                Recipient address
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
            <div className="">
              <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                Telegram
              </div>
              <input
                type="text"
                className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                placeholder="@jason"
                value={telegram}
                onChange={(ev) => setTelegram(ev.target.value)}
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
  return <>{cashInfo}</>;
};
