import { createBrowserRouter } from "react-router-dom";
import ProtectedRouter from "./components/protected/ProtectedRouter";
import ProtectedAdminRouter from "./components/protected/ProtectedAdminRouter";

import Home from "./pages/Home/Home";
import App from "./App";
// import Root from "./pages/Root";
import Cart from "./pages/Cart/Cart";
import Checkouts from "./pages/Checkouts/Checkouts";
import Collections from "./pages/Collections/Collections";
import ProductList from "./pages/Product/ProductList/ProductList";
import ProductDetail from "./pages/Product/ProductDetail/ProductDetail";
import ProductOneBrand from "./pages/Product/ProductOneBrand/ProductOneBrand";

import Account from "./pages/Account/Account";
import AccountOrder from "./pages/Account/AccountComputer/AccountOrder/AccountOrder";
import InformationUser from "./pages/Account/AccountMobile/InformationUser/InformationUser";
import AccountInformation from "./pages/Account/AccountComputer/AccountInformation/AccountInformation";
import PurchaseHistoryUser from "./pages/Account/AccountMobile/PurchaseHistoryUser/PurchaseHistoryUser";
import AccountNotification from "./pages/Account/AccountComputer/AccountNotification/AccountNotification";
import ChangePasswordMobile from "./pages/Account/AccountMobile/ChangePasswordMobile/ChangePasswordMobile";
import AccountChangePassword from "./pages/Account/AccountComputer/AccountChangePassword/AccountChangePassword";

import AdminLayout from "./pages/Admin/AdminLayout";
import DashBoard from "./pages/Admin/DashBoard/DashBoard";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import BrandManagement from "./pages/Admin/BrandManagement/BrandManagement";
import OrderManagement from "./pages/Admin/OrderManagement/OrderManagement";
import ProductVariation from "./pages/Admin/ProductManagement/ProductVariation";
import ProductManagement from "./pages/Admin/ProductManagement/ProductManagement";
import RestoreManagement from "./pages/Admin/RestoreManagement/RestoreManagement";
import CategoryManagement  from "./pages/Admin/CategoryManagement/CategoryManagement";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import EmailVerify from "./components/verify/EmailVerify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home></Home>,
        index: true,
      },
      {
        path: "/products/:id",
        element: <ProductDetail></ProductDetail>,
      },
      {
        path: "/collections",
        element: <Collections></Collections>,
      },
      {
        path: "/users/:id/verify/:token",
        element: <EmailVerify></EmailVerify>,
      },
      {
        path: "/productList",
        element: <ProductList></ProductList>,

        children: [
          {
            path: ":name",
            element: <ProductList></ProductList>,
          }
        ],
      },
      {
        path: "/productOneBrand",
        element: <ProductOneBrand />
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "checkouts",
        element: (
          <ProtectedRouter>
            <Checkouts />
          </ProtectedRouter>
        ),
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
        element: (
          <ProtectedRouter>
            <Account/>
          </ProtectedRouter>
        ),
        children: [
          {
            path: "information",
            element: <AccountInformation />,
            index: true,
          },
          {
            path: "order",
            element: <AccountOrder />,
          },
          {
            path: "notifications",
            element: <AccountNotification />,
          },
          {
            path: "changePassword",
            element: <AccountChangePassword />,
          },
          // Mobile
          {
            path: "informationMobile",
            element: <InformationUser />,
          },
          {
            path: "orderMobile",
            element: <PurchaseHistoryUser />,
          },
          {
            path: "changePasswordMobile",
            element: <ChangePasswordMobile />
          },
        ]
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedAdminRouter>
        <AdminLayout />
      </ProtectedAdminRouter>
    ),
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
      {
        path: "products/:productId",
        element: <ProductVariation />,
      },
      {
        path: "restore",
        element: <RestoreManagement />,
      },
    ]
  }
]);

export default router;
