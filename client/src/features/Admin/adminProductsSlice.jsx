import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../api/apiConfig";
import axios from "axios";

// Thunk để gọi API thêm sản phẩm
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (newProduct, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/products/create",newProduct);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk để gọi API cập nhật sản phẩm
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, updatedProduct }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `https://laptech4k.onrender.com/api/v1/admin/products/edit/${id}`,
        updatedProduct,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice quản lý trạng thái của sản phẩm
const adminProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        toast.success("Thêm sản phẩm thành công!");
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Thêm sản phẩm thất bại. Vui lòng thử lại!");
      });
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        toast.success("Cập nhật sản phẩm thành công!");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Cập nhập sản phẩm thất bại. Vui lòng thử lại!");
      });
  },
});

export default adminProductSlice.reducer;
