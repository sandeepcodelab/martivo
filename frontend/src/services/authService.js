import api from "@/utils/api";

export const signupUser = (payload) => {
  return api.post("/auth/register", payload);
};

export const userLogin = (payload) => {
  return api.post("/auth/login", payload).then((res) => res.data);
};

export const getCurrentUser = () => {
  return api.get("/auth/user").then((res) => res.data);
};

export const logout = () => {
  return api.post("/auth/logout").then((res) => res.data);
};

export const getAllUsers = (params = {}) => {
  return api.get("/auth/getUsers/admin", { params });
};

export const getUserById = (id) => {
  return api.get(`/auth/getUser/${id}/admin`);
};

export const updateUserRole = (id, role) => {
  return api.patch(`/auth/update/${id}/admin`, { role });
};

export const deleteUser = (id) => {
  return api.delete(`/auth/delete/${id}/admin`);
};
