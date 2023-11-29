import React, { useState } from 'react';

import { PiLockSimpleBold } from 'react-icons/pi';

export const FixedRate = (props) => {
  const { fixedRate } = props;
  const newRate = (
    <div className="border-solid hover:border-2 hover:border-bgPrimary flex justify-center rounded-lg bg-white shadow-[0px_2px_4px_rgba(26,_47,_79,_0.2)] w-[320px] xs:w-[340px] md:w-[500px] p-4 cursor-pointer">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row justify-center items-center p-2 gap-1">
          <PiLockSimpleBold size={15} />
          <div className="h-[15px]">
            <div className="h-3">Fixed rate</div>
          </div>
        </div>

        <div className="h-3 py-2">~ {fixedRate}</div>
      </div>
    </div>
  );
  return <>{newRate}</>;
};
