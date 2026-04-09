import api from "@/utils/api";

export const createOrder = (payload) => {
  return api.post("/order/create", payload);
};

export const getUserOrders = () => {
  return api.get("/order/all/user");
};

export const getAllOrders = (params = {}) => {
  return api.get("/order/all/admin", { params });
};

export const getOrderById = (id) => {
  return api.get(`order/orderDetails/${id}`);
};

export const updateOrderStatus = (id, status) => {
  return api.patch(`order/update/${id}`, { status });
};

export const updatePaymentStatus = (id, paymentStatus) => {
  return api.patch(`order/update/${id}`, { paymentStatus });
};
