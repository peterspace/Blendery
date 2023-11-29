/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export const HowToComponent = (props) => {
  const { l } = props;

  const [show, setShow] = useState(false);

  const newCard = (
    // <div className="flex justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[280px] sm:w-[328px] h-[100px] p-4 bg-gray-100">
    <div className="flex justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[280px] sm:w-[375px] lg:w-[320px] h-[100px] p-4 bg-gray-100">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="text-base font-sans font-medium leading-[24px] inline-block">
            {l?.name}, {l?.address}
          </div>
          <div className="flex flex-row gap-1">
            <img
              className="w-3.5 h-3.5 overflow-hidden"
              alt=""
              src="/frame43.svg"
            />
            <img
              className="w-3.5 h-3.5 overflow-hidden"
              alt=""
              src="/frame43.svg"
            />
            <img
              className="w-3.5 h-3.5 overflow-hidden"
              alt=""
              src="/frame43.svg"
            />
            <img
              className="w-3.5 h-3.5 overflow-hidden"
              alt=""
              src="/frame43.svg"
            />
            <img
              className="w-3.5 h-3.5 overflow-hidden"
              alt=""
              src="/frame43.svg"
            />
          </div>
        </div>

        {/* <div className="leading-[20px] inline-block">{l?.comment}</div> */}
        <div className="leading-[20px] inline-block">
          {l?.comment.substring(0, 100)} ...
        </div>
      </div>
    </div>
  );
  return <>{newCard}</>;
};
export const FeedBack = (props) => {
  const { data, title } = props;

  const newCard = (
    <div className="flex flex-col gap-[24px]">
      {/* <div className="text-lg font-sans font-bold text-bgPrimary inline-block">
        {title}
      </div> */}
      <div className="text-lg flex flex-row justify-center items-center font-sans font-bold gap-1">
        <span className="text-tripmagray-100">{`What `}</span>
        <span className="text-bgPrimary">{`Blendery `}</span>
        <span className="text-tripmagray-100">{`users are saying`}</span>
        {/* {title} */}
      </div>
      <div className="flex flex-col xl:flex-row gap-[16px]">
        {data &&
          data?.map((f, idx) => (
            <div className="" key={idx}>
              <HowToComponent l={f} />
            </div>
          ))}
      </div>
    </div>
  );
  return <>{newCard}</>;
};
