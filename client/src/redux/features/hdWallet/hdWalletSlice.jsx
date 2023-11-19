import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import hdWalletService from './hdWalletService';
import { toast } from 'react-toastify';

export const addBitcoinHDWallet = createAsyncThunk(
  'hdWallet/addBitcoinHDWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.addBitcoinHDWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addEVMHDWallet = createAsyncThunk(
  'hdWallet/addEVMHDWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.addEVMHDWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addTronHDWallet = createAsyncThunk(
  'hdWallet/addTronHDWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.addTronHDWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addNewWallet = createAsyncThunk(
  'hdWallet/addNewWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.addNewWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const walletLogin = createAsyncThunk(
  'hdWallet/walletLogin',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.walletLogin(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBitcoinWallet = createAsyncThunk(
  'hdWallet/updateBitcoinWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.updateBitcoinWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBitcoinHDWallet = createAsyncThunk(
  'hdWallet/updateBitcoinHDWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.updateBitcoinHDWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateEVMWallet = createAsyncThunk(
  'hdWallet/updateEVMWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.updateEVMWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateEVMHDWallet = createAsyncThunk(
  'hdWallet/updateEVMHDWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.updateEVMHDWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTronWallet = createAsyncThunk(
  'hdWallet/updateTronWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.updateTronWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTronHDWallet = createAsyncThunk(
  'hdWallet/updateTronHDWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.updateTronHDWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWallets = createAsyncThunk(
  'hdWallet/getWallets',
  async (userId, thunkAPI) => {
    try {
      return await hdWalletService.getWallets(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllWalletsById = createAsyncThunk(
  'hdWallet/getAllWalletsById',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await hdWalletService.getAllWalletsById(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneWallet = createAsyncThunk(
  'hdWallet/getOneWallet',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await hdWalletService.getOneWallet(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const walletRecover = createAsyncThunk(
  'hdWallet/walletRecover',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.walletRecover(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const walletRecover2 = createAsyncThunk(
  'hdWallet/walletRecover2',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.walletRecover2(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalance = createAsyncThunk(
  'hdWallet/getBalance',
  async (address, userNetwork, thunkAPI) => {
    try {
      return await hdWalletService.getBalance(address, userNetwork);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createHDWalletOrder2 = createAsyncThunk(
  'hdWallet/createHDWalletOrder2',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.createHDWalletOrder2(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const sendBitcoinWallet = createAsyncThunk(
  'hdWallet/sendBitcoinWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.sendBitcoinWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const sendEVMWallet = createAsyncThunk(
  'hdWallet/sendEVMWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.sendEVMWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const sendTronWallet = createAsyncThunk(
  'hdWallet/sendTronWallet',
  async (userData, thunkAPI) => {
    try {
      return await hdWalletService.sendTronWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTransactionByTxId = createAsyncThunk(
  'hdWallet/getTransactionByTxId',
  async (txId, thunkAPI) => {
    try {
      return await hdWalletService.getTransactionByTxId(txId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const hdWalletState = {
  hdWallet: '',
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
export const hdWalletSlice = createSlice({
  name: 'hdWallet',
  initialState: hdWalletState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBitcoinHDWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBitcoinHDWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addBitcoinHDWallet = action.payload; // hdWallet data
      })
      .addCase(addBitcoinHDWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(addEVMHDWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEVMHDWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addEVMHDWallet = action.payload; // hdWallet data
      })
      .addCase(addEVMHDWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(addTronHDWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTronHDWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addTronHDWallet = action.payload; // hdWallet data
      })
      .addCase(addTronHDWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(addNewWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addNewWallet = action.payload; // hdWallet data
      })
      .addCase(addNewWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(walletLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(walletLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.walletLogin = action.payload; // hdWallet data
      })
      .addCase(walletLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateBitcoinWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBitcoinWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateBitcoinWallet = action.payload; // hdWallet data
      })
      .addCase(updateBitcoinWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateBitcoinHDWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBitcoinHDWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateBitcoinHDWallet = action.payload; // hdWallet data
      })
      .addCase(updateBitcoinHDWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateEVMWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEVMWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateEVMWallet = action.payload; // hdWallet data
      })
      .addCase(updateEVMWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateEVMHDWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEVMHDWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateEVMHDWallet = action.payload; // hdWallet data
      })
      .addCase(updateEVMHDWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTronWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTronWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTronWallet = action.payload; // hdWallet data
      })
      .addCase(updateTronWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTronHDWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTronHDWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTronHDWallet = action.payload; // hdWallet data
      })
      .addCase(updateTronHDWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getWallets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWallets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getWallets = action.payload; // hdWallet data
      })
      .addCase(getWallets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getAllWalletsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWalletsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getAllWalletsById = action.payload; // hdWallet data
      })
      .addCase(getAllWalletsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getOneWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getOneWallet = action.payload; // hdWallet data
      })
      .addCase(getOneWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(walletRecover.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(walletRecover.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.walletRecover = action.payload; // hdWallet data
      })
      .addCase(walletRecover.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(walletRecover2.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(walletRecover2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.walletRecover2 = action.payload; // hdWallet data
      })
      .addCase(walletRecover2.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalance = action.payload; // hdWallet data
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(createHDWalletOrder2.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createHDWalletOrder2.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createHDWalletOrder2 = action.payload; // hdWallet data
      })
      .addCase(createHDWalletOrder2.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(sendBitcoinWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendBitcoinWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sendBitcoinWallet = action.payload; // hdWallet data
      })
      .addCase(sendBitcoinWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(sendEVMWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendEVMWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sendEVMWallet = action.payload; // hdWallet data
      })
      .addCase(sendEVMWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(sendTronWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendTronWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sendTronWallet = action.payload; // hdWallet data
      })
      .addCase(sendTronWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTransactionByTxId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionByTxId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTransactionByTxId = action.payload; // hdWallet data
      })
      .addCase(getTransactionByTxId.rejected, (state, action) => {
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
export default hdWalletSlice.reducer;
