import React, { useState } from 'react';

// import { FaBeer } from 'react-icons/fa';
import {
  BsInfoCircleFill,
  BsFillArrowRightCircleFill,
  BsCheckAll,
} from 'react-icons/bs';
import { MdQrCodeScanner } from 'react-icons/md';
import {
  PiLockSimpleBold,
  PiLockSimpleOpenBold,
  PiTrendUpDuotone,
} from 'react-icons/pi';

import { AiFillCheckCircle, AiOutlineArrowRight } from 'react-icons/ai';
import { FiCheckCircle } from 'react-icons/fi';
import { TfiTimer } from 'react-icons/tfi';
import { RxCopy } from 'react-icons/rx';
import { RiFileWarningFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple, AiOutlineClose } from 'react-icons/ai';
//

import { FaFacebookSquare } from 'react-icons/fa';
import { ProgressStages1 } from './ProgressStages1';
import { ProgressStages2 } from './ProgressStages2';
import { ProgressStages3 } from './ProgressStages3';
import { ProgressStages4 } from './ProgressStages4';
import { stepsExchange, stepsBuy, stepsSell, stepsDefi } from '../constants';
import { HowToCard } from './HowToCard';
import { FaqCard } from './FaqCard';
import { faqExchange, faqBuy, faqSell, faqDefi } from '../constants';
import { FeedBack } from './Feedback';
import { feedback } from '../constants';

import { helpExchange, helpBuy, helpSell, helpDefi } from '../constants';
import { HelpGuide } from './HelpGuide';

import { Footer } from './Footer';
import { DashboardMenu } from './DashboardMenu';
import { History } from './History';
import { WalletBalances } from './WalletBalances';
import { CardWallet } from './CardWallet';
import { TotalBalance } from './TotalBalance';
import { OrderCard } from './OrderCard';

