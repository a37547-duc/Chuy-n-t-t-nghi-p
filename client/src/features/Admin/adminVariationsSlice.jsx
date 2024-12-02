import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../api/apiConfig";

// Thunk để thêm variation cho sản phẩm
export const addVariation = createAsyncThunk(
  'variation/addVariation',
  async ({ productId, variationData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/admin/products/variants/add/${productId}`,
        variationData
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Thunk để cập nhật biến thể cho sản phẩm
export const updateVariation = createAsyncThunk(
  'variation/updateVariation',
  async ({ variationId, updatedData }, { rejectWithValue }) => {
    console.log(updatedData);
    try {
      const response = await api.patch(
        `/admin/products/variants/update/${variationId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Thunk để xóa biến thể
export const deleteVariation = createAsyncThunk(
  'variation/deleteVariation',
  async (variationId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/admin/products/variants/delete/${variationId}`
      );
      return { variationId, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  variations: [],
  loading: false,
  error: null,
};

const adminVariationSlice = createSlice({
  name: 'variation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addVariation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVariation.fulfilled, (state, action) => {
        state.loading = false;
        state.variations.push(action.payload.variant);
        toast.success("Thêm biến thể thành công!");
      })
      .addCase(addVariation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Thêm biến thể thất bại. Vui lòng thử lại!");
      })
      .addCase(updateVariation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVariation.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.variations.findIndex(
          (variation) => variation.id === action.payload.id
        );
        if (index !== -1) {
          state.variations[index] = action.payload;
        }
        toast.success("Cập nhật biến thể thành công!");
      })
      .addCase(updateVariation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Cập nhật biến thể thất bại. Vui lòng thử lại!");
      })
      .addCase(deleteVariation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVariation.fulfilled, (state, action) => {
        state.loading = false;
        state.variations = state.variations.filter(
          (variation) => variation.id !== action.payload.variationId
        );
        toast.success("Xóa biến thể thành công!");
      })
      .addCase(deleteVariation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Xóa biến thể thất bại. Vui lòng thử lại!");
      });
  },
});

export default adminVariationSlice.reducer;
