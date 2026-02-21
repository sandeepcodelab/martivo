import api from "../utils/api";

export const getCartWithVariants = async () => {
  // Get cart
  const cartRes = await api.get("/cart/all");
  const cartItems = cartRes?.data?.data?.cart?.items || [];

  if (!cartItems.length) return [];

  const variantIds = cartItems.map((item) => item.variantId);

  // Get variant details
  const variantRes = await api.post("/product-variant/bulk", {
    variantIds,
  });

  const variants = variantRes.data.data.variants;

  // Merge
  const mergedCart = variants.map((variant) => {
    const matchedItem = cartItems.find(
      (item) => item.variantId === variant._id,
    );

    return {
      ...variant,
      quantity: matchedItem?.quantity ?? 1,
    };
  });

  return mergedCart;
};

export const getGuestCartWithVariants = async () => {
  const localCart = JSON.parse(localStorage.getItem("guestCartItems")) || [];

  if (!localCart.length) return [];

  const variantIds = localCart.map((item) => item.variantId);

  const res = await api.post("/product-variant/bulk", {
    variantIds,
  });

  const variants = res.data.data.variants;

  const mergedCart = variants.map((variant) => {
    const matchedItem = localCart.find(
      (item) => item.variantId === variant._id,
    );

    return {
      ...variant,
      quantity: matchedItem?.quantity ?? 1,
    };
  });

  return mergedCart;
};

export const addItemToCart = (variantId, quantity) => {
  return api.post("/cart/add", { variantId, quantity });
};

export const addItemToGuestCart = (variantId, quantity) => {
  const cart = JSON.parse(localStorage.getItem("guestCartItems")) || [];

  const itemExist = cart.find((item) => item.variantId === variantId);

  let updateCart;

  if (itemExist) {
    updateCart = cart.map((item) =>
      item.variantId === variantId ? { ...item, quantity: quantity } : item,
    );
  } else {
    updateCart = [...cart, { variantId, quantity }];
  }

  localStorage.setItem("guestCartItems", JSON.stringify(updateCart));

  return updateCart;
};

export const updateCartAPI = (variantId, newQty) => {
  return api.patch(`/cart/update/${variantId}`, {
    quantity: newQty,
  });
};

export const removeItemFromCart = (variantId) => {
  return api.delete(`/cart/delete/${variantId}`);
};

export const mergeCart = (localCart) => {
  return api.post("/cart/merge", { items: localCart });
};

export const getCartItems = () => {
  return api.get("/cart/all");
};
