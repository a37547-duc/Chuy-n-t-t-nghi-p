/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRouter from "./components/protected/ProtectedRouter";
import ProtectedAdminRouter from "./components/protected/ProtectedAdminRouter";

// Lazy loading components
const App = React.lazy(() => import("./App"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const Checkouts = React.lazy(() => import("./pages/Checkouts/Checkouts"));
const Collections = React.lazy(() => import("./pages/Collections/Collections"));
const ProductList = React.lazy(() => import("./pages/Product/ProductList/ProductList"));
const ProductDetail = React.lazy(() => import("./pages/Product/ProductDetail/ProductDetail"));
const ProductOneBrand = React.lazy(() => import("./pages/Product/ProductOneBrand/ProductOneBrand"));
const Account = React.lazy(() => import("./pages/Account/Account"));
const AccountOrder = React.lazy(() => import("./pages/Account/AccountComputer/AccountOrder/AccountOrder"));
const InformationUser = React.lazy(() => import("./pages/Account/AccountMobile/InformationUser/InformationUser"));
const AccountInformation = React.lazy(() => import("./pages/Account/AccountComputer/AccountInformation/AccountInformation"));
const PurchaseHistoryUser = React.lazy(() => import("./pages/Account/AccountMobile/PurchaseHistoryUser/PurchaseHistoryUser"));
const AccountDiscounts = React.lazy(() => import("./pages/Account/AccountComputer/AccountDiscount/AccountDiscounts"));
const ChangePasswordMobile = React.lazy(() => import("./pages/Account/AccountMobile/ChangePasswordMobile/ChangePasswordMobile"));
const AccountChangePassword = React.lazy(() => import("./pages/Account/AccountComputer/AccountChangePassword/AccountChangePassword"));

const AdminLayout = React.lazy(() => import("./pages/Admin/AdminLayout"));
const DashBoard = React.lazy(() => import("./pages/Admin/DashBoard/DashBoard"));
const UserManagement = React.lazy(() => import("./pages/Admin/UserManagement/UserManagement"));
const BrandManagement = React.lazy(() => import("./pages/Admin/BrandManagement/BrandManagement"));
const OrderManagement = React.lazy(() => import("./pages/Admin/OrderManagement/OrderManagement"));
const ProductVariation = React.lazy(() => import("./pages/Admin/ProductManagement/ProductVariation"));
const ProductManagement = React.lazy(() => import("./pages/Admin/ProductManagement/ProductManagement"));
const RestoreManagement = React.lazy(() => import("./pages/Admin/RestoreManagement/RestoreManagement"));
const CategoryManagement = React.lazy(() => import("./pages/Admin/CategoryManagement/CategoryManagement"));

const Login = React.lazy(() => import("./pages/Login/Login"));
const Signup = React.lazy(() => import("./pages/Signup/Signup"));
const EmailVerify = React.lazy(() => import("./components/verify/EmailVerify"));
const ForgotPassword = React.lazy(() => import("./components/password/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./components/password/resetPassword"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div className="flex justify-center items-center my-6 min-h-[400px]">
            <svg className="animate-spin h-8 w-8 text-black-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span className="ml-2 text-black-500">Loading...</span>
          </div>}>
            <Home />
          </Suspense>
        ),
        index: true,
      },
      {
        path: "/products/:id",
        element: (
          <Suspense>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: "/collections",
        element: (
          <Suspense>
            <Collections />
          </Suspense>
        ),
      },
      {
        path: "/users/:id/verify/:token",
        element: (
          <Suspense>
            <EmailVerify />
          </Suspense>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <Suspense>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "reset-password",
        element: (
          <Suspense>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "/productList",
        element: (
          <Suspense>
            <ProductList />
          </Suspense>
        ),
        children: [
          {
            path: ":name",
            element: (
              <Suspense>
                <ProductList />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/productOneBrand",
        element: (
          <Suspense>
            <ProductOneBrand />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "checkouts",
        element: (
          <ProtectedRouter>
            <Suspense>
              <Checkouts />
            </Suspense>
          </ProtectedRouter>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/signup",
        element: (
          <Suspense>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "account",
        element: (
          <ProtectedRouter>
            <Suspense>
              <Account />
            </Suspense>
          </ProtectedRouter>
        ),
        children: [
          {
            path: "information",
            element: (
              <Suspense>
                <AccountInformation />
              </Suspense>
            ),
            index: true,
          },
          {
            path: "order",
            element: (
              <Suspense>
                <AccountOrder />
              </Suspense>
            ),
          },
          {
            path: "discounts",
            element: (
              <Suspense>
                <AccountDiscounts />
              </Suspense>
            ),
          },
          {
            path: "changePassword",
            element: (
              <Suspense>
                <AccountChangePassword />
              </Suspense>
            ),
          },
          {
            path: "informationMobile",
            element: (
              <Suspense>
                <InformationUser />
              </Suspense>
            ),
          },
          {
            path: "orderMobile",
            element: (
              <Suspense>
                <PurchaseHistoryUser />
              </Suspense>
            ),
          },
          {
            path: "changePasswordMobile",
            element: (
              <Suspense>
                <ChangePasswordMobile />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "admin",
    element: (
      <ProtectedAdminRouter>
        <Suspense>
          <AdminLayout />
        </Suspense>
      </ProtectedAdminRouter>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <Suspense>
            <DashBoard />
          </Suspense>
        ),
        index: true,
      },
      {
        path: "products",
        element: (
          <Suspense>
            <ProductManagement />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense>
            <OrderManagement />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense>
            <UserManagement />
          </Suspense>
        ),
      },
      {
        path: "brand",
        element: (
          <Suspense>
            <BrandManagement />
          </Suspense>
        ),
      },
      {
        path: "category",
        element: (
          <Suspense>
            <CategoryManagement />
          </Suspense>
        ),
      },
      {
        path: "products/:productId",
        element: (
          <Suspense>
            <ProductVariation />
          </Suspense>
        ),
      },
      {
        path: "restore",
        element: (
          <Suspense>
            <RestoreManagement />
          </Suspense>
        ),
      },
    ],
  },
]);


export default router;