import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from "../../api/apiConfig";

// Async Thunk to fetch all product variations
export const getAllProductVariations = createAsyncThunk(
  'productVariation/getAll',
  async (productId, thunkAPI) => {
    try {
      const response = await api.get(`/admin/products/${productId}/variants`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk to fetch product variation by ID
export const getProductVariationById = createAsyncThunk(
  'productVariation/getById',
  async ({ productId, variationId }, thunkAPI) => {
    try {
      const response = await api.get(`/admin/products/${productId}/variants/${variationId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState ={
  variations: [],
  loading: false,
  error: false,
}

const productVariationSlice = createSlice({
  name: 'productVariation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductVariations.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllProductVariations.fulfilled, (state, action) => {
        state.variations = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getAllProductVariations.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
    // builder
    //   .addCase(getProductVariationById.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(getProductVariationById.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.variation = action.payload; 
    //   })
    //   .addCase(getProductVariationById.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
  },
});

export default productVariationSlice.reducer;
