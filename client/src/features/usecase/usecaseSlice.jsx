import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'https://laptech4k.onrender.com/api/v1/admin/products/use_case';

// Thunk to get all use cases
export const getAllUseCase = createAsyncThunk(
  'useCase/getAllUseCase',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseURL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to get use case by ID
export const getUseCaseById = createAsyncThunk(
  'useCase/getUseCaseById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  useCases: [],
  useCase: null,
  loading: false,
  error: null,
};

// Slice
const useCaseSlice = createSlice({
  name: 'useCase',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUseCase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUseCase.fulfilled, (state, action) => {
        state.loading = false;
        state.useCases = action.payload;
      })
      .addCase(getAllUseCase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(getUseCaseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUseCaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.useCase = action.payload;
      })
      .addCase(getUseCaseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default useCaseSlice.reducer;
