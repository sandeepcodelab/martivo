import api from "@/utils/api";

export const getAllProducts = () => {
  return api.get("/product/all");
};

export const getProduct = (productId) => {
  return api.get(`/product/singleProduct/${productId}`);
};

export const getAllVariants = (productId) => {
  return api.get(`/product-variant/${productId}/all`);
};
