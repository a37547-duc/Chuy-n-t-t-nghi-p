import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./pages/Root";
import ProductDetail from "./pages/Product/ProductDetail/ProductDetail";
import ProductList from "./pages/Product/ProductList/ProductList";
import Cart from "./pages/Cart/Cart";
import Checkouts from "./pages/Checkouts/Checkouts";
import Collections from "./pages/Collections/Collections";
import AdminLayout from "./pages/Admin/AdminLayout";
import ProductManagement from "./pages/Admin/ProductManagement/ProductManagement";
import DashBoard from "./pages/Admin/DashBoard/DashBoard";
import Account from "./pages/Account/Account"
import BrandManagement from "./pages/Admin/BrandManagement/BrandManagement";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
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
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        path: "dashboard",
        element: <DashBoard/>,
        index: true,
      },
      {
        path: "products",
        element: <ProductManagement />,
      },
      {
        path: "users",
        element: <UserManagement /> ,
      },
      {
        path: "brand",
        element: <BrandManagement />,
      }
    ]
  }
]);

export default router;
