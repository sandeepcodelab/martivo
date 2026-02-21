import api from "@/utils/api";

export const userLogin = (payload) => {
  return api.post("/auth/login", payload).then((res) => res.data);
};

export const getCurrentUser = () => {
  return api.get("/auth/user").then((res) => res.data);
};

export const logout = () => {
  return api.post("/auth/logout").then((res) => res.data);
};
