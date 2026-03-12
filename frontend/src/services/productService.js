import api from "@/utils/api";

export const getAllProducts = (params = {}) => {
  return api.get("/product/all", { params });
};

export const getProduct = (productId) => {
  return api.get(`/product/singleProduct/${productId}`);
};

export const getAllVariants = (productId) => {
  return api.get(`/product-variant/${productId}/all`);
};
