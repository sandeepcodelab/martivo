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
import axios from "axios";
import { Trash2, X, ArrowRight, Minus, Plus, IndianRupee } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const { updateCartCount, userData, token } = useContext(AuthContext);

  // Cart for login user
  useEffect(() => {
    if (!userData.isAuthenticated) return;

    const fetchCartData = async () => {
      try {
        setLoading(true);

        const cartRes = await axios.get("/api/v1/cart/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const cartData = cartRes?.data?.data?.cart?.items || [];

        if (!cartData.length) return;

        const variantIds = cartData.map((item) => item.variantId);

        // Fetch variants
        const res = await axios.post(`/api/v1/product-variant/bulk/`, {
          variantIds,
        });

        const mergedCart = res.data.data.variants.map((variant) => {
          const matchedItem = cartData.find(
            (item) => item.variantId === variant._id,
          );

          return {
            ...variant,
            quantity: matchedItem?.quantity ?? 1,
          };
        });

        setCartItems(mergedCart);
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [userData]);

  // localCart (without login)
  useEffect(() => {
    if (userData.isAuthenticated) return;

    const fetchCartData = async () => {
      try {
        setLoading(true);

        const localCart =
          JSON.parse(localStorage.getItem("guestCartItems")) || [];

        if (!localCart.length) return;

        const variantIds = localCart.map((item) => item.variantId);

        // Fetch variants
        const res = await axios.post(`/api/v1/product-variant/bulk/`, {
          variantIds,
        });

        const mergedCart = res.data.data.variants.map((variant) => {
          const matchedItem = localCart.find(
            (item) => item.variantId === variant._id,
          );

          return {
            ...variant,
            quantity: matchedItem?.quantity ?? 1,
          };
        });

        setCartItems(mergedCart);
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  // Update Cart
  useEffect(() => {
    if (userData.isAuthenticated) {
      // console.log("cartItems : ", cartItems);
    } else {
      localStorage.setItem(
        "guestCartItems",
        JSON.stringify(
          cartItems.map((item) => ({
            variantId: item._id,
            quantity: item.quantity,
          })),
        ),
      );
    }

    // Update globle cart
    updateCartCount();
  }, [cartItems]);

  // Update quantity
  const updateQuantity = (variantId, type) => {
    // Current cart
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id !== variantId) return item;

        let newQty = item.quantity;

        const calculte = type === "PLUS" ? 1 : -1;

        newQty = item.quantity + calculte;

        if (newQty < 1) return item;

        if (item.stock && newQty > item.stock) return item;

        return {
          ...item,
          quantity: newQty,
        };
      }),
    );
  };

  // Remove Item
  const removeCartItem = (variantId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== variantId));
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
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                                {/* {item.variant.product.title} */}
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit.
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
                              {item.price * item.quantity}
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
                    {cartItems.reduce((t, i) => t + i.price * i.quantity, 0)}
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
                    {cartItems.reduce((t, i) => t + i.price * i.quantity, 0)}
                  </span>
                </div>

                <Link to="/checkout">
                  <Button className="w-full text-white cursor-pointer">
                    Proceed to Checkout <ArrowRight />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
