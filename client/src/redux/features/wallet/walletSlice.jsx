import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import walletService from './walletService';
import { toast } from 'react-toastify';

export const addNewWallet = createAsyncThunk(
  'wallet/create-wallet',
  async (userData, thunkAPI) => {
    try {
      return await walletService.addNewWallet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensArbitrum = createAsyncThunk(
  'wallet/getTokensArbitrum',
  async (userWalletId, thunkAPI) => {
    try {
      return await walletService.getTokensArbitrum(userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensAurora = createAsyncThunk(
  'wallet/getTokensAurora',
  async (userWalletId, thunkAPI) => {
    try {
      return await walletService.getTokensAurora(userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensAvalanche = createAsyncThunk(
  'wallet/getTokensAvalanche',
  async (userWalletId, thunkAPI) => {
    try {
      return await walletService.getTokensAvalanche(userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getTokensBinance = createAsyncThunk(
  'wallet/getTokensBinance',
  async (userWalletId, thunkAPI) => {
    try {
      return await walletService.getTokensBinance(userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensBinanceTestnet = createAsyncThunk(
  'wallet/getTokensBinanceTestnet',
  async (userWalletId, thunkAPI) => {
    try {
      return await walletService.getTokensBinanceTestnet(userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensEthereum = createAsyncThunk(
  'wallet/getTokensEthereum',
  async (userWalletId, thunkAPI) => {
    try {
      return await walletService.getTokensEthereum(userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensFantom = createAsyncThunk(
  'wallet/getTokensFantom',
  async (userWalletId, thunkAPI) => {
    try {
      return await walletService.getTokensFantom(userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensGnosis = createAsyncThunk(
  'wallet/getTokensGnosis',
  async (userWalletId, thunkAPI) => {
    try {
      return await walletService.getTokensGnosis(userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensGoerliEth = createAsyncThunk(
  'wallet/getTokensGoerliEth',
  async (userWalletId, thunkAPI) => {
    try {
      return await walletService.getTokensGoerliEth(userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensKlaytn = createAsyncThunk(
  'wallet/getTokensKlaytn',
  async (userId, thunkAPI) => {
    try {
      return await walletService.getTokensKlaytn(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensOptimism = createAsyncThunk(
  'wallet/getTokensOptimism',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getTokensOptimism(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensPolygon = createAsyncThunk(
  'wallet/getTokensPolygon',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getTokensPolygon(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTokensPolygonMumbai = createAsyncThunk(
  'wallet/getTokensPolygonMumbai',
  async (userWalletId, thunkAPI) => {
    try {
      return await walletService.getTokensPolygonMumbai(userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//======================{AddRemove User Tokens}===================================================
export const updateTokensArbitrum = createAsyncThunk(
  'wallet/updateTokensArbitrum',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensArbitrum(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTokensAurora = createAsyncThunk(
  'wallet/updateTokensAurora',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensAurora(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTokensAvalanche = createAsyncThunk(
  'wallet/updateTokensAvalanche',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensAvalanche(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTokensBinance = createAsyncThunk(
  'wallet/updateTokensBinance',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensBinance(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTokensBinanceTestnet = createAsyncThunk(
  'wallet/updateTokensBinanceTestnet',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensBinanceTestnet(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTokensEthereum = createAsyncThunk(
  'wallet/updateTokensEthereum',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensEthereum(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTokensFantom = createAsyncThunk(
  'wallet/updateTokensFantom',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensFantom(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTokensGnosis = createAsyncThunk(
  'wallet/updateTokensGnosis',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensGnosis(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTokensGoerliEth = createAsyncThunk(
  'wallet/updateTokensGoerliEth',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensGoerliEth(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTokensKlaytn = createAsyncThunk(
  'wallet/updateTokensKlaytn',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensKlaytn(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTokensOptimism = createAsyncThunk(
  'wallet/updateTokensOptimism',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensOptimism(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTokensPolygon = createAsyncThunk(
  'wallet/updateTokensPolygon',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensPolygon(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTokensPolygonMumbai = createAsyncThunk(
  'wallet/updateTokensPolygonMumbai',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateTokensPolygonMumbai(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllTokens = createAsyncThunk(
  'wallet/getAllTokens',
  async (chainId, thunkAPI) => {
    try {
      return await walletService.getAllTokens(chainId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getEstimateGas = createAsyncThunk(
  'wallet/getEstimateGas',
  async (userData, thunkAPI) => {
    try {
      return await walletService.getEstimateGas(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWallets = createAsyncThunk(
  'wallet/getWallets',
  async (userId, thunkAPI) => {
    try {
      return await walletService.getWallets(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneWallet = createAsyncThunk(
  'wallet/getOneWallet',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getOneWallet(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateWalletAccountName = createAsyncThunk(
  'wallet/updateWalletAccountName',
  async (userData, thunkAPI) => {
    try {
      return await walletService.updateWalletAccountName(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserWalletInfo = createAsyncThunk(
  'wallet/getUserWalletInfo',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getUserWalletInfo(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const walletRecover = createAsyncThunk(
  'wallet/walletRecover',
  async (userData, thunkAPI) => {
    try {
      return await walletService.walletRecover(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const sendToken = createAsyncThunk(
  'wallet/sendToken',
  async (userData, thunkAPI) => {
    try {
      return await walletService.sendToken(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//================={BALANCES}=======================================

export const getBalanceArbitrum = createAsyncThunk(
  'wallet/getBalanceArbitrum',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalanceArbitrum(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalanceAurora = createAsyncThunk(
  'wallet/getBalanceAurora',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalanceAurora(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalanceAvalanche = createAsyncThunk(
  'wallet/getBalanceAvalanche',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalanceAvalanche(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalanceBinance = createAsyncThunk(
  'wallet/getBalanceBinance',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalanceBinance(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalanceBinanceTestnet = createAsyncThunk(
  'wallet/getBalanceBinanceTestnet',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalanceBinanceTestnet(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalanceEthereum = createAsyncThunk(
  'wallet/getBalanceEthereum',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalanceEthereum(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalanceFantom = createAsyncThunk(
  'wallet/getBalanceFantom',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalanceFantom(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalanceGnosis = createAsyncThunk(
  'wallet/getBalanceGnosis',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalanceGnosis(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalanceGoerliEth = createAsyncThunk(
  'wallet/getBalanceGoerliEth',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalanceGoerliEth(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalanceKlaytn = createAsyncThunk(
  'wallet/getBalanceKlaytn',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalanceKlaytn(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalanceOptimism = createAsyncThunk(
  'wallet/getBalanceOptimism',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalanceOptimism(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalancePolygon = createAsyncThunk(
  'wallet/getBalancePolygon',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalancePolygon(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBalancePolygonMumbai = createAsyncThunk(
  'wallet/getBalancePolygonMumbai',
  async (userId, userWalletId, thunkAPI) => {
    try {
      return await walletService.getBalancePolygonMumbai(userId, userWalletId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneNativeBalance = createAsyncThunk(
  'wallet/getOneNativeBalance',
  async (userId, userWalletId, chainId, thunkAPI) => {
    try {
      return await walletService.getOneNativeBalance(
        userId,
        userWalletId,
        chainId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const walletState = {
  wallet: '',
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
export const walletSlice = createSlice({
  name: 'wallet',
  initialState: walletState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addNewWallet = action.payload; // wallet data
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
      .addCase(getTokensArbitrum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensArbitrum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensArbitrum = action.payload; // wallet data
      })
      .addCase(getTokensArbitrum.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokensAurora.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensAurora.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensAurora = action.payload; // wallet data
      })
      .addCase(getTokensAurora.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokensAvalanche.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensAvalanche.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensAvalanche = action.payload; // wallet data
      })
      .addCase(getTokensAvalanche.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokensBinance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensBinance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensBinance = action.payload; // wallet data
      })
      .addCase(getTokensBinance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokensBinanceTestnet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensBinanceTestnet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensBinanceTestnet = action.payload; // wallet data
      })
      .addCase(getTokensBinanceTestnet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokensEthereum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensEthereum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensEthereum = action.payload; // wallet data
      })
      .addCase(getTokensEthereum.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokensFantom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensFantom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensFantom = action.payload; // wallet data
      })
      .addCase(getTokensFantom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokensGnosis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensGnosis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensGnosis = action.payload; // wallet data
      })
      .addCase(getTokensGnosis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokensGoerliEth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensGoerliEth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensGoerliEth = action.payload; // wallet data
      })
      .addCase(getTokensGoerliEth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokensKlaytn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensKlaytn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensKlaytn = action.payload; // wallet data
      })
      .addCase(getTokensKlaytn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokensOptimism.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensOptimism.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensOptimism = action.payload; // wallet data
      })
      .addCase(getTokensOptimism.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokensPolygon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensPolygon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensPolygon = action.payload; // wallet data
      })
      .addCase(getTokensPolygon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getTokensPolygonMumbai.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTokensPolygonMumbai.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getTokensPolygonMumbai = action.payload; // wallet data
      })
      .addCase(getTokensPolygonMumbai.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      //======================{AddRemove User Tokens}===================================================
      .addCase(updateTokensArbitrum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensArbitrum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensArbitrum = action.payload; // wallet data
      })
      .addCase(updateTokensArbitrum.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTokensAurora.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensAurora.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensAurora = action.payload; // wallet data
      })
      .addCase(updateTokensAurora.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTokensAvalanche.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensAvalanche.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensAvalanche = action.payload; // wallet data
      })
      .addCase(updateTokensAvalanche.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTokensBinance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensBinance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensBinance = action.payload; // wallet data
      })
      .addCase(updateTokensBinance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTokensBinanceTestnet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensBinanceTestnet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensBinanceTestnet = action.payload; // wallet data
      })
      .addCase(updateTokensBinanceTestnet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTokensEthereum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensEthereum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensEthereum = action.payload; // wallet data
      })
      .addCase(updateTokensEthereum.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTokensFantom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensFantom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensFantom = action.payload; // wallet data
      })
      .addCase(updateTokensFantom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTokensGnosis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensGnosis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensGnosis = action.payload; // wallet data
      })
      .addCase(updateTokensGnosis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTokensGoerliEth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensGoerliEth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensGoerliEth = action.payload; // wallet data
      })
      .addCase(updateTokensGoerliEth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTokensKlaytn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensKlaytn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensKlaytn = action.payload; // wallet data
      })
      .addCase(updateTokensKlaytn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTokensOptimism.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensOptimism.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensOptimism = action.payload; // wallet data
      })
      .addCase(updateTokensOptimism.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTokensPolygon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensPolygon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensPolygon = action.payload; // wallet data
      })
      .addCase(updateTokensPolygon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(updateTokensPolygonMumbai.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTokensPolygonMumbai.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateTokensPolygonMumbai = action.payload; // wallet data
      })
      .addCase(updateTokensPolygonMumbai.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      //======================{AddRemove User Tokens}===================================================
      .addCase(getAllTokens.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTokens.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getAllTokens = action.payload; // wallet data
      })
      .addCase(getAllTokens.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getEstimateGas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEstimateGas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getEstimateGas = action.payload; // wallet data
      })
      .addCase(getEstimateGas.rejected, (state, action) => {
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
        state.getWallets = action.payload; // wallet data
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
      .addCase(getOneWallet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getOneWallet = action.payload; // wallet data
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
      .addCase(updateWalletAccountName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateWalletAccountName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateWalletAccountName = action.payload; // wallet data
      })
      .addCase(updateWalletAccountName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getUserWalletInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWalletInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getUserWalletInfo = action.payload; // wallet data
      })
      .addCase(getUserWalletInfo.rejected, (state, action) => {
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
        state.walletRecover = action.payload; // wallet data
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
      .addCase(sendToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sendToken = action.payload; // wallet data
      })
      .addCase(sendToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      //======================{AddRemove User Tokens}===================================================
      .addCase(getBalanceArbitrum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalanceArbitrum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalanceArbitrum = action.payload; // wallet data
      })
      .addCase(getBalanceArbitrum.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalanceAurora.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalanceAurora.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalanceAurora = action.payload; // wallet data
      })
      .addCase(getBalanceAurora.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalanceAvalanche.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalanceAvalanche.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalanceAvalanche = action.payload; // wallet data
      })
      .addCase(getBalanceAvalanche.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalanceBinance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalanceBinance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalanceBinance = action.payload; // wallet data
      })
      .addCase(getBalanceBinance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalanceBinanceTestnet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalanceBinanceTestnet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalanceBinanceTestnet = action.payload; // wallet data
      })
      .addCase(getBalanceBinanceTestnet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalanceEthereum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalanceEthereum.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalanceEthereum = action.payload; // wallet data
      })
      .addCase(getBalanceEthereum.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalanceFantom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalanceFantom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalanceFantom = action.payload; // wallet data
      })
      .addCase(getBalanceFantom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalanceGnosis.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalanceGnosis.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalanceGnosis = action.payload; // wallet data
      })
      .addCase(getBalanceGnosis.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalanceGoerliEth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalanceGoerliEth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalanceGoerliEth = action.payload; // wallet data
      })
      .addCase(getBalanceGoerliEth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalanceKlaytn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalanceKlaytn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalanceKlaytn = action.payload; // wallet data
      })
      .addCase(getBalanceKlaytn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalanceOptimism.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalanceOptimism.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalanceOptimism = action.payload; // wallet data
      })
      .addCase(getBalanceOptimism.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalancePolygon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalancePolygon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalancePolygon = action.payload; // wallet data
      })
      .addCase(getBalancePolygon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getBalancePolygonMumbai.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalancePolygonMumbai.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getBalancePolygonMumbai = action.payload; // wallet data
      })
      .addCase(getBalancePolygonMumbai.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(getOneNativeBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneNativeBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getOneNativeBalance = action.payload; // wallet data
      })
      .addCase(getOneNativeBalance.rejected, (state, action) => {
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
export default walletSlice.reducer;
