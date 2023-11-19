import axios from 'axios';
import { useQuery } from 'react-query';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function QueryPollingGetUserTransactions() {
  const { data } = useQuery(
    ['GET_USER_TRANSACTION'],
    async () => {
      const { data } = await axios.get(
        `${BACKEND_URL}/transaction/getUserTransactions`
      );
      return data;
    },
    {
      refetchInterval: 3000,
    }
  );
  return null;
}

//getOneUserTransaction
export function QueryPollingGetOneUserTransaction(userData) {
  if (!userData) return;

  const { data } = useQuery(
    ['GET_ONE_USER_TRANSACTION'],
    async (userData) => {
      const { data } = await axios.get(
        `${BACKEND_URL}/transaction/getOneUserTransaction`,
        userData
      );
      return data;
    },
    {
      refetchInterval: 3000,
    }
  );
  return null;
}
//getAllTransactionsByUser
export function QueryPollingGetAllTransactionsByUser() {
  const { data } = useQuery(
    ['GET_ALL_TRANSACTIONS_BY_USER'],
    async () => {
      const { data } = await axios.get(
        `${BACKEND_URL}/transaction/getAllTransactionsByUser`
      );
      return data;
    },
    {
      refetchInterval: 3000, // every 3 seconds
      refetchIntervalInBackground: true, // when tab is not on focus
      refetchOnMount: true,
    }
  );
  return null;
}
//getAllTransactions
export function QueryPollingGetAllTransactions(userData) {
  if (!userData) return;

  const { data } = useQuery(
    ['GET_ALL_TRANSACTION'],
    async (userData) => {
      const { data } = await axios.get(
        `${BACKEND_URL}/transaction/getAllTransactions`,
        userData
      );
      return data;
    },
    {
      refetchInterval: 3000,
      refetchIntervalInBackground: true, // when tab is not on focus
      refetchOnMount: true,
    }
  );
  return null;
}
//getTransactionByTxId
export function QueryPollingGetTransactionByTxId(txId) {
  if (!txId) return;
  const { data } = useQuery(
    ['GET_ONE_USER_TRANSACTION'],
    async (txId) => {
      const { data } = await axios.get(
        `${BACKEND_URL}/transaction/getTransactionByTxId/${txId}`
      );
      return data;
    },
    {
      refetchInterval: 3000,
      refetchIntervalInBackground: true, // when tab is not on focus
      refetchOnMount: true,
    }
  );
  return null;
}

//updateOneBlockchainTransactionById
export function QueryPollingUpdateOneBlockchainTransactionById(userData) {
  if (!userData) return;

  const { data } = useQuery(
    ['UPDATE_ONE_BLOCKCHAIN_TRANSACTION'],
    async () => {
      const { data } = await axios.patch(
        `${BACKEND_URL}/transaction/updateOneBlockchainTransactionById`,
        userData
      );
      return data;
    },
    {
      refetchInterval: (data) => {
        if (
          data?.status === 'Paid' ||
          data?.status === 'Received' ||
          data?.status === 'Completed'
        )
          return false;
        return 120000; // every 2 minute
      },
    }
  );
  return null;
}

//getAllTransactions
export function QueryPollingGetTokensList() {
  const { data } = useQuery(
    ['GET_ONE_USER_TRANSACTION'],
    async () => {
      const { data } = await axios.get(`${BACKEND_URL}/token/getTokenList`);
      return data;
    },
    {
      refetchInterval: 3000,
      refetchIntervalInBackground: true, // when tab is not on focus
      refetchOnMount: true,
    }
  );
  return null;
}
