import { api } from "../../api/apiConfig";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCategoriesClient = createAsyncThunk(
  "client/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/products/category");
      return response.data?.category || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const clientCategorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategoriesClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategoriesClient.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllCategoriesClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clientCategorySlice.reducer;