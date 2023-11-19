import React, { useState } from 'react';
import { ProgressStages1 } from './ProgressStages1';
import { ProgressStages2 } from './ProgressStages2';
import { ProgressStages3 } from './ProgressStages3';
import { ProgressStages4 } from './ProgressStages4';
import { ProgressStages5 } from './ProgressStages5';

export const Progress = (props) => {
  const { percentageProgress } = props;
  // const [percentageProgress, setPercentageProgress] = useState(1);

  return (
    <>
      {percentageProgress === 1 && <ProgressStages1 />}
      {percentageProgress === 2 && <ProgressStages2 />}
      {percentageProgress === 3 && <ProgressStages3 />}
      {percentageProgress === 4 && <ProgressStages4 />}
      {percentageProgress === 5 && <ProgressStages5 />}
    </>
  );
};
