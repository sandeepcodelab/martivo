import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { createBrowserRouter, RouterProvider } from "react-router";

// User routes
import UserLayout from "./layout/UserLayout";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";

// Admin routes
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import ProductsTable from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Users from "./admin/pages/Users";
import Categories from "./admin/pages/Categories";
import AddProduct from "./admin/pages/AddProduct";
import EditProduct from "./admin/pages/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <Products /> },
      { path: "cart", element: <Cart /> },
      { path: "product-details", element: <ProductDetails /> },
      { path: "checkout", element: <Checkout /> },
      { path: "Login", element: <Login /> },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <ProductsTable /> },
      { path: "products/add", element: <AddProduct /> },
      { path: "products/edit", element: <EditProduct /> },
      { path: "orders", element: <Orders /> },
      { path: "categories", element: <Categories /> },
      { path: "users", element: <Users /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="martivo-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
