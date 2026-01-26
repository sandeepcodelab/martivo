import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthContaxtProvider = ({ children }) => {
  const [user, setUser] = useState({});

  // Login
  const userLogin = (userData) => {
    setUser(userData?.data?.user);
    localStorage.setItem("userAuth", JSON.stringify(userData));
  };

  // Logout
  const userLogout = () => {
    setUser({});
    localStorage.removeItem("userAuth");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userAuth"));
    if (storedUser) {
      setUser(storedUser?.data?.user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, userLogin, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContaxtProvider;
