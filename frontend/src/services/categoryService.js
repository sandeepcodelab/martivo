import api from "@/utils/api";

export const getAllcategories = (params = {}) => {
  return api.get("/category/all", { params });
};

export const addCategory = (name, categoryStatus) => {
  return api.post("/category/add", { name, status: categoryStatus });
};

export const updateCategory = (id, name, categoryStatus) => {
  return api.patch(`/category/update/${id}`, { name, status: categoryStatus });
};

export const categoryDelete = (id) => {
  return api.delete(`/category/delete/${id}`);
};
