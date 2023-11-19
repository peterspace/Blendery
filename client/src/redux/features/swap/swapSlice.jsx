import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import swapService from './swapService';

export const tokenList = createAsyncThunk(
  'swap/tokenList',
  async (chainId, thunkAPI) => {
    try {
      return await swapService.tokenList(chainId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const tokenPrice = createAsyncThunk(
  'swap/tokenPrice',
  async (swapData, thunkAPI) => {
    try {
      return await swapService.tokenPrice(swapData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const chainPrice = createAsyncThunk(
  'swap/chainPrice',
  async (chainId, thunkAPI) => {
    try {
      return await swapService.chainPrice(chainId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//======================{AddRemove User Tokens}===================================================
export const updateFromPrice = createAsyncThunk(
  'swap/updateFromPrice',
  async (userData, thunkAPI) => {
    try {
      return await swapService.updateFromPrice(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updatePrice = createAsyncThunk(
  'swap/updatePrice',
  async (userData, thunkAPI) => {
    try {
      return await swapService.updatePrice(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchChainPrice = createAsyncThunk(
  'swap/fetchChainPrice',
  async (userData, thunkAPI) => {
    try {
      return await swapService.fetchChainPrice(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchSpender = createAsyncThunk(
  'swap/fetchSpender',
  async (chainId, thunkAPI) => {
    try {
      return await swapService.fetchSpender(chainId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateSwapEstimates = createAsyncThunk(
  'swap/updateSwapEstimates',
  async (userData, thunkAPI) => {
    try {
      return await swapService.updateSwapEstimates(userData);
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
};
export const swapSlice = createSlice({
  name: 'swap',
  initialState: swapState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tokenList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tokenList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tokenList = action.payload; // wallet data
      })
      .addCase(tokenList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(tokenPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(tokenPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.tokenPrice = action.payload; // wallet data
      })
      .addCase(tokenPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(chainPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(chainPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.chainPrice = action.payload; // wallet data
      })
      .addCase(chainPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      //======================{AddRemove User Tokens}===================================================
      .addCase(updateFromPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFromPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateFromPrice = action.payload; // wallet data
      })
      .addCase(updateFromPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updatePrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatePrice = action.payload; // wallet data
      })
      .addCase(updatePrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(fetchChainPrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChainPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.fetchChainPrice = action.payload; // wallet data
      })
      .addCase(fetchChainPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(fetchSpender.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSpender.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.fetchSpender = action.payload; // wallet data
      })
      .addCase(fetchSpender.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateSwapEstimates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSwapEstimates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateSwapEstimates = action.payload; // wallet data
      })
      .addCase(updateSwapEstimates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default swapSlice.reducer;
