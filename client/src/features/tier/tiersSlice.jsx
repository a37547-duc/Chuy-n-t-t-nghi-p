import { api } from "../../api/apiConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk để gọi API lấy danh sách các tiers
export const getAllTiers = createAsyncThunk(
  "tiers/getAllTiers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/tiers");
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return [];
      }
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const tiersSlice = createSlice({
  name: "tiers",
  initialState: {
    tiers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Trạng thái khi đang tải danh sách tiers
      .addCase(getAllTiers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Trạng thái khi tải danh sách tiers thành công
      .addCase(getAllTiers.fulfilled, (state, action) => {
        state.loading = false;
        state.tiers = action.payload;
      })
      // Trạng thái khi tải danh sách tiers thất bại
      .addCase(getAllTiers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tiersSlice.reducer;
