import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from "../../api/apiConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Thunk to get all orders
export const getAllOrders = createAsyncThunk(
  'order/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/order');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to change the order status
export const changeOrderStatus = createAsyncThunk(
  'order/changeOrderStatus',
  async ({ orderId, newStatus }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/order/${orderId}`, { orderStatus: newStatus });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to submit a new order
export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post('/order', orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to submit order");
    }
  }
);

const initialState =  {
  orders: [],
  orderInfo: null,
  orderStatus: null,
  loading: false,
  error: null, 
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderInfo = action.payload;
        toast.success("Đặt hàng thành công");
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Đặt hàng không thành công");
      })
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        state.orders = state.orders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
        state.orderStatus = updatedOrder.status;
        toast.success("Cập nhật trạng thái đơn hàng thành công");
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Cập nhập trạng thái đơn hàng thất bại");
      });  
  },
});
export default orderSlice.reducer;
