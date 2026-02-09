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
  const [variants, setVariant] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      const cart = JSON.parse(localStorage.getItem("guestCartItems")) || [];

      if (!cart.length) return;

      try {
        // Fetch variants
        const variantsData = await Promise.all(
          cart.map((item) =>
            axios
              .post(`/api/v1/product-variant/single-variant/${item.variantId}`)
              .then((res) => ({
                variant: res.data?.data.variant,
                quantity: item.quantity,
              })),
          ),
        );

        setVariant(variantsData);
      } catch {}
    };

    fetchCartData();
  }, []);

  console.log("all", variants);

  return (
    <section>
      <Container>
        {/* PAGE HEADER */}
        {/* <div className="mb-6">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <p className="text-sm text-muted-foreground">
            Review your items before checkout
          </p>
        </div> */}

        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* LEFT : CART ITEMS */}
          <div className="w-full md:w-[70%]">
            <Card>
              <CardHeader>
                <CardTitle>Cart ({variants.length} items)</CardTitle>
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
                  <div className="w-[100px] text-right">Price</div>
                  <div className="w-[80px]" />
                </div>

                {/* CART LIST */}
                <div className="px-4 py-4 space-y-4">
                  {variants.map((item) => (
                    <Card key={item._id} className="py-2">
                      <CardContent className="px-2">
                        <div className="flex flex-col md:flex-row gap-4 md:items-center">
                          {/* PRODUCT */}
                          <div className="flex items-center gap-3 md:flex-1">
                            <div className="w-[72px] h-[90px] rounded-lg overflow-hidden">
                              <img
                                src={item.variant.product.thumbnail.url}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div>
                              <div className="font-medium w-30 max-w-40 truncate">
                                {/* {item.variant.product.title} */}
                                jkhdf hdsfkjhskdf sdhfkhskdf sdfkjhskdfm
                                sdfkjsdbhfj
                              </div>
                              <div className="grid text-xs text-muted-foreground">
                                <span>Size: {item.variant.size}</span>
                                <span>Color: {item.variant.color}</span>
                              </div>
                            </div>
                          </div>

                          {/* QTY */}
                          <div className="flex justify-center md:w-[140px]">
                            <div className="flex w-[140px] md:w-[120px]">
                              <Button
                                size="icon"
                                variant="outline"
                                className="rounded-r-none"
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
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                          </div>

                          {/* PRICE */}
                          <div className="flex justify-center md:justify-end items-center gap-1 md:w-[100px] font-semibold">
                            <span className="md:hidden">Price: </span>
                            <span className="flex items-center">
                              <IndianRupee size={14} />
                              {item.variant.price}
                            </span>
                          </div>

                          {/* REMOVE */}
                          <div className="flex justify-end md:w-[40px]">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="p-2 rounded-full text-red-600 hover:text-red-600 cursor-pointer"
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
                  <span>{variants.length}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="flex items-center">
                    <IndianRupee size={13} />
                    {variants.reduce(
                      (t, i) => t + i.variant.price * i.quantity,
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
                    {variants.reduce(
                      (t, i) => t + i.variant.price * i.quantity,
                      0,
                    )}
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
