import { useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { MdQrCodeScanner } from 'react-icons/md';
import BanksDropdown from './BanksDropdown';
import { useCardPaymentSystemIcon } from '../hooks/useCardDetector';

export const BankInfo = (props) => {
  const {
    setPercentageProgress,
    setUserAddress,
    service,
    fValue,
    fToken,
    provider,
    setFullName,
    setBankName,
    setCardNumber,
    setPhone,
  } = props;

  const [selectedBank, setSelectedBank] = useState(null);

  console.log({ selectedBank: selectedBank });



  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      receiverAddress: '',
      name: '',
      phoneNumber: '',
      bankName: '',
      cardNumber: '',
      isTermsChecked: false,
    },
    validate: (values) => {
      const errors = {};

      if (!values.receiverAddress) {
        errors.receiverAddress = 'Receiver address is required!';
      }

      if (!values.name) {
        errors.name = 'Name is required!';
      }

      if (provider?.name === 'Phone' && !values.phoneNumber) {
        errors.phoneNumber = 'Phone number is required!';
      }

      if (provider?.name === 'Phone' && !values.bankName) {
        errors.bankName = 'Bank name is required!';
      }

      if (provider?.name === 'Card' && !values.cardNumber) {
        errors.cardNumber = 'Card number is required!';
      }

      if (!values.isTermsChecked) {
        errors.isTermsChecked =
          'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy';
      }

      return errors;
    },
    onSubmit: (values) => {
      setUserAddress(values.receiverAddress);
      setFullName(values.name);
      setPhone(values.phoneNumber);
      setBankName(values.bankName);
      setCardNumber(values.cardNumber);

      setPercentageProgress(3);
    },
  });

  const paymentSystemIcon = useCardPaymentSystemIcon(values.cardNumber);

  // const { paymentSystemIcon, setPaymentSystemIcon } = useState(null);

  // useEffect(() => {

  // }, [values.cardNumber])

  useEffect(() => {
    resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  useEffect(() => {
    if (selectedBank?.name) {
      handleBankSelect(selectedBank?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBank]);

  const handleBankSelect = (selectedBank) => {
    setFieldValue('bankName', selectedBank);
  };

  const handleCardNumberChange = (event) => {
    const { name, value } = event.target;
    const formattedValue = value.replace(/\D/g, '');

    if (formattedValue.length > 16) {
      return;
    }
    setFieldValue(name, formattedValue);
  };

  const bankInfo = (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row gap-4 mt-2">
              <div
                className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
              >
                Payment Details
              </div>
            </div>
            <div className="flex bg-lightslategray-300 md:w-[452px] w-[320px] xs:w-[340px] h-px" />
          </div>
          {provider?.name === 'Phone' && (
            <>
              <div>
                <BanksDropdown
                  // handleBankSelect={handleBankSelect}
                  selectedBank={selectedBank}
                  setSelectedBank={setSelectedBank}
                />
                <div>
                  {touched.bankName && errors.bankName ? (
                    <div className="text-[#ef4444]">{errors.bankName}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col w-[320px] xs:w-[340px] md:w-[452px] gap-[8px]">
                <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
                  <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                    <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                      Receivers wallet address
                    </div>
                    <input
                      id="receiverAddress"
                      name="receiverAddress"
                      type="text"
                      className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                      placeholder="0x05301d500C789bd5..."
                      value={values.receiverAddress}
                      onChange={handleChange}
                    />
                    <div>
                      {touched.receiverAddress && errors.receiverAddress ? (
                        <div className="mt-4 text-[#ef4444]">
                          {errors.receiverAddress}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                    <MdQrCodeScanner size={15} />
                  </div>
                </div>
                <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
                  <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                    <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                      Name
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                      placeholder="Aleksadra Romanova"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <div>
                      {touched.name && errors.name ? (
                        <div className="mt-4 text-[#ef4444]">{errors.name}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                    <MdQrCodeScanner size={15} />
                  </div>
                </div>
                <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
                  <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                    <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                      Phone
                    </div>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
                      className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                      placeholder="79031234567"
                      value={values.phoneNumber}
                      onChange={handleChange}
                    />
                    <div>
                      {touched.phoneNumber && errors.phoneNumber ? (
                        <div className="mt-4 text-[#ef4444]">
                          {errors.phoneNumber}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                    <MdQrCodeScanner size={15} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-2">
                    <input
                      id="isTermsChecked"
                      name="isTermsChecked"
                      type="checkbox"
                      value={values.isTermsChecked}
                      onChange={handleChange}
                      className="outline-none bg-whitesmoke-100 accent-bgPrimary focus:accent-bgPrimary/30"
                    />

                    <div className="flex flex-row gap-1 text-xs md:text-smi">
                      <div className="leading-[20px] text-darkslategray-200 inline-block">
                        I agree with Terms of Use, Privacy Policy and AML/KYC
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-1">
                    {touched.isTermsChecked && errors.isTermsChecked ? (
                      <div className="mt-1 text-[#ef4444]">
                        {errors.isTermsChecked}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          )}
          {provider?.name === 'Card' && (
            <>
              <div className="flex flex-col w-[320px] xs:w-[340px] md:w-[452px] gap-[8px]">
                <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
                  <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                    <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                      Receivers wallet address
                    </div>
                    <input
                      id="receiverAddress"
                      name="receiverAddress"
                      type="text"
                      className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                      placeholder="0x05301d500C789bd5..."
                      value={values.receiverAddress}
                      onChange={handleChange}
                    />
                    <div>
                      {touched.receiverAddress && errors.receiverAddress ? (
                        <div className="mt-4 text-[#ef4444]">
                          {errors.receiverAddress}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                    <MdQrCodeScanner size={15} />
                  </div>
                </div>
                <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
                  <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                    <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                      Name
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                      placeholder="Aleksadra Romanova"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <div>
                      {touched.name && errors.name ? (
                        <div className="mt-4 text-[#ef4444]">{errors.name}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                    <MdQrCodeScanner size={15} />
                  </div>
                </div>
                <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
                  <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                    <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                      Card
                    </div>
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                      placeholder="Card Number"
                      value={values.cardNumber}
                      onChange={handleCardNumberChange}
                    />
                    <div>
                      {touched.cardNumber && errors.cardNumber ? (
                        <div className="mt-4 text-[#ef4444]">
                          {errors.cardNumber}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="cursor-pointer mr-2 flex justify-center items-center w-[36px] h-[64px] overflow-hidden">
                    {paymentSystemIcon && (
                      <img src={paymentSystemIcon} alt="Payment system" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-2">
                    <input
                      id="isTermsChecked"
                      name="isTermsChecked"
                      type="checkbox"
                      value={values.isTermsChecked}
                      onChange={handleChange}
                      className="outline-none bg-whitesmoke-100 accent-bgPrimary focus:accent-bgPrimary/30"
                    />

                    <div className="flex flex-row gap-1 text-xs md:text-smi">
                      <div className="leading-[20px] text-darkslategray-200 inline-block">
                        I agree with Terms of Use, Privacy Policy and AML/KYC
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-1">
                    {touched.isTermsChecked && errors.isTermsChecked ? (
                      <div className="mt-1 text-[#ef4444]">
                        {errors.isTermsChecked}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </>
          )}

          <div
            className="mb-4 cursor-pointer flex flex-row justify-center items-center bg-bgPrimary text-white w-full hover:opacity-90 h-[49px] shrink-0 rounded transition ease-in-out delay-150"
            onClick={handleSubmit}
          >
            {service} {fValue} {fToken?.symbol}
          </div>
        </div>
      </div>
    </form>
  );
  return <>{bankInfo}</>;
};
