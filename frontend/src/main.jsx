import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
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
import Dashboard from "./admin/pages/Dashboard";
import AdminLayout from "./layout/AdminLayout";

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
        path: "",
        element: "",
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
