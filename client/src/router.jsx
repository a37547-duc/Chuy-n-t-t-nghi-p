import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./pages/Root";
import ProductDetail from "./pages/Product/ProductDetail/ProductDetail";
import ProductList from "./pages/Product/ProductList/ProductList";
import Cart from "./pages/Cart/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,

    children: [
      {
        path: "/",
        path: "/",
        element: <Home></Home>,
        index: true,
      },
      ,
      {
        path: "/productDetails",
        element: <ProductDetail></ProductDetail>,
      },
      {
        path: "/productList",
        element: <ProductList></ProductList>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
    ],
  },
]);

export default router;
