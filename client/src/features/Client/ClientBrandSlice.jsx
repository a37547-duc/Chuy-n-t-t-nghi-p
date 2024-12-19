import { api } from "../../api/apiConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllBrandsClient = createAsyncThunk(
  "client/fetchLogos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/brand");
      return response.data?.brands || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const logosSlice = createSlice({
  name: "logos",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrandsClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBrandsClient.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllBrandsClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default logosSlice.reducer;