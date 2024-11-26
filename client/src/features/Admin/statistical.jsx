import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from "../../api/apiConfig";

export const customRange = createAsyncThunk(
    "/products/order/stats",
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.post(
          "/admin/products/order/stats",
          data
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const statsSlice = createSlice({
  name: 'stats',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(customRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(customRange.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(customRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
