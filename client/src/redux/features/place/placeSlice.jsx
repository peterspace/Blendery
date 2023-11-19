import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import placeService from './placeService';
// import { toast } from 'react-toastify';

export const createCountry = createAsyncThunk(
  'place/createCountry',
  async (placeData, thunkAPI) => {
    try {
      return await placeService.createCountry(placeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllCountries = createAsyncThunk(
  'place/getAllCountries',
  async (thunkAPI) => {
    try {
      return await placeService.getAllCountries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllStatesByCountry = createAsyncThunk(
  'place/getAllStatesByCountry',
  async (placeData, thunkAPI) => {
    try {
      return await placeService.getAllStatesByCountry(placeData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const placeState = {
  place: '',
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
export const placeSlice = createSlice({
  name: 'place',
  initialState: placeState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createCountry = action.payload;
      })
      .addCase(createCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllCountries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getAllCountries = action.payload;
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllStatesByCountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStatesByCountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getAllStatesByCountry = action.payload;
      })
      .addCase(getAllStatesByCountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default placeSlice.reducer;
