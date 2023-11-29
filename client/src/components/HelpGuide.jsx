import React, { useState } from 'react';
//===={light mode text}=======================
export const HowToComponent = (props) => {
  const { l, isLightMode } = props;
  const newCard = (
    <div className="flex justify-center  w-[280px] sm:w-[375px] lg:w-[500px] p-4">
      {isLightMode ? (
        <div className="flex flex-row gap-2 w-full">
          <div className="flex justify-center items-center w-[24px] h-[24px] flex-shrink-0 bg-gainsboro-100 p-1.5 rounded">
            <div className="text-11xl leading-[28px] text-bgPrimary inline-block">
              {l?.id}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-base font-sans font-medium leading-[24px] inline-block">
              {l?.title}
            </div>

            <div className="leading-[20px] inline-block">
              {l?.description.substring(0, 87)}...
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-2 w-full">
          <div className="flex justify-center items-center w-[24px] h-[24px] flex-shrink-0 bg-gainsboro-100 p-1.5 rounded">
            <div className="text-11xl leading-[28px] text-bgPrimary inline-block">
              {l?.id}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-gray-100 text-base font-sans font-medium leading-[24px] inline-block">
              {l?.title}
            </div>

            <div className="text-gray-200 leading-[20px] inline-block">
              {l?.description.substring(0, 87)}...
            </div>
          </div>
        </div>
      )}
    </div>
  );
  return <>{newCard}</>;
};

export const HowToComponent2 = (props) => {
  const { l } = props;
  const newCard = (
    <div className="flex justify-center  w-[280px] sm:w-[375px] lg:w-[500px] p-4">
      <div className="flex flex-row gap-2 w-full">
        <div className="flex justify-center items-center w-[24px] h-[24px] flex-shrink-0 bg-gainsboro-100 p-1.5 rounded">
          <div className="text-11xl leading-[28px] text-bgPrimary inline-block">
            {l?.id}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-base font-sans font-medium leading-[24px] inline-block">
            {l?.title}
          </div>

          <div className="leading-[20px] inline-block">
            {l?.description.substring(0, 87)}...
          </div>
        </div>
      </div>
    </div>
  );
  return <>{newCard}</>;
};

export const HelpGuide = (props) => {
  const { data, title, isLightMode } = props;
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
              <HowToComponent l={f} isLightMode={isLightMode} />
            </div>
          ))}
      </div>
    </div>
  );
  return <>{newCard}</>;
};
