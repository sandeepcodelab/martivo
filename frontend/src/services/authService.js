import api from "@/utils/api";

export const login = (payload) => {
  return api.post("/auth/login", payload).then((res) => res.data);
};

export const getCurrentUser = async () => {
  return api.post("/auth/user").then((res) => res.data);
};

export const logout = async () => {
  return api.post("/auth/logout").then((res) => res.data);
};
