import { configureStore } from "@reduxjs/toolkit";
import statsReducer from "../features/Admin/statistical";
import adminBrandReducer from "../features/Admin/adminBrandSlice";
import adminProductReducer from "../features/Admin/adminProductsSlice";
import adminCategoryReducer from "../features/Admin/adminCategorySlice";
import adminVariationReducer from "../features/Admin/adminVariationsSlice";

import productReducer from "../features/product/productsSlice";
import productVariationReducer from "../features/product/productVariationSlice";

import userReducer from "../features/user/userSlice";
import cartReducer from "../features/cart/cartSlice";
import brandReducer from "../features/brand/brandsSlice";
import orderReducer from "../features/order/orderSlice";
import categoryReducer from "../features/category/categoriesSlice";

import authReducer from "../features/Auth/authSlice";
import authProfileReducer from "../features/Auth/authProfileSlice";
import authOrdersUserReducer from "../features/Auth/authOrdersUserSlice";

import { productApi } from "../features/Client/ClientProductQuery";
import ClientProductReducer from "../features/Client/ClientProductSlice";
import ClientFilterReducer from '../features/Client/ClientFilterSlice';
import ClientCommentReducer from '../features/Client/ClientCommentSlice';
import ClientBrandReducer from '../features/Client/ClientBrandSlice';
import ClientCategoryReducer from "../features/Client/ClientCategorySlice";
import ClientDiscountReducer from "../features/Client/ClientDiscountSlice";
import CommentReducer from "../features/Client/Comment";

export const store = configureStore({
  reducer: {
    productVariation: productVariationReducer,
    brand: brandReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    stats: statsReducer,
    adminProduct: adminProductReducer,
    adminVariation: adminVariationReducer,
    adminCategory: adminCategoryReducer,
    adminBrand: adminBrandReducer,
    auth: authReducer,
    profile: authProfileReducer,
    ordersUser: authOrdersUserReducer,
    clientProduct: ClientProductReducer,
    clientComment: ClientCommentReducer,
    clientBrand: ClientBrandReducer,
    clientCategory: ClientCategoryReducer,
    clientDiscount: ClientDiscountReducer,
    comment: CommentReducer,
    filter: ClientFilterReducer,
    [productApi.reducerPath]: productApi.reducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
});