import { useFormik } from 'formik';

import { MdQrCodeScanner } from 'react-icons/md';

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

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      recipientAddress: '',
      telegram: '',
      isTermsChecked: false,
    },
    validate: (values) => {
      const errors = {};

      if (!values.recipientAddress) {
        errors.recipientAddress = 'Recipient address is required!';
      }

      if (!values.telegram) {
        errors.telegram = 'Telegram address is required!';
      }

      if (!values.isTermsChecked) {
        errors.isTermsChecked =
          'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy';
      }

      return errors;
    },
    onSubmit: (values) => {
      setUserAddress(values.recipientAddress);
      setTelegram(values.telegram);
      setPercentageProgress(3);
    },
  });

  // const [city, setCity] = useState(cities[0]);

  const cashInfo = (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-row gap-4 mt-2">
              <div
                className={`cursor-pointer hover:text-bgPrimary leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
              >
                Cash Payment Detail
              </div>
            </div>
            <div className="flex bg-lightslategray-300 md:w-[452px] w-[320px] xs:w-[340px] h-px" />
          </div>

          <div className="flex flex-col w-[320px] xs:w-[340px] md:w-[452px] gap-3">
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
            <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
              <div className="md:w-[452px] w-[320px] xs:w-[340px]">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                  Recipient address
                </div>
                <input
                  id="recipientAddress"
                  name="recipientAddress"
                  type="text"
                  className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                  placeholder="0x05301d500C789bd5..."
                  value={values.recipientAddress}
                  onChange={handleChange}
                  // onChange={(e) => setUserAddress(e.target.value)}
                />
                <div>
                  {touched.recipientAddress && errors.recipientAddress ? (
                    <div className="mt-4 text-[#ef4444]">
                      {errors.recipientAddress}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="cursor-pointer mr-2 flex justify-center items-center w-[18px] h-[64px] overflow-hidden">
                <MdQrCodeScanner size={15} />
              </div>
            </div>
            <div className="flex flex-row bg-whitesmoke-100 rounded h-[62px] justify-between mb-5">
              <div className="">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200">
                  Telegram
                </div>
                <input
                  id="telegram"
                  name="telegram"
                  type="text"
                  className="ml-2 text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 inline-block w-[90%] outline-none bg-whitesmoke-100 placeholder-darkgray-100"
                  placeholder="@jason"
                  value={values.telegram}
                  onChange={handleChange}
                />
                <div>
                  {touched.telegram && errors.telegram ? (
                    <div className="mt-4 text-[#ef4444]">{errors.telegram}</div>
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
  return <>{cashInfo}</>;
};
