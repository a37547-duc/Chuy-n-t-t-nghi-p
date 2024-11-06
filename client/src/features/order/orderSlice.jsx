import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ORDER_API_URL = "https://laptech4k.onrender.com/api/v1/orders";
const ORDER_ITEM_API_URL = "https://laptech4k.onrender.com/api/v1/orderItems";

// Tạo đơn hàng mới
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ orderData, items }, { rejectWithValue }) => {
    try {
      const orderResponse = await axios.post(ORDER_API_URL, orderData);
      const orderId = orderResponse.data._id;

      // Tạo các OrderItem liên kết với orderId
      const itemResponses = await Promise.all(
        items.map(item => axios.post(ORDER_ITEM_API_URL, { ...item, orderId }))
      );

      return { order: orderResponse.data, items: itemResponses.map(res => res.data) };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Lấy danh sách tất cả đơn hàng và các OrderItem
export const fetchOrdersWithItems = createAsyncThunk(
  "order/fetchOrdersWithItems",
  async (_, { rejectWithValue }) => {
    try {
      const orderResponse = await axios.get(ORDER_API_URL);
      const orders = orderResponse.data;

      // Lấy danh sách OrderItem cho từng Order
      const itemResponses = await Promise.all(
        orders.map(order =>
          axios.get(`${ORDER_ITEM_API_URL}?orderId=${order._id}`)
        )
      );

      // Gắn các OrderItem vào đơn hàng tương ứng
      const ordersWithItems = orders.map((order, index) => ({
        ...order,
        items: itemResponses[index].data,
      }));

      return ordersWithItems;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${ORDER_API_URL}/${orderId}`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchOrdersWithItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersWithItems.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersWithItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
