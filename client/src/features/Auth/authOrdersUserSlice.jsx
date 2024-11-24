import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/apiConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hàm lấy thông tin đơn hàng của người dùng
export const getOrdersUser = createAsyncThunk(
  "userOrders/getOrdersUser",
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/order?status=${status}`);
      console.log("Response: ",response)
      // Nếu API trả về phản hồi thành công nhưng không có dữ liệu
      if (response.status === 404 && (!response.data || response.data.length === 0)) {
        console.log("RE", response)
        return { data: [] }; // Trả về mảng rỗng nếu không có đơn hàng
      }
      return response.data;
    } catch (error) {
      toast.error("Không thể lấy thông tin đơn hàng");
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState: {
    orders: [],  // Lưu trữ danh sách đơn hàng
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Khi yêu cầu đang thực hiện
      .addCase(getOrdersUser.pending, (state) => {
        state.loading = true;
        state.error = null;  // Xóa lỗi cũ nếu có
      })
      // Khi yêu cầu thành công
      .addCase(getOrdersUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.data;  // Cập nhật danh sách đơn hàng
        // console.log("State: ",state.orders)
      })
      // Khi yêu cầu thất bại
      .addCase(getOrdersUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi không xác định";  // Lưu lỗi
      });
  },
});

export default userOrdersSlice.reducer;
