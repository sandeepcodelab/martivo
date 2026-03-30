import Container from "@/components/Container/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AuthContext from "@/contexts/AuthContext";
import {
  getCartWithVariants,
  getGuestCartWithVariants,
  removeItemFromCart,
  updateCartAPI,
} from "@/services/cartService";
import { notification } from "@/utils/toast";
import { Trash2, ArrowRight, Minus, Plus, IndianRupee } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export default function Cart() {
  const debounceRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const { updateCartCount, userData } = useContext(AuthContext);

  // Load cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);

        let cart;

        if (userData?.isAuthenticated) {
          cart = await getCartWithVariants();
        } else {
          cart = await getGuestCartWithVariants();
        }

        setCartItems(cart);
      } catch (error) {
        notification.error("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userData]);

  // Sync cart to backend
  const syncCartToBackend = (variantId, newQty) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      try {
        await updateCartAPI(variantId, newQty);
      } catch (err) {
        // console.log(err.response?.data);
        notification.error("Failed to update quantity.");
      }
    }, 500);
  };

  // Update quantity
  const updateQuantity = (variantId, type) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id !== variantId) return item;

        const calculate = type === "PLUS" ? 1 : -1;
        const newQty = item.quantity + calculate;

        if (newQty < 1) return item;
        if (item.stock && newQty > item.stock) return item;

        if (userData.isAuthenticated) {
          syncCartToBackend(variantId, newQty);
        } else {
          const guestCart = prev.map((item) =>
            item._id === variantId
              ? { variantId: item._id, quantity: newQty }
              : { variantId: item._id, quantity: item.quantity },
          );
          localStorage.setItem("guestCartItems", JSON.stringify(guestCart));
        }

        return { ...item, quantity: newQty };
      }),
    );
  };

  // Remove Item
  const removeCartItem = async (variantId) => {
    const previousItems = cartItems;

    setCartItems((prev) => prev.filter((item) => item._id !== variantId));

    try {
      if (userData.isAuthenticated) {
        const res = await removeItemFromCart(variantId);
        updateCartCount(res.data?.data?.cart?.items?.length);
      } else {
        const updateCartItems = previousItems
          .filter((item) => item._id !== variantId)
          .map((item) => ({ variantId: item._id, quantity: item.quantity }));

        localStorage.setItem("guestCartItems", JSON.stringify(updateCartItems));
        updateCartCount();
      }
    } catch (err) {
      setCartItems(previousItems);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-70">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Empty cart state
  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center h-70 gap-4">
        <p className="text-lg font-medium">Your cart is empty</p>
        <Link to="/products">
          <Button className="text-white cursor-pointer">Shop Now</Button>
        </Link>
      </div>
    );
  }

  // Items in cart state
  return (
    <section>
      <Container>
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* LEFT : CART ITEMS */}
          <div className="w-full md:w-[70%]">
            <Card>
              <CardHeader>
                <CardTitle>Cart ({cartItems.length} items)</CardTitle>
                <CardDescription>
                  Review your items before checkout
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                {/* DESKTOP HEADER */}
                <div className="hidden md:flex items-center mx-4 pb-2 border-b text-sm font-medium text-muted-foreground">
                  <div className="flex-1">Product</div>
                  <div className="w-[140px] text-center">Quantity</div>
                  <div className="w-[100px] text-center">Price</div>
                  <div className="w-[70px]" />
                </div>

                {/* CART LIST */}
                <div className="px-4 py-4 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item._id} className="py-2">
                      <CardContent className="px-2">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          {/* 🔹 GROUP 1 : IMAGE + TITLE */}
                          <div className="flex items-center gap-3 md:flex-1 min-w-0">
                            <div className="w-[72px] h-[90px] rounded-lg overflow-hidden shrink-0">
                              <img
                                src={item.product.thumbnail.url}
                                alt="Image"
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                                {item.product.title}
                              </div>

                              <div className="grid text-xs text-muted-foreground">
                                <span>Size: {item.size}</span>
                                <span>Color: {item.color}</span>
                              </div>
                            </div>
                          </div>

                          {/* 🔹 GROUP 2 : QTY + PRICE (parallel on mobile) */}
                          <div className="flex items-center justify-between md:justify-start gap-4 md:gap-0">
                            {/* Quantity */}
                            <div className="md:w-[140px] flex justify-start md:justify-center">
                              <div className="flex w-[120px]">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="rounded-r-none"
                                  disabled={item.quantity <= 1 ? true : false}
                                  onClick={() =>
                                    updateQuantity(item._id, "MINUS")
                                  }
                                >
                                  <Minus size={14} />
                                </Button>

                                <Input
                                  readOnly
                                  value={item.quantity}
                                  className="text-center rounded-none h-9"
                                />

                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="rounded-l-none"
                                  disabled={
                                    item.quantity >= item.stock ? true : false
                                  }
                                  onClick={() =>
                                    updateQuantity(item._id, "PLUS")
                                  }
                                >
                                  <Plus size={14} />
                                </Button>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="md:w-[100px] text-right font-semibold flex justify-center items-center">
                              <IndianRupee size={14} />
                              {item.salePrice * item.quantity}
                            </div>
                          </div>

                          {/* 🔹 REMOVE (desktop aligned) */}
                          <div className="flex justify-end md:justify-start md:w-[40px]">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="p-2 rounded-full text-red-600 hover:text-red-600"
                              onClick={() => removeCartItem(item._id)}
                            >
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT : SUMMARY */}
          <div className="w-full md:w-[30%]">
            <Card className="md:sticky md:top-22">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="flex items-center">
                    <IndianRupee size={13} />
                    {cartItems.reduce(
                      (t, i) => t + i.salePrice * i.quantity,
                      0,
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>

                <hr />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="flex items-center">
                    <IndianRupee size={16} />
                    {cartItems.reduce(
                      (t, i) => t + i.salePrice * i.quantity,
                      0,
                    )}
                  </span>
                </div>

                <Link to="/checkout">
                  <Button className="hidden md:flex w-full text-white cursor-pointer">
                    Proceed to Checkout <ArrowRight />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Mobile sticky button */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg p-4 md:hidden">
              <Link to="/checkout">
                <Button className="w-full text-white cursor-pointer">
                  Proceed to Checkout <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
