import { configureStore } from "@reduxjs/toolkit";
import adminProductReducer from "../features/Admin/adminProductsSlice";
import productReducer from "../features/product/productsSlice"
import brandReducer from "../features/brand/brandsSlice";
import categoryReducer from "../features/category/categoriesSlice";
import productVariationReducer from "../features/product/productVariationSlice";
import adminVariationReducer from "../features/Admin/adminVariationsSlice"
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import userReducer from "../features/user/userSlice"
import authReducer from "../features/Auth/authSlice"
import authProfileReducer from "../features/Auth/authProfileSlice";
import authOrdersUserReducer from "../features/Auth/authOrdersUserSlice";

export const store = configureStore({
  reducer: {
    productVariation: productVariationReducer,
    brand: brandReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    adminProduct: adminProductReducer,
    adminVariation: adminVariationReducer,
    auth: authReducer,
    profile: authProfileReducer,
    ordersUser: authOrdersUserReducer,
  },
});