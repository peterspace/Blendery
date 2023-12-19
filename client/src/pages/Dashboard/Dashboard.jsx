import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminDashboard } from './AdminDashboard';
import { UserDashboard } from './UserDashboard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getTransactionByTxIdService } from '../../services/apiService';
import { getTransactionByTxIdInternal } from '../../redux/features/transaction/transactionSlice';

export const Dashboard = (props) => {
  const { mode, user, service, setService, setSubService, setTxInfo, setMode } =
    props;
  const dispatch = useDispatch();

  const isUpdate = localStorage.getItem('isUpdate')
    ? JSON.parse(localStorage.getItem('isUpdate'))
    : false;

  const txDataUpdate = localStorage.getItem('txDataUpdate')
    ? JSON.parse(localStorage.getItem('txDataUpdate'))
    : null;

  const [newData, setNewData] = useState();

  console.log({ newData: newData });

  //=================={On Component Mount}==================================

  useEffect(() => {
    if (isUpdate) {
      updateTxData();
      setTimeout(() => {
        localStorage.setItem('isUpdating', JSON.stringify(true));
        //
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  async function updateTxData() {
    const response = await getTransactionByTxIdService(txDataUpdate?._id);

    if (response) {
      setNewData(response);
      dispatch(getTransactionByTxIdInternal(response)); // dispatch txData globally
    }
  }

  //====================================================================================================

  if (!user?.token) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="max-h-[92vh] overflow-hidden">
      <>
        {user?.role === 'Admin' && (
          <AdminDashboard
            mode={mode}
            setMode={setMode}
            user={user}
            setTxInfo={setTxInfo}
            isUpdate={isUpdate}
          />
        )}

        {user?.role == 'User' && (
          <UserDashboard
            mode={mode}
            setMode={setMode}
            user={user}
            setService={setService}
            setSubService={setSubService}
            setTxInfo={setTxInfo}
          />
        )}
      </>
    </div>
  );
};
