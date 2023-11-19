import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import messagesService from './messagesService';

export const allMessages = createAsyncThunk(
  'messages/allMessages',
  async (chatId, thunkAPI) => {
    try {
      return await messagesService.allMessages(chatId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (userData, thunkAPI) => {
    try {
      return await messagesService.sendMessage(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserMessagesById = createAsyncThunk(
  'messages/getUserMessagesById',
  async (thunkAPI) => {
    try {
      return await messagesService.getUserMessagesById();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const messagesState = {
  messages: '',
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allMessages = action.payload;
      })
      .addCase(allMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.sendMessage = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserMessagesById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserMessagesById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getUserMessagesById = action.payload;
      })
      .addCase(getUserMessagesById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default messagesSlice.reducer;
