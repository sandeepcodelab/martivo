import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";

// import App from "./App";
import UserLayout from "./layout/UserLayout";
import { RouterProvider, createBrowserRouter } from "react-router";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";

// Admin
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import ProductsTable from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Users from "./admin/pages/Users";
import Categories from "./admin/pages/Categories";
import AddProduct from "./admin/pages/AddProduct";

const router = createBrowserRouter([
  {
    path: "",
    Component: UserLayout,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product-details",
        element: <ProductDetails />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/products",
        element: <ProductsTable />,
      },
      {
        path: "/admin/products/addProduct",
        element: <AddProduct />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },
      {
        path: "/admin/categories",
        element: <Categories />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
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
