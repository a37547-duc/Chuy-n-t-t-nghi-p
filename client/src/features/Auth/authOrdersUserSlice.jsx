import { toast } from "react-toastify";
import { api } from "../../api/apiConfig";
import "react-toastify/dist/ReactToastify.css";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Hàm lấy thông tin đơn hàng của người dùng
export const getOrdersUser = createAsyncThunk(
  "userOrders/getOrdersUser",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/order?status=${status}`);
      // Nếu API trả về phản hồi thành công nhưng không có dữ liệu
      if (response.status === 404 && (!response.data || response.data.length === 0)) {
        return { data: [] };
      }
      return response.data;
    } catch (error) {
      if (!toast.isActive("getOrderUserError")) {
        toast.error("Không thể lấy thông tin đơn hàng", { toastId: "getOrderUserError" });
      }
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrdersUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;
      })
      .addCase(getOrdersUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi không xác định";
      });
  },
});

export default userOrdersSlice.reducer;