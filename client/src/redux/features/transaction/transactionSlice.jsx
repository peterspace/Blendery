import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionService from './transactionService';

export const createTransaction = createAsyncThunk(
  'transaction/createTransaction',
  async (userData, thunkAPI) => {
    try {
      return await transactionService.createTransaction(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserTransactions = createAsyncThunk(
  'transaction/getUserTransactions',
  async (thunkAPI) => {
    try {
      return await transactionService.getUserTransactions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneUserTransaction = createAsyncThunk(
  'transaction/getOneUserTransaction',
  async (userData, thunkAPI) => {
    try {
      return await transactionService.getOneUserTransaction(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllTransactionsByUser = createAsyncThunk(
  'transaction/getAllTransactionsByUser',
  async (thunkAPI) => {
    try {
      return await transactionService.getAllTransactionsByUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateTransactionsAutomatically = createAsyncThunk(
  'transaction/updateTransactionsAutomatically',
  async (userData, thunkAPI) => {
    try {
      return await transactionService.updateTransactionsAutomatically(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateOneBlockchainTransactionById = createAsyncThunk(
  'transaction/updateOneBlockchainTransactionById',
  async (userData, thunkAPI) => {
    try {
      return await transactionService.updateOneBlockchainTransactionById(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllTransactions = createAsyncThunk(
  'transaction/getAllTransactions',
  async (userData, thunkAPI) => {
    try {
      return await transactionService.getAllTransactions(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTransactionByTxId = createAsyncThunk(
  'transaction/getTransactionByTxId',
  async (txId, thunkAPI) => {
    try {
      return await transactionService.getTransactionByTxId(txId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTransactionByTxIdInternal = createAsyncThunk(
  'transaction/getTransactionByTxIdInternal',
  async (userData, thunkAPI) => {
    try {
      return await transactionService.getTransactionByTxIdInternal(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTransactionById = createAsyncThunk(
  'transaction/updateTransactionById',
  async (userData, thunkAPI) => {
    try {
      return await transactionService.updateTransactionById(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserInactiveTransactions = createAsyncThunk(
  'transaction/getUserInactiveTransactions',
  async (thunkAPI) => {
    try {
      return await transactionService.getUserInactiveTransactions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserActiveTransactions = createAsyncThunk(
  'transaction/getUserActiveTransactions',
  async (thunkAPI) => {
    try {
      return await transactionService.getUserActiveTransactions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getManagerActiveTransactions = createAsyncThunk(
  'transaction/getManagerActiveTransactions',
  async (thunkAPI) => {
    try {
      return await transactionService.getManagerActiveTransactions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const orderConfirmation = createAsyncThunk(
  'transaction/orderConfirmation',
  async (userData, thunkAPI) => {
    try {
      return await transactionService.orderConfirmation(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const orderCompleted = createAsyncThunk(
  'transaction/orderCompleted',
  async (userData, thunkAPI) => {
    try {
      return await transactionService.orderCompleted(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTransactionRate = createAsyncThunk(
  'transaction/getTransactionRate',
  async (userData, thunkAPI) => {
    try {
      return await transactionService.getTransactionRate(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//============{transactions by services and subservices}============

export const getUserExchange = createAsyncThunk(
  'transaction/getUserExchange',
  async (thunkAPI) => {
    try {
      return await transactionService.getUserExchange();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserDefi = createAsyncThunk(
  'transaction/getUserDefi',
  async (thunkAPI) => {
    try {
      return await transactionService.getUserDefi();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserBuyCash = createAsyncThunk(
  'transaction/getUserBuyCash',
  async (thunkAPI) => {
    try {
      return await transactionService.getUserBuyCash();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserBuyCard = createAsyncThunk(
  'transaction/getUserBuyCard',
  async (thunkAPI) => {
    try {
      return await transactionService.getUserBuyCard();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserSellCash = createAsyncThunk(
  'transaction/getUserSellCash',
  async (thunkAPI) => {
    try {
      return await transactionService.getUserSellCash();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserSellCard = createAsyncThunk(
  'transaction/getUserSellCard',
  async (thunkAPI) => {
    try {
      return await transactionService.getUserSellCard();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokenPriceData = createAsyncThunk(
  'transaction/getTokenPriceData',
  async (id, thunkAPI) => {
    try {
      return await transactionService.getTokenPriceData(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlockChainTransaction = createAsyncThunk(
  'transaction/updateBlockChainTransaction',
  async (id, thunkAPI) => {
    try {
      return await transactionService.updateBlockChainTransaction(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokenPriceDataFrom = createAsyncThunk(
  'transaction/getTokenPriceDataFrom',
  async (id, thunkAPI) => {
    try {
      return await transactionService.getTokenPriceDataFrom(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokenPriceDataTo = createAsyncThunk(
  'transaction/getTokenPriceDataTo',
  async (id, thunkAPI) => {
    try {
      return await transactionService.getTokenPriceDataTo(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
  //============{Admin: transactions by services and subservices}============
export const getAdminExchange = createAsyncThunk(
  'transaction/getAdminExchange',
  async (thunkAPI) => {
    try {
      return await transactionService.getAdminExchange();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAdminDefi = createAsyncThunk(
  'transaction/getAdminDefi',
  async (thunkAPI) => {
    try {
      return await transactionService.getAdminDefi();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAdminBuyCash = createAsyncThunk(
  'transaction/getAdminBuyCash',
  async (thunkAPI) => {
    try {
      return await transactionService.getAdminBuyCash();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAdminBuyCard = createAsyncThunk(
  'transaction/getAdminBuyCard',
  async (thunkAPI) => {
    try {
      return await transactionService.getAdminBuyCard();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAdminSellCash = createAsyncThunk(
  'transaction/getAdminSellCash',
  async (thunkAPI) => {
    try {
      return await transactionService.getAdminSellCash();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAdminSellCard = createAsyncThunk(
  'transaction/getAdminSellCard',
  async (thunkAPI) => {
    try {
      return await transactionService.getAdminSellCard();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const transactionState = {
  transaction: '',
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: transactionState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createTransaction = action.payload; // transaction data
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allUserTransactions = action.payload; // transaction data
      })
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getOneUserTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneUserTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getOneUserTransaction = action.payload; // transaction data
      })
      .addCase(getOneUserTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllTransactionsByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTransactionsByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getAllTransactionsByUser = action.payload; // transaction data
      })
      .addCase(getAllTransactionsByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateTransactionsAutomatically.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTransactionsAutomatically.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTransactionsAutomatically = action.payload; // transaction data
      })
      .addCase(updateTransactionsAutomatically.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getAllTransactions = action.payload; // transaction data
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTransactionByTxId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionByTxId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.transactionByTxId = action.payload; // transaction data
      })
      .addCase(getTransactionByTxId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTransactionByTxIdInternal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionByTxIdInternal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.transactionByTxIdInternal = action.payload; // transaction data
      })
      .addCase(getTransactionByTxIdInternal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateTransactionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTransactionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTransactionById = action.payload; // transaction data
      })
      .addCase(updateTransactionById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserInactiveTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInactiveTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getUserInactiveTransactions = action.payload; // transaction data
      })
      .addCase(getUserInactiveTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserActiveTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserActiveTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getUserActiveTransactions = action.payload; // transaction data
      })
      .addCase(getUserActiveTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getManagerActiveTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getManagerActiveTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getManagerActiveTransactions = action.payload; // transaction data
      })
      .addCase(getManagerActiveTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(orderConfirmation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderConfirmation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderConfirmation = action.payload; // transaction data
      })
      .addCase(orderConfirmation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(orderCompleted.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderCompleted = action.payload; // transaction data
      })
      .addCase(orderCompleted.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTransactionRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTransactionRate = action.payload; // transaction data
      })
      .addCase(getTransactionRate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserExchange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allExchangeTransactions = action.payload; // transaction data
      })
      .addCase(getUserExchange.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserDefi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDefi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allDefiTransactions = action.payload; // transaction data
      })
      .addCase(getUserDefi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserBuyCash.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserBuyCash.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allBuyCashTransactions = action.payload; // transaction data
      })
      .addCase(getUserBuyCash.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserBuyCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserBuyCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allBuyCardTransactions = action.payload; // transaction data
      })
      .addCase(getUserBuyCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserSellCash.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserSellCash.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allSellCashTransactions = action.payload; // transaction data
      })
      .addCase(getUserSellCash.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserSellCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserSellCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allSellCardTransactions = action.payload; // transaction data
      })
      .addCase(getUserSellCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTokenPriceData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokenPriceData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tokenPriceData = action.payload; // transaction data
      })
      .addCase(getTokenPriceData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBlockChainTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlockChainTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlockChainTransaction = action.payload; // transaction data
      })
      .addCase(updateBlockChainTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTokenPriceDataFrom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokenPriceDataFrom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tokenPriceDataFrom = action.payload; // transaction data
      })
      .addCase(getTokenPriceDataFrom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTokenPriceDataTo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokenPriceDataTo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tokenPriceDataTo = action.payload; // transaction data
      })
      .addCase(getTokenPriceDataTo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(getAdminExchange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allExchangeTransactionsAdmin = action.payload; // transaction data
      })
      .addCase(getAdminExchange.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAdminDefi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminDefi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allDefiTransactionsAdmin = action.payload; // transaction data
      })
      .addCase(getAdminDefi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAdminBuyCash.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminBuyCash.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allBuyCashTransactionsAdmin = action.payload; // transaction data
      })
      .addCase(getAdminBuyCash.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAdminBuyCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminBuyCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allBuyCardTransactionsAdmin = action.payload; // transaction data
      })
      .addCase(getAdminBuyCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAdminSellCash.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminSellCash.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allSellCashTransactionsAdmin = action.payload; // transaction data
      })
      .addCase(getAdminSellCash.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAdminSellCard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminSellCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allSellCardTransactionsAdmin = action.payload; // transaction data
      })
      .addCase(getAdminSellCard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      }).addCase(updateOneBlockchainTransactionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOneBlockchainTransactionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedOneBlockchainTransactionById = action.payload; // transaction data
      })
      .addCase(updateOneBlockchainTransactionById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default transactionSlice.reducer;
