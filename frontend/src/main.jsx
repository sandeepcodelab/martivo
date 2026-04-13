import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthContaxtProvider from "./contexts/AuthContextProvider";
import GlobalToast from "./components/GlobalToast/GlobalToast";

// User routes
import UserLayout from "./layouts/UserLayout";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import UserOrders from "./pages/UserOrders";
import UserCategories from "./pages/Categories";
import UserOrderDetails from "./pages/UserOrderDetails";

// Auth routes
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Admin routes
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import ProductsTable from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Users from "./admin/pages/Users";
import Categories from "./admin/pages/Categories";
import AddProduct from "./admin/pages/AddProduct";
import EditProduct from "./admin/pages/EditProduct";
import OrderDetails from "./admin/pages/OrderDetails";
import UserDetails from "./admin/pages/UserDetails";

import RouteGuard from "./components/RouteGuard/RouteGuard";
import Unauthorized from "./pages/Unauthorized";

const router = createBrowserRouter([
  // User Routes
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <Products /> },
      { path: "cart", element: <Cart /> },
      { path: "product-details/:id", element: <ProductDetails /> },
      { path: "categories", element: <UserCategories /> },
      {
        path: "checkout",
        element: (
          <RouteGuard requireAuth allowedRoles={["user", "admin"]}>
            <Checkout />
          </RouteGuard>
        ),
      },
      {
        path: "order-success",
        element: (
          <RouteGuard requireAuth allowedRoles={["user", "admin"]}>
            <OrderSuccess />
          </RouteGuard>
        ),
      },
      {
        path: "user/orders",
        element: (
          <RouteGuard requireAuth allowedRoles={["user", "admin"]}>
            <UserOrders />
          </RouteGuard>
        ),
      },
      {
        path: "user/orders/:id",
        element: (
          <RouteGuard requireAuth allowedRoles={["user", "admin"]}>
            <UserOrderDetails />
          </RouteGuard>
        ),
      },
    ],
  },

  // Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "Login",
        element: (
          <RouteGuard guestOnly>
            <Login />
          </RouteGuard>
        ),
      },
      {
        path: "signup",
        element: (
          <RouteGuard guestOnly>
            <Signup />
          </RouteGuard>
        ),
      },
      {
        path: "unauthorized",
        element: <Unauthorized />,
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: (
      <RouteGuard requireAuth allowedRoles={["admin"]}>
        <AdminLayout />
      </RouteGuard>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <ProductsTable /> },
      { path: "products/add", element: <AddProduct /> },
      { path: "products/edit/:id", element: <EditProduct /> },
      { path: "orders", element: <Orders /> },
      { path: "orders/edit/:id", element: <OrderDetails /> },
      { path: "categories", element: <Categories /> },
      { path: "users", element: <Users /> },
      { path: "users/edit/:id", element: <UserDetails /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="martivo-theme">
      <GlobalToast />
      <AuthContaxtProvider>
        <RouterProvider router={router} />
      </AuthContaxtProvider>
    </ThemeProvider>
  </StrictMode>,
);
