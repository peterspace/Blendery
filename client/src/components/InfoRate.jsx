import React, { useState } from 'react';

import { BsInfoCircleFill } from 'react-icons/bs';

export const InfoRate = () => {
  const infoRate = (
    <div className="flex justify-center rounded-lg w-[320px] xs:w-[340px] md:w-[500px] p-4">
      <div className="flex flex-row gap-2 w-full">
        <BsInfoCircleFill color="#4f46e5" size={15} />
        <div className="text-xs leading-[17px] inline-block">
          The floating rate can change at any point due to market conditions, so
          you might receive more or less crypto than expected.
        </div>
      </div>
    </div>
  );
  return <>{infoRate}</>;
};
