import { api } from "../../api/apiConfig";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk để gọi API và xử lý dữ liệu
export const fetchStats = createAsyncThunk(
  "stats/fetchStats",
  async (filter, { rejectWithValue }) => {
    try {
      const response = await api.post(`/admin/products/order/stats?filter=${filter}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
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
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
