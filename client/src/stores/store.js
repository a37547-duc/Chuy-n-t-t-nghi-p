import { configureStore } from "@reduxjs/toolkit";
import adminProductReducer from "../features/Admin/adminProductsSlice";
import productReducer from "../features/product/productsSlice"
import brandReducer from "../features/brand/brandsSlice";
import categoryReducer from "../features/category/categoriesSlice";
import useCaseReducer from "../features/usecase/usecaseSlice";
import productVariationReducer from "../features/product/productVariationSlice";
import adminVariationReducer from "../features/Admin/adminVariationsSlice"
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import authReducer from "../features/Auth/authSlice"
import authProfileReducer from "../features/Auth/authProfileSlice";
import authOrdersUserReducer from "../features/Auth/authOrdersUserSlice";

export const store = configureStore({
  reducer: {
    productVariation: productVariationReducer,
    useCase: useCaseReducer,
    brand: brandReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    adminProduct: adminProductReducer,
    adminVariation: adminVariationReducer,
    auth: authReducer,
    profile: authProfileReducer,
    ordersUser: authOrdersUserReducer,
  },
});