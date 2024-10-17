import { configureStore } from "@reduxjs/toolkit";
import adminProductReducer from "../features/Admin/adminProductsSlice";
import productReducer from "../features/product/productsSlice";
import brandReducer from "../features/brand/brandsSlice";
import categoryReducer from "../features/Category/categoriesSlice";
import useCaseReducer from "../features/usecase/usecaseSlice";
import productVariationReducer from "../features/product/productVariationSlice";
import adminVariationReducer from "../features/Admin/adminVariationsSlice"

export const store = configureStore({
  reducer: {
    productVariation: productVariationReducer,
    useCase: useCaseReducer,
    brand: brandReducer,
    category: categoryReducer,
    product: productReducer,
    adminProduct: adminProductReducer,
    adminVariation: adminVariationReducer,
  },
});