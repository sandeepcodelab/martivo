import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import { notification } from "@/utils/toast";
// import { useNavigate } from "react-router";

const AuthContaxtProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [itemsCount, setItemCount] = useState();

  // const navigate = useNavigate();

  // Refresh auth on app load
  // useEffect(() => {
  //   axios
  //     .post("/api/v1/auth/refresh", {}, { withCredentials: true })
  //     .then((res) => console.log("res => ", res))
  //     .catch((err) => {
  //       if (err.status === 401) {
  //         // userLogout();
  //       }
  //     });

  //   const storedUser = JSON.parse(localStorage.getItem("userAuth"));
  //   if (storedUser) {
  //     setUser(storedUser?.data?.user);
  //   }
  // }, []);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("guestCartItems")) || [];
    setItemCount(cartItems.length);
  }, []);

  // Login
  const userLogin = (userData) => {
    setUser(userData?.data?.user);
    localStorage.setItem("userAuth", JSON.stringify(userData));
  };

  // Logout
  const userLogout = () => {
    axios
      .post("/api/v1/auth/logout", {}, { withCredentials: true })
      .then((res) => {
        // userLogout();

        notification.success("Log out successfully.");
        navigate("/auth/login");
      })
      .catch((error) => {
        console.log(error);
        notification.error("Something went wrong, Please try again later.");
      });

    setUser({});
    localStorage.removeItem("userAuth");
  };

  // Count cart items
  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("guestCartItems")) || [];
    setItemCount(cartItems.length);
  };

  return (
    <AuthContext.Provider
      value={{ user, userLogin, userLogout, itemsCount, updateCartCount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContaxtProvider;
