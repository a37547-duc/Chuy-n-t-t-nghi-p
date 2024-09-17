import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./pages/Root";
import ProductDetail from "./pages/Product/ProductDetail/ProductDetail";
import ProductList from "./pages/Product/ProductList/ProductList";
import Cart from "./pages/Cart/Cart";
import Checkouts from "./pages/Checkouts/Checkouts";
import Collections from "./pages/Collections/Collections";
import Admin from "./pages/Admin/Admin";
import ProductManagement from "./pages/Admin/ProductManagement/ProductManagement";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import BrandManagement from "./pages/Admin/BrandManagement/BrandManagement";
import Account from "./pages/Account/Account";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
        index: true,
      },
      {
        path: "/products",
        element: <ProductDetail></ProductDetail>,
      },
      {
        path: "/collections",
        element: <Collections></Collections>,
      },
      {
        path: "/productList",
        element: <ProductList></ProductList>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/account",
        element: <Account></Account>,
      },
    ],
  },
  {
    path: "checkouts",
    element: <Checkouts></Checkouts>,
  },

  {
    path: "admin",
    element: <Admin></Admin>,
    children: [
      {
        path: "AdminProducts",
        element: <ProductManagement />,
      },
      {
        path: "AdminUsers",
        element: <UserManagement />,
      },
      {
        path: "AdminBrands",
        element: <BrandManagement />,
      },
    ]
  }
]);

export default router;