export const TransactionDetail = () => {
  // const [isLightMode, setIsLightMode] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  const [isCheck, setIsCheck] = useState(true);

  const [isArrow, setIsArrow] = useState(true);

  const [percentageProgress, setPercentageProgress] = useState(1);

  console.log({ stepsExchange: stepsExchange });

  // const handleClick = () => {
  //   if (isLoggedIn) {
  //     window.location.reload();
  //     return;
  //   }
  //   setShowModal(true);
  //   setIsSignUp(true);
  // };

  const details = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[276px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-4 mt-2">
            <div
              className={`cursor-pointer hover:text-mediumspringgreen leading-[24px] inline-block text-darkslategray-200 text-[24px]`}
            >
              Calculate amount
            </div>
          </div>
          <div className="flex bg-lightslategray-300 w-[276px] h-px" />
        </div>

        <div className="flex flex-col gap-[8px]">
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              You send
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200">
              {0.1} {'BTC'}
            </div>
          </div>
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              Exchange rate
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200">
              {0.1} {'BTC'}
            </div>
          </div>
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              Service fee (0.25%)
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200">
              {0.1} {'BTC'}
            </div>
          </div>
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              Network fee
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200">
              {0.1} {'BTC'}
            </div>
          </div>
          <div className="flex bg-lightslategray-300 w-[276px] h-px" />
          <div className="ml-2">
            <div className="mt-2 text-xs leading-[18px] text-darkgray-100">
              You get
            </div>
            <div className="font-bold text-lg leading-[24px] text-darkslategray-200">
              {0.153768} {'USDT20'}
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full" />
      </div>
    </div>
  );

  const timer = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[276px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex flex-row gap-2 mt-2">
            <TfiTimer size={20} color="#b4b4b4" />
            <div className="text-base leading-[24px] text-gray-300 inline-block w-[69px]">
              02:59:48
            </div>
          </div>
          <div className="text-xs leading-[18px] text-darkslategray-100 inline-block w-[146px]">
            Time left to send 0.1 ETH
          </div>
          <div className="flex bg-lightslategray-300 w-[276px] h-px" />
          <div className="">
            <div className="flex flex-row gap-2 mt-2">
              <div className="leading-[20px] text-gray-300 inline-block w-[145px]">
                97pqbllmmxbzpbhz
              </div>
              <RxCopy size={15} color="#b4b4b4" />
            </div>

            <div className="text-xs leading-[18px] text-darkslategray-100 inline-block w-[87px]">
              Transaction ID
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full" />
      </div>
    </div>
  );

  const sendFund = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        {/* <div className="flex flex-col gap-[12px] md:gap-[24px]"> */}
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row gap-4 mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Send funds to the address below
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>

        <div className="flex flex-col w-[370px] md:w-[452px] gap-[8px]">
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Amount
            </div>
            <div className="flex flex-row justify-start gap-1 w-[50%]">
              <div className="text-base leading-[24px] text-gray-300 inline-block">
                {0.1} {'ETH'}
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="text-smi leading-[22px] text-darkgray-100 inline-block w-[50%]">
              Blendery address {`(${'ETH'})`}
            </div>
            <div className="flex flex-col justify-start w-[50%]">
              <div className="text-base leading-[24px] text-gray-300 w-[298px]">
                0xaad7411acaf1937165de
                <br />
                9f1ff98827ba331acb88
              </div>
              <div className="text-xs leading-[16px] text-limegreen inline-block">
                blockchain: {'ethereum'}
              </div>
              <div className="flex flex-row gap-2 mt-2">
                <div className=" cursor-pointer flex flex-row justify-center items-center bg-mediumspringgreen hover:opacity-90 text-white h-[49px] shrink-0 rounded w-[70%]">
                  <div className="flex flex-row gap-2">
                    <RxCopy size={15} color="#b4b4b4" />
                    <div className="leading-[20px] inline-block">
                      copy address
                    </div>
                  </div>
                </div>

                <div className="cursor-pointer flex flex-row justify-center items-center bg-whitesmoke-100 hover:opacity-90 text-mediumspringgreen h-[49px] shrink-0 rounded w-[30%]">
                  Next
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row bg-orangeLight rounded p-1 md:w-[452px] w-[370px]">
          <div className="ml-1 flex justify-center items-center w-[24px] flex-shrink-0">
            {' '}
            <RiFileWarningFill color="#FFB000" size={15} />{' '}
          </div>
          <div className="text-xs leading-[14.4px] text-darkslategray-200 inline-block w-[424px]">
            Please note that you can send funds to the address above only once.
          </div>
        </div>
        <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        <div className="">
          <div className="text-base leading-[24px] inline-block w-[211px]">
            or request funds with FIO
          </div>
        </div>
        <div className="flex flex-row h-[62px] bg-whitesmoke-100 rounded">
          <input
            type="text"
            className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
            placeholder="FIO address"
          />
        </div>
        <div className="flex flex-row justify-end">
          <div className="cursor-pointer flex flex-row justify-center items-center bg-mediumspringgreen hover:opacity-90 text-white h-[49px] shrink-0 rounded w-[30%]">
            Request
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );

  const checkout = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row justify-between mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Checkout
            </div>
            <div className="cursor-pointer flex flex-row justify-center items-center bg-whitesmoke-100 hover:opacity-90 text-mediumspringgreen shrink-0 rounded px-6 py-3">
              Back
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>
        {/* ==========================={You send}==================================== */}
        <div className="flex flex-col w-[370px] md:w-[452px] gap-[8px]">
          <div className="flex flex-col gap-4  md:flex-row md:gap-0">
            <div className="flex flex-col w-[50%]">
              <div className="text-smi leading-[22px] text-darkgray-100 inline-block">
                You send
              </div>
              <div className="text-base leading-[24px] text-gray-300 inline-block">
                {0.1} {'ETH'}
              </div>
              <div className="text-xs leading-[16px] text-limegreen inline-block">
                blockchain: {'ethereum'}
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <div className="text-smi leading-[22px] text-darkgray-100 inline-block">
                You get
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-base leading-[24px] text-gray-300 inline-block">
                  {'~'} {0.154675543} {'USDT20'}
                </div>
                {/* <div className="bg-gray-100 text-black text-xs px-1 rounded">
                  {'ERC20'}
                </div> */}
              </div>

              <div className="text-xs leading-[16px] text-limegreen inline-block">
                blockchain: {'ethereum'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        {/* ==========================={Exchange fee}==================================== */}
        <div className="flex flex-col w-[370px] md:w-[452px] gap-[8px]">
          <div className="flex flex-col gap-4  md:flex-row md:gap-0">
            <div className="flex flex-col w-[50%]">
              <div className="leading-[20px] text-darkgray-200 inline-block w-[95px]">
                Exchange fee
              </div>
              <div className="text-base leading-[24px] text-black inline-block w-40">
                {0.39901783} {'USDT20'}
              </div>
              <div className="text-3xs leading-[12px] text-darkgray-100 inline-block w-[216px]">
                The exchange fee is already included in the displayed amount
                you’ll get
              </div>
            </div>
            <div className="flex flex-col w-[50%]">
              <div className="text-smi leading-[20px] text-darkgray-200 inline-block w-[85px]">
                Network fee
              </div>
              <div className="text-base leading-[24px] text-black inline-block w-[102px]">
                {5.25} {'USDT20'}
              </div>
              <div className="text-3xs leading-[12px] text-darkgray-100 inline-block w-52">
                The network fee is already included in the displayed amount
                you’ll get
              </div>
            </div>
          </div>
        </div>
        <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        {/* ==========================={Recepient address}==================================== */}
        <div className="flex flex-col w-[370px] md:w-[452px] gap-[8px]">
          <div className="flex flex-col gap-4  md:flex-row md:gap-0">
            <div className="flex flex-col w-[50%]">
              <div className="leading-[20px] text-darkgray-200 inline-block w-[126px]">
                Recipient address
              </div>
              <div className="text-base leading-[24px] text-black inline-block w-[237px]">
                0x2Df52c4a209A5fce988A
                <br />
                FAa070209D4fFFDd282e
              </div>
              {/* <div className="flex flex-row w-[200px]">
                <div className="text-base leading-[24px] text-black">
                  0x2Df52c4a209A5fce988AFAa070209D4fFFDd282e
                </div>
              </div> */}
            </div>
            <div className="flex flex-col w-[50%]">
              <div className="leading-[20px] text-darkgray-200 inline-block w-[101px]">
                Exchange rate
              </div>
              <div className="text-base leading-[24px] text-black inline-block w-[177px]">
                {1} {'ETH'} ~ {'1,596.07131829'} {'USDT20'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );

  const signup = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        {/* <div className="flex flex-col gap-[12px] md:gap-[24px]"> */}
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row gap-4 mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Signup to make payment
            </div>
          </div>
          <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>
        <div className="flex flex-row h-[62px] bg-whitesmoke-100 rounded">
          <input
            type="text"
            className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            {/* <input type="checkbox" className="outline-none bg-whitesmoke-100" /> */}
            <input
              type="checkbox"
              className="outline-none bg-whitesmoke-100 accent-mediumspringgreen focus:accent-mediumspringgreen/30"
            />

            <div className="flex flex-row gap-1 text-xs md:text-smi">
              <div className="leading-[20px] text-darkslategray-200 inline-block">
                Send me promos, market news and product updates
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="cursor-pointer flex flex-row justify-center items-center bg-mediumspringgreen hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
            Sign up & make payment
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center">
          <div className="cursor-pointer rounded bg-gray-100 h-[30px] w-[30px] outline outline-gray-200">
            <FcGoogle size={30} color="#b4b4b4" />
          </div>
          <div className="cursor-pointer rounded h-[34px] w-[34px]">
            <FaFacebookSquare size={34} color="#3C5A9F" />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-center">
          <div className="text-smi leading-[22px] text-gray-300 inline-block">
            Already have an account?
          </div>
          <div className="cursor-pointer text-smi leading-[22px] text-mediumspringgreen hover:text-opacity-80 inline-block">
            Log in
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );

  const progressBarAnimation4Stages = (
    <>
      {/* ========================{step 1 of 4}===================================== */}
      <div className="flex flex-row w-[276px] bg-lightslategray-300 rounded-lg">
        <div className="flex bg-mediumspringgreen rounded-lg w-[25%] h-[12px] z-10" />
      </div>
      {/* ========================{step 2 of 4}===================================== */}
      <div className="flex flex-row w-[276px] bg-lightslategray-300 rounded-lg">
        <div className="flex bg-mediumspringgreen rounded-lg w-[50%] h-[12px] z-10" />
      </div>
      {/* ========================{step 3 of 4}===================================== */}
      <div className="flex flex-row w-[276px] bg-lightslategray-300 rounded-lg">
        <div className="flex bg-mediumspringgreen rounded-lg w-[75%] h-[12px] z-10" />
      </div>
      {/* ========================{step 4 of 4}===================================== */}
      <div className="flex flex-row w-[276px] bg-lightslategray-300 rounded-lg">
        <div className="flex bg-mediumspringgreen rounded-lg w-[100%] h-[12px] z-10" />
      </div>
    </>
  );
  const progressBarAnimation3Stages = (
    <>
      {/* ========================{step 2 of 4}===================================== */}
      <div className="flex flex-row w-[276px] bg-lightslategray-300 rounded-lg">
        <div className="flex bg-mediumspringgreen rounded-lg w-[35%] h-[12px] z-10" />
      </div>
      {/* ========================{step 3 of 4}===================================== */}
      <div className="flex flex-row w-[276px] bg-lightslategray-300 rounded-lg">
        <div className="flex bg-mediumspringgreen rounded-lg w-[70%] h-[12px] z-10" />
      </div>
      {/* ========================{step 4 of 4}===================================== */}
      <div className="flex flex-row w-[276px] bg-lightslategray-300 rounded-lg">
        <div className="flex bg-mediumspringgreen rounded-lg w-[100%] h-[12px] z-10" />
      </div>
    </>
  );

  const howToCard = (
    <div className="flex justify-center rounded-lg w-[228px] p-4 bg-gray-100">
      <div className="flex flex-row gap-2 w-full">
        <div className="flex justify-center items-center w-[24px] h-[24px] flex-shrink-0 bg-gainsboro-100 p-1 rounded">
          <div className="text-xs leading-[17px] font-sans font-bold text-mediumspringgreen inline-block w-[7px]">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xs font-sans font-medium leading-[17px] inline-block">
            Wallet address
          </div>
          <div className="text-xs leading-[17px] inline-block">
            Fill in the crypto wallet address details
          </div>
        </div>
      </div>
    </div>
  );
  const howToCard2 = (
    <div className="flex justify-center rounded-lg w-[228px] p-4 bg-gray-100">
      <div className="flex flex-row gap-2 w-full">
        <div className="flex justify-center items-center w-[24px] h-[24px] flex-shrink-0 bg-gainsboro-100 p-1 rounded">
          <div className="text-xs leading-[17px] font-sans font-bold text-mediumspringgreen inline-block w-[7px]">
            1
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xs font-sans font-medium leading-[17px] inline-block">
            Wallet address
          </div>
          <div className="text-xs leading-[17px] inline-block">
            Fill in the crypto wallet address details
          </div>
        </div>
      </div>
    </div>
  );

  const signup2 = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        {/* <div className="flex flex-col gap-[12px] md:gap-[24px]"> */}
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row justify-between mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Signup for Blendery
            </div>
            <div className="" onClick={''}>
              <AiOutlineClose size={16} />
            </div>
          </div>
          {/* <div className="text-gray-200">
            Blendery is totally free to use. Sign up using your email address
            below to get started.
          </div> */}

          <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>
        <div className="flex flex-row h-[48px] bg-whitesmoke-100 rounded outline outline-lightslategray-300 outline-[1px]">
          <input
            type="text"
            className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
            placeholder="Username"
            value={''}
            onChange={''}
          />
        </div>
        <div className="flex flex-row h-[48px] bg-whitesmoke-100 rounded outline outline-lightslategray-300 outline-[1px]">
          <input
            type="text"
            className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
            placeholder="Email"
            value={''}
            onChange={''}
          />
        </div>
        <div className="flex flex-row h-[48px] bg-whitesmoke-100 rounded outline outline-lightslategray-300 outline-[1px]">
          <input
            type="text"
            className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
            placeholder="Password"
            value={''}
            onChange={''}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              className="outline-none bg-whitesmoke-100 accent-mediumspringgreen focus:accent-mediumspringgreen/30"
            />

            <div className="flex flex-row gap-1 text-xs md:text-smi">
              <div className="leading-[20px] text-darkslategray-200 inline-block">
                <span>{`I agree to the `}</span>
                <span
                  className="text-mediumspringgreen"
                  onClick={''}
                >{`terms and conditions`}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="checkbox"
              className="outline-none bg-whitesmoke-100 accent-mediumspringgreen focus:accent-mediumspringgreen/30"
            />

            <div className="flex flex-row gap-1 text-xs md:text-smi">
              <div className="leading-[20px] text-darkslategray-200 inline-block">
                Send me promos, market news and product updates
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="cursor-pointer flex flex-row justify-center items-center bg-mediumspringgreen hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
            Create account
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <div className="flex bg-lightslategray-300 w-[150px] h-px" />
          <div className="text-smi leading-[22px] text-gray-300 inline-block">
            or
          </div>
          <div className="flex bg-lightslategray-300 w-[150px] h-px" />
        </div>
        <div className="flex flex-col justify-center items-center gap-[16px]">
          <div className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-mediumspringgreen h-[49px] shrink-0 rounded w-full outline outline-mediumspringgreen outline-[1.5px]">
            <FcGoogle size={20} />
            <span className="ml-2"> Continue with Google</span>
          </div>
          <div className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-mediumspringgreen h-[49px] shrink-0 rounded w-full outline outline-mediumspringgreen outline-[1.5px]">
            <AiFillApple size={20} />
            <span className="ml-2">Continue with Apple</span>
          </div>
          <div className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-mediumspringgreen h-[49px] shrink-0 rounded w-full outline outline-mediumspringgreen outline-[1.5px]">
            <FaFacebookSquare size={20} />
            <span className="ml-2"> Continue with Facebook</span>
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-center">
          <div className="text-smi leading-[22px] text-gray-300 inline-block">
            Already have an account?
          </div>
          <div className="cursor-pointer text-smi leading-[22px] text-mediumspringgreen hover:text-opacity-80 inline-block">
            Log in
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );

  const login = (
    <div className="flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[375px] md:w-[500px] p-4">
      <div className="flex flex-col gap-[24px]">
        {/* <div className="flex flex-col gap-[12px] md:gap-[24px]"> */}
        <div className="flex flex-col gap-[8px] md:gap-[12px]">
          <div className="flex flex-row justify-between mt-[24px]">
            <div className="text-[18px] md:text-[24px] font-extrabold leading-[32px] inline-block">
              Login to Blendery
            </div>
            <div className="" onClick={''}>
              <AiOutlineClose size={16} />
            </div>
          </div>
          {/* <div className="text-gray-200">
            Blendery is totally free to use. Sign up using your email address
            below to get started.
          </div> */}

          <div className="flex bg-lightslategray-300 md:w-[452px] w-[370px] h-px" />
        </div>
        <div className="flex flex-row h-[48px] bg-whitesmoke-100 rounded outline outline-lightslategray-300 outline-[1px]">
          <input
            type="text"
            className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
            placeholder="Email"
            value={''}
            onChange={''}
          />
        </div>
        <div className="flex flex-row h-[48px] bg-whitesmoke-100 rounded outline outline-lightslategray-300 outline-[1px]">
          <input
            type="text"
            className="ml-2 text-[16px] md:text-[14px] leading-[24px] text-darkslategray-200 placeholder-darkgray-100 inline-block w-full outline-none bg-gray-100"
            placeholder="Password"
            value={''}
            onChange={''}
          />
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="cursor-pointer flex flex-row justify-center items-center bg-mediumspringgreen hover:opacity-90 text-white h-[49px] shrink-0 rounded w-full">
            Login
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <div className="flex bg-lightslategray-300 w-[150px] h-px" />
          <div className="text-smi leading-[22px] text-gray-300 inline-block">
            or
          </div>
          <div className="flex bg-lightslategray-300 w-[150px] h-px" />
        </div>
        <div className="flex flex-col justify-center items-center gap-[16px]">
          <div className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-mediumspringgreen h-[49px] shrink-0 rounded w-full outline outline-mediumspringgreen outline-[1.5px]">
            <FcGoogle size={20} />
            <span className="ml-2"> Continue with Google</span>
          </div>
          <div className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-mediumspringgreen h-[49px] shrink-0 rounded w-full outline outline-mediumspringgreen outline-[1.5px]">
            <AiFillApple size={20} />
            <span className="ml-2">Continue with Apple</span>
          </div>
          <div className="cursor-pointer flex flex-row justify-center items-center bg-white hover:opacity-90 text-mediumspringgreen h-[49px] shrink-0 rounded w-full outline outline-mediumspringgreen outline-[1.5px]">
            <FaFacebookSquare size={20} />
            <span className="ml-2"> Continue with Facebook</span>
          </div>
        </div>

        <div className="flex flex-row gap-2 justify-center">
          <div className="text-smi leading-[22px] text-gray-300 inline-block">
            {"Don't have an account?"}
          </div>
          <div className="cursor-pointer text-smi leading-[22px] text-mediumspringgreen hover:text-opacity-80 inline-block">
            Signup now!
          </div>
        </div>

        <div className="flex flex-row w-full" />
      </div>
    </div>
  );

  return (
    <div className="relative bg-white w-full h-screen overflow-auto text-left text-sm text-gray-400 font-montserrat">
      <div className="mt-8 flex flex-col justify-center items-center gap-4 mb-8">
        {details}
        {timer}
        {sendFund}
        {checkout}
        {signup}
        <FeedBack data={feedback} title={'Testimonials'} />
        <HowToCard data={stepsExchange} title={'How to Exchange Crypto'} />
        <HowToCard data={stepsBuy} title={'How to buy cryptocurrency'} />
        <HowToCard data={stepsSell} title={'How to sell cryptocurrency'} />
        <HowToCard data={stepsDefi} title={'How to swap Defi tokens'} />

        <FaqCard data={faqExchange} title={'FaQ Exchange'} />
        <FaqCard data={faqBuy} title={'FaQ Buy'} />
        <FaqCard data={faqSell} title={'FaQ Sell'} />
        <FaqCard data={faqDefi} title={'FaQ Defi Swap'} />
        <HelpGuide
          data={helpDefi}
          title={'Helpful guides'}
          isLightMode={isLightMode}
        />

        <>
          {percentageProgress === 1 && <ProgressStages1 />}
          {percentageProgress === 2 && <ProgressStages2 />}
          {percentageProgress === 3 && <ProgressStages3 />}
          {percentageProgress === 4 && <ProgressStages4 />}
        </>
        {/* <FeedBack data={feedback} title={'Testimonials'} /> */}
        <HelpGuide
          data={helpExchange}
          title={'Helpful guides'}
          isLightMode={isLightMode}
        />
        <HelpGuide
          data={helpBuy}
          title={'Helpful guides'}
          isLightMode={isLightMode}
        />
        <HelpGuide
          data={helpSell}
          title={'Helpful guides'}
          isLightMode={isLightMode}
        />
        <HelpGuide
          data={helpDefi}
          title={'Helpful guides'}
          isLightMode={isLightMode}
        />
        {signup2}
        {login}
        <Footer />
        <DashboardMenu />
        <History />
        
        <WalletBalances />
        <CardWallet />
        <TotalBalance />
        <OrderCard />
       
      </div>
    </div>
  );
};
