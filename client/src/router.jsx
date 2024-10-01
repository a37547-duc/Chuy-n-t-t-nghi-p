import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Root from "./pages/Root";
import ProductDetail from "./pages/Product/ProductDetail/ProductDetail";
import ProductList from "./pages/Product/ProductList/ProductList";
import Cart from "./pages/Cart/Cart";
import Checkouts from "./pages/Checkouts/Checkouts";
import Collections from "./pages/Collections/Collections";
import Account from "./pages/Account/Account";
import AccountInformation from "./pages/Account/AccountInformation/AccountInformation";
import AccountOrder from "./pages/Account/AccountOrder/AccountOrder";
import EmptyPagePayMent from "./pages/Account/AccountOrder/EmptyPage/EmptyPagePayMent";
import AccountNotification from "./pages/Account/AccountNotification/AccountNotification";
import AdminLayout from "./pages/Admin/AdminLayout";
import DashBoard from "./pages/Admin/DashBoard/DashBoard";
import ProductManagement from "./pages/Admin/ProductManagement/ProductManagement";
import BrandManagement from "./pages/Admin/BrandManagement/BrandManagement";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import OrderManagement from "./pages/Admin/OrderManagement/OrderManagement"
import CategoryManagement  from "./pages/Admin/CategoryManagement/CategoryManagement"
import EmptyPageDelivery from "./pages/Account/AccountOrder/EmptyPage/EmptyPageDelivery";
import EmptyPageCompleted from "./pages/Account/AccountOrder/EmptyPage/EmptyPageCompleted";

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
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element: <Signup></Signup>
      },
      {
        path: "account",
        element: <Account />,
        children: [
          {
            path: "information",
            element: <AccountInformation />,
            index: true,
          },
          {
            path: "order",
            element: <AccountOrder />,
            children: [
              {
                path: "emptyDelivery",
                element: <EmptyPageDelivery />,
                index: true,
              },
              {
                path: "emptyPayment",
                element: <EmptyPagePayMent />,
              },
              {
                path: "emptyCompleted",
                element: <EmptyPageCompleted />,
              },
            ]
          },
          {
            path: "notifications",
            element: <AccountNotification />,
          },
        ]
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
        path: "orders",
        element: <OrderManagement />,
      },
      {
        path: "users",
        element: <UserManagement /> ,
      },
      {
        path: "brand",
        element: <BrandManagement />,
      },
      {
        path: "category",
        element: <CategoryManagement />,
      },
    ]
  }
]);

export default router;
