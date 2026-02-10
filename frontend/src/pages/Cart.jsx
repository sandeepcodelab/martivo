import Container from "@/components/Container/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Trash2, X, ArrowRight, Minus, Plus, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      const cart = JSON.parse(localStorage.getItem("guestCartItems")) || [];

      if (!cart.length) return;

      const variantIds = cart.map((item) => item.variantId);

      try {
        // Fetch variants

        const res = await axios.post(`/api/v1/product-variant/bulk/`, {
          variantIds,
        });

        const mergedCart = res.data.data.variants.map((variant) => {
          const matchedItem = cart.find(
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
      }
    };

    fetchCartData();
  }, []);

  // Update quantity
  const updateQuantity = (variantId, type) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id !== variantId) return item;

        let newQty = item.quantity;

        if (type === "PLUS") {
          newQty = item.quantity + 1;
        }
        if (type === "MINUS") {
          newQty = item.quantity - 1;
        }

        if (newQty < 1) return item;

        if (item.stock && newQty > item.stock) return item;

        return {
          ...item,
          quantity: newQty,
        };
      }),
    );
  };

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
                <CardAction>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-sm text-red-600 hover:text-red-600 cursor-pointer"
                  >
                    <X size={16} />
                    Clear cart
                  </Button>
                </CardAction>
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
                              {item.price}
                            </div>
                          </div>

                          {/* 🔹 REMOVE (desktop aligned) */}
                          <div className="flex justify-end md:justify-start md:w-[40px]">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="p-2 rounded-full text-red-600 hover:text-red-600"
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
