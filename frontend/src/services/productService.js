import api from "@/utils/api";

export const getAllProducts = (params = {}) => {
  return api.get("/product/all", { params });
};

export const getProduct = (productId) => {
  return api.get(`/product/singleProduct/${productId}`);
};

export const createProduct = (formData) => {
  return api.post("/product/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProduct = (id, formData) => {
  return api.patch(`/product/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const adminGetAllProducts = (params = {}) => {
  return api.get("/product/getAll", { params });
};

export const deleteProduct = (id) => {
  return api.delete(`/product/delete/${id}`);
};

export const deleteProductImage = (id, url) => {
  return api.delete(
    `/product/delete-image/${id}?url=${encodeURIComponent(url)}`,
  );
};

export const updateStatusOfProduct = (id, productStatus) => {
  return api.patch(`product/update-status/${id}`, { status: productStatus });
};

// Variants
export const getAllVariants = (productId) => {
  return api.get(`/product-variant/${productId}/all`);
};

export const addBulkVariants = (productId, variants) => {
  return api.post(`/product-variant/${productId}/addBulk`, { variants });
};

export const updateVariants = (productId, variants) => {
  return api.patch(`/product-variant/update/${productId}`, { variants });
};

export const deleteVariant = (id) => {
  return api.delete(`/product-variant/delete/${id}`);
};
