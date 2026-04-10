import api from "@/utils/api";

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
