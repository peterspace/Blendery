/* eslint-disable react/prop-types */
import React, { useState } from 'react';

export const HowToComponent = (props) => {
  const { l } = props;

  const [show, setShow] = useState(false);

  const newCard = (
    <div className="flex justify-center rounded-lg shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[280px] sm:w-[375px] lg:w-[500px] p-4 bg-gray-100">
      <div className="flex flex-row gap-2 w-full">
        <div className="flex flex-col">
          {/* <div className="text-base leading-[24px] inline-block">
            {l?.title}
          </div> */}
          <div
            className="cursor-pointer flex flex-row justify-between items-center w-[280px] sm:w-[375px] lg:w-[500px]"
            onClick={() => setShow((prev) => !prev)}
          >
            <div className="text-base font-sans font-medium leading-[24px] inline-block">
              {l?.title}
            </div>
            <img
              className="cursor-pointer mr-2 top-[280px] w-[18px] h-[64px] overflow-hidden"
              alt=""
              src="/frame19.svg"
              // onClick={() => setShow(true)}
            />
          </div>
          {show && (
            <div className="leading-[20px] inline-block">{l?.description}</div>
          )}
        </div>
      </div>
    </div>
  );
  return <>{newCard}</>;
};
export const FaqCard = (props) => {
  const { data, title } = props;

  const newCard = (
    <div className="flex flex-col gap-[16px]">
      <div className="text-lg font-sans font-bold text-bgPrimary inline-block">
        {title}
      </div>
      <div className="flex flex-col gap-[16px]">
        {/* {data?.map((f) => (
          <div className="" key={f.id}>
            <HowToComponent l={f} />
          </div>
        ))} */}

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
