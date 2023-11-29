import React, { useState } from 'react';

import { PiLockSimpleOpenBold } from 'react-icons/pi';

export const MarketInfo = (props) => {
  const { floatingRate } = props;
  const newCard = (
    <div className="border-solid hover:border-2 hover:border-bgPrimary flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4 cursor-pointer">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row justify-center items-center p-2 gap-1">
          <PiLockSimpleOpenBold />

          <div className="h-[15px]">
            <div className="h-3">Floating rate</div>
          </div>
        </div>

        <div className="h-3 py-2">~ {floatingRate}</div>
      </div>
    </div>
  );
  return <>{newCard}</>;
};
