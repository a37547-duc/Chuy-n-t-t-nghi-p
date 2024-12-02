import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from "../../api/apiConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Thunk to get all orders
export const getAllOrders = createAsyncThunk(
  'order/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/orders');
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
      const response = await api.patch(`/admin/orders/update/${orderId}`, { orderStatus: newStatus });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to submit a new order payment
export const submitOrderPayment = createAsyncThunk(
  'order/submitOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/order-payment', orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Thunk to submit a new order payment cod
export const submitOrderCod = createAsyncThunk(
  'order/submitOrderCod',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/order-payment', orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      // Đặt hàng qua MoMo
      .addCase(submitOrderPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrderPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.orderInfo = action.payload.paymentData.payUrl;
        toast.success("Đặt hàng thành công");
        window.location.href = state.orderInfo;
      })
      .addCase(submitOrderPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // Đặt hàng Cod
      .addCase(submitOrderCod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrderCod.fulfilled, (state, action) => {
        state.loading = false;
        state.orderInfo = action.payload
        toast.success("Đặt hàng thành công");
        window.location.href = `/account/order`
      })
      .addCase(submitOrderCod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // Get Danh sách đơn hàng
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
      // Thay đổi trạng thái
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
