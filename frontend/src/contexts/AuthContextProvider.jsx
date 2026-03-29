import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getCurrentUser } from "@/services/authService";
import { getCartItems, mergeCart } from "@/services/cartService";

const AuthContaxtProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [itemsCount, setItemCount] = useState(0);

  // Refresh auth on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get current user
        const userData = await getCurrentUser();
        setUserData({ user: userData?.data?.user, isAuthenticated: true });
      } catch (error) {
        if (error.response?.status === 401) {
          userLogout();
        }
        setUserData({ user: null, isAuthenticated: false });
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        if (userData.isAuthenticated) {
          const res = await getCartItems();
          updateCartCount(res?.data?.data?.cart?.items?.length);
        } else {
          updateCartCount();
        }
      } catch (err) {
        if (err.response?.status === 401) {
          updateCartCount();
        }
      }
    };
    fetchCartItem();
  }, [userData]);

  // Login
  const loggedInUser = async (userData) => {
    setUserData({ user: userData?.data?.user, isAuthenticated: true });

    if (!userData.success) return;

    const localCart = JSON.parse(localStorage.getItem("guestCartItems"));

    if (localCart.length > 0) {
      try {
        const res = await mergeCart(localCart);
        updateCartCount(res.data.data.cart.items.length);
        localStorage.removeItem("guestCartItems");
      } catch (err) {
        console.error("Cart merge failed", err);
      }
    }
  };

  // Logout
  const userLogout = () => {
    setUserData({
      user: null,
      isAuthenticated: false,
    });
  };

  // Count cart items
  const updateCartCount = (itemsInCart) => {
    if (itemsInCart) {
      setItemCount(itemsInCart);
    } else {
      const cartItems =
        JSON.parse(localStorage.getItem("guestCartItems")) || [];
      setItemCount(cartItems.length);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        loggedInUser,
        userLogout,
        itemsCount,
        updateCartCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContaxtProvider;
