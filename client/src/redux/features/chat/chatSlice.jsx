import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from './chatService';
import { toast } from 'react-toastify';

export const accessChat = createAsyncThunk(
  'chat/accessChat',
  async (userData, thunkAPI) => {
    try {
      return await chatService.accessChat(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (thunkAPI) => {
    try {
      return await chatService.fetchChats();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createGroupChat = createAsyncThunk(
  'chat/createGroupChat',
  async (userData, thunkAPI) => {
    try {
      return await chatService.createGroupChat(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const renameGroup = createAsyncThunk(
  'chat/renameGroup',
  async (userData, thunkAPI) => {
    try {
      return await chatService.renameGroup(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToGroup = createAsyncThunk(
  'chat/addToGroup',
  async (userData, thunkAPI) => {
    try {
      return await chatService.addToGroup(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeFromGroup = createAsyncThunk(
  'chat/removeFromGroup',
  async (userData, thunkAPI) => {
    try {
      return await chatService.removeFromGroup(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createTIcketChat = createAsyncThunk(
  'chat/createTIcketChat',
  async (userData, thunkAPI) => {
    try {
      return await chatService.createTIcketChat(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createGroupChatByTransaction = createAsyncThunk(
  'chat/createGroupChatByTransaction',
  async (userData, thunkAPI) => {
    try {
      return await chatService.createGroupChatByTransaction(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const chatState = {
  chat: '',
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(accessChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(accessChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.chat = action.payload; // chat data
        if (state.isSuccess === true) {
          toast.info('chat Form Submitted Sucessfully');
        }
      })
      .addCase(accessChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.fetchChats = action.payload; // data
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.error);
        }
      })
      .addCase(createGroupChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroupChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createGroupChat = action.payload; // data
      })
      .addCase(createGroupChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(renameGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(renameGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.renameGroup = action.payload; // data
      })
      .addCase(renameGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToGroup = action.payload; // data
      })
      .addCase(addToGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(removeFromGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.removeFromGroup = action.payload; // data
      })
      .addCase(removeFromGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createTIcketChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTIcketChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createTIcketChat = action.payload; // data
      })
      .addCase(createTIcketChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createGroupChatByTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroupChatByTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createGroupChatByTransaction = action.payload; // data
      })
      .addCase(createGroupChatByTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default chatSlice.reducer;
