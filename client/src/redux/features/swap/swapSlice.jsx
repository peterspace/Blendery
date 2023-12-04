import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import swapService from './swapService';
import { networksOptions } from '../../../constants';
//updated with defi functions
const chainLocal = localStorage.getItem('chainDefi')
  ? JSON.parse(localStorage.getItem('chainDefi'))
  : networksOptions[0];
const slippageLocal = localStorage.getItem('slippage')
  ? JSON.parse(localStorage.getItem('slippage'))
  : '1';

export const getTokenExchangeRateSwap = createAsyncThunk(
  'swap/getTokenExchangeRateSwap',
  async (userData, thunkAPI) => {
    try {
      return await swapService.getTokenExchangeRateSwap(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTransactionRateSwap = createAsyncThunk(
  'swap/getTransactionRateSwap',
  async (userData, thunkAPI) => {
    try {
      return await swapService.getTransactionRateSwap(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getChainRateSwap = createAsyncThunk(
  'swap/getChainRateSwap',
  async (userData, thunkAPI) => {
    try {
      return await swapService.getChainRateSwap(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getChainPrice = createAsyncThunk(
  'swap/getChainPrice',
  async (userData, thunkAPI) => {
    try {
      return await swapService.getChainPrice(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSpender = createAsyncThunk(
  'swap/getSpender',
  async (userData, thunkAPI) => {
    try {
      return await swapService.getSpender(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSwapApproval = createAsyncThunk(
  'swap/getSwapApproval',
  async (userData, thunkAPI) => {
    try {
      return await swapService.getSwapApproval(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const swap = createAsyncThunk(
  'swap/swap',
  async (userData, thunkAPI) => {
    try {
      return await swapService.swap(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensDefiById = createAsyncThunk(
  'swap/getTokensDefiById',
  async (userData, thunkAPI) => {
    try {
      return await swapService.getTokensDefiById(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const swapState = {
  swap: '',
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  chain: chainLocal,
  slippage: slippageLocal,
  switchNetwork: null,
  connectedNetwork: false,
  isConnecting: false,
  isChangeChainId: null,
  sideBarActive: false,
};
export const swapSlice = createSlice({
  name: 'swap',
  initialState: swapState,
  reducers: {
    updateChain(state, action) {
      state.chain = action.payload;
    },
    updateSwitchNetwork(state, action) {
      state.switchNetwork = action.payload;
    },
    updateConnectedNetwork(state, action) {
      state.connectedNetwork = action.payload;
    },

    updateSlippage(state, action) {
      state.slippage = action.payload;
    },

    updateConnecting(state, action) {
      state.isConnecting = action.payload;
    },
    updateIsChangeChainId(state, action) {
      state.isChangeChainId = action.payload;
    },
    updateSideBarActive(state, action) {
      state.sideBarActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTokenExchangeRateSwap.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokenExchangeRateSwap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokenExchangeRateSwap = action.payload; // wallet data
      })
      .addCase(getTokenExchangeRateSwap.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTransactionRateSwap.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionRateSwap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTransactionRateSwap = action.payload; // wallet data
      })
      .addCase(getTransactionRateSwap.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getChainRateSwap.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChainRateSwap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getChainRateSwap = action.payload; // wallet data
      })
      .addCase(getChainRateSwap.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      //======================{AddRemove User Tokens}===================================================
      .addCase(getChainPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChainPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getChainPrice = action.payload; // wallet data
      })
      .addCase(getChainPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSpender.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpender.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getSpender = action.payload; // wallet data
      })
      .addCase(getSpender.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSwapApproval.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSwapApproval.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getSwapApproval = action.payload; // wallet data
      })
      .addCase(getSwapApproval.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(swap.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(swap.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.swap = action.payload; // wallet data
      })
      .addCase(swap.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getTokensDefiById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensDefiById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensDefiById = action.payload; // wallet data
      })
      .addCase(getTokensDefiById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export const {
  updateChain,
  updateSwitchNetwork,
  updateConnectedNetwork,
  updateSlippage,
  updateConnecting,
  updateIsChangeChainId,
  updateSideBarActive,
} = swapSlice.actions;
export default swapSlice.reducer;
