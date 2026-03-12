import api from "@/utils/api";

export const createOrder = (payload) => {
  return api.post("/order/create", payload);
};

export const getAllOrders = () => {
  return api.get("/order/all");
};
