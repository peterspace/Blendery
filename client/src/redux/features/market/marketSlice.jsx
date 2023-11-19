import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tokenService from './tokenService';
import { toast } from 'react-toastify';

export const addToken = createAsyncThunk(
  'token/addToken',
  async (tokenData, thunkAPI) => {
    try {
      return await tokenService.addToken(tokenData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const btcExchangeRates = createAsyncThunk(
  'token/btcExchangeRates',
  async (thunkAPI) => {
    try {
      return await tokenService.btcExchangeRates();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const trending = createAsyncThunk('token/trending', async (thunkAPI) => {
  try {
    return await tokenService.trending();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const globalData = createAsyncThunk(
  'token/globalData',
  async (thunkAPI) => {
    try {
      return await tokenService.globalData();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const historyChart = createAsyncThunk(
  'token/historyChart',
  async (tokenData, thunkAPI) => {
    try {
      return await tokenService.historyChart(tokenData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokenList = createAsyncThunk(
  'token/getTokenList',
  async (thunkAPI) => {
    try {
      return await tokenService.getTokenList();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokenListDefi = createAsyncThunk(
  'token/getTokenListDefi',
  async (thunkAPI) => {
    try {
      return await tokenService.getTokenListDefi();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensDefiById = createAsyncThunk(
  'token/getTokensDefiById',
  async (chainId, thunkAPI) => {
    try {
      return await tokenService.getTokensDefiById(chainId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokenListFiat = createAsyncThunk(
  'token/getTokenListFiat',
  async (thunkAPI) => {
    try {
      return await tokenService.getTokenListFiat();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokenListBuy = createAsyncThunk(
  'token/getTokenListBuy',
  async (thunkAPI) => {
    try {
      return await tokenService.getTokenListBuy();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokenListSell = createAsyncThunk(
  'token/getTokenListSell',
  async (thunkAPI) => {
    try {
      return await tokenService.getTokenListSell();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokenListExchange = createAsyncThunk(
  'token/getTokenListExchange',
  async (thunkAPI) => {
    try {
      return await tokenService.getTokenListExchange();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const tokenState = {
  token: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
export const tokenSlice = createSlice({
  name: 'token',
  initialState: tokenState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToken = action.payload; // wallet data
      })
      .addCase(addToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(btcExchangeRates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(btcExchangeRates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.btcExchangeRates = action.payload; // wallet data
      })
      .addCase(btcExchangeRates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(trending.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(trending.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.trending = action.payload; // wallet data
      })
      .addCase(trending.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(globalData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(globalData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.globalData = action.payload; // wallet data
      })
      .addCase(globalData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(historyChart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(historyChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.historyChart = action.payload; // wallet data
      })
      .addCase(historyChart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokenList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokenList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tokenList = action.payload; // wallet data
      })
      .addCase(getTokenList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokenListDefi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokenListDefi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tokenListDefi = action.payload; // wallet data
      })
      .addCase(getTokenListDefi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })

      .addCase(getTokensDefiById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensDefiById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tokensDefiById = action.payload; // wallet data
      })
      .addCase(getTokensDefiById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokenListFiat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokenListFiat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tokenListFiat = action.payload; // wallet data
      })
      .addCase(getTokenListFiat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokenListBuy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokenListBuy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tokenListBuy = action.payload; // wallet data
      })
      .addCase(getTokenListBuy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokenListSell.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokenListSell.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tokenListSell = action.payload; // wallet data
      })
      .addCase(getTokenListSell.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokenListExchange.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokenListExchange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tokenListExchange = action.payload; // wallet data
      })
      .addCase(getTokenListExchange.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      });
  },
});
export default tokenSlice.reducer;
