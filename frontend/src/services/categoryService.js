import api from "@/utils/api";

export const getAllcategories = (params = {}) => {
  return api.get("/category/all", { params });
};

export const adminGetAllcategories = (params = {}) => {
  return api.get("/category/getAll/admin", { params });
};

export const addCategory = (formData) => {
  return api.post("/category/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCategory = (id, formData) => {
  return api.patch(`/category/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const categoryDelete = (id) => {
  return api.delete(`/category/delete/${id}`);
};
