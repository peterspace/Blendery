import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { Exchange3of4 } from './Exchange3of4';
import { Exchange4of4 } from './Exchange4of4';
import { Exchange5of5 } from './Exchange5of5';
import { Footer } from '../../components/Footer';

import { useDispatch, useSelector } from 'react-redux';
import { getTransactionByTxIdInternal } from '../../redux/features/transaction/transactionSlice';

import { getTransactionByTxIdService } from '../../services/apiService';

//w-[370px] ===w-[300px]
//w-[375px] === w-[320px] xs:w-[340px]

export const DeFi = (props) => {
  const { mode, user, service, subService, txInfo, setTxInfo } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REDUX STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const txData = useSelector(
    (state) => state.transaction?.transactionByTxIdInternal
  );
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  /*********************************************     REACT STATES    **************************************************** */
  /********************************************************************************************************************** */
  /********************************************************************************************************************** */
  const [refetchTxData, setRefetchTxData] = useState(false);
  const [fTitle, setFTitle] = useState('You send');
  const [tTitle, setTTitle] = useState('You get');
  //====================================================================================================

  useEffect(() => {
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //==================================={setting and refetching and updating txData}=======================================================
  useEffect(() => {
    if (refetchTxData) {
      fetchTxData();
      setRefetchTxData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchTxData]);

  const fetchTxData = async () => {
    if (user && txData) {
      const response = await getTransactionByTxIdService(txData?._id);
      dispatch(getTransactionByTxIdInternal(response)); // dispatch txData globally
      setTxInfo(response);
    }
  };

  //=================={On Component Mount}==================================
  useEffect(() => {
    if (id) {
      updateTxData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function updateTxData() {
    const response = await getTransactionByTxIdService(id);
    dispatch(getTransactionByTxIdInternal(response)); // dispatch txData globally
  }

  if (!user?.token) {
    return <Navigate to="/auth" />;
  }

  //====={use source data to reset values here e.g booking app approach like in placeForm }==============

  return (
    <>
      <div className="h-screen mt-[64px] mb-[64px] overflow-auto">
        {txData?.percentageProgress === 3 && (
          <Exchange3of4
            percentageProgress={txData?.percentageProgress}
            fTitle={fTitle}
            tTitle={tTitle}
            txData={txData}
            setTxInfo={setTxInfo}
            setRefetchTxData={setRefetchTxData}
          />
        )}
        {txData?.percentageProgress === 4 && (
          <Exchange4of4
            percentageProgress={txData?.percentageProgress}
            fTitle={fTitle}
            tTitle={tTitle}
            txData={txData}
            setTxInfo={setTxInfo}
            setRefetchTxData={setRefetchTxData}
          />
        )}
        {txData?.percentageProgress === 5 && (
          <Exchange5of5
            percentageProgress={txData?.percentageProgress}
            fTitle={fTitle}
            tTitle={tTitle}
            txData={txData}
            setTxInfo={setTxInfo}
            setRefetchTxData={setRefetchTxData}
          />
        )}
      </div>

      <div className="relative bg-white w-full overflow-auto text-left text-sm text-gray-400 font-montserrat">
        <div className="mt-8 flex flex-col justify-center items-center gap-4 mb-8">
          <div className="flex bg-lightslategray-300 w-full h-px" />
          <Footer />
        </div>
      </div>
    </>
  );
};
