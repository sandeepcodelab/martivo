import React, { useEffect, useState } from "react";
import Container from "@/components/Container/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard, Truck, IndianRupee } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  clearCart,
  createOrder,
  getCartWithVariants,
} from "@/services/cartService";
import { notification } from "@/utils/toast";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/ui/spinner";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shippingPrice = 0;
  // const taxPrice = Math.round((itemsPrice * 5) / 100);
  const taxPrice = 0;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // Fetch cart Items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);

        const res = await getCartWithVariants();
        setCartItems(res);

        if (!res.length) {
          navigate("/cart");
        }
      } catch (err) {
        console.log(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Submit checkout form
  const onSubmit = async (formData) => {
    if (!paymentMethod) return;

    const checkoutPayload = { ...formData, paymentMethod };

    try {
      setProcessing(true);

      const res = await createOrder(checkoutPayload);

      const cartRes = await clearCart();
      console.log(cartRes.data.data.cart.items.length);

      // navigate("/order-success", { state: { order: res.data.data } });
    } catch (err) {
      if (err.response.status === 400) {
        notification.error(err.response.data.message);
      }
      if (err.response.status === 500) {
        notification.error(err.response.data.message);
      }
    } finally {
      setProcessing(false);
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

  return (
    <Container>
      <div className="min-h-screen flex flex-wrap-reverse md:flex-nowrap gap-6 p-4 md:p-6 pb-24 md:pb-6">
        <div className="w-full md:w-3/5">
          <Card className="shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="pb-2">Full Name</Label>
                    <Input
                      placeholder="Enter your full name"
                      {...register("fullName", {
                        required: "Full Name is required",
                      })}
                    />
                    {errors.fullName && (
                      <span className="text-red-600 text-sm">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label className="pb-2">Phone</Label>
                    <Input
                      placeholder="10-digit phone number"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Enter a valid phone number",
                        },
                      })}
                    />
                    {errors.phone && (
                      <span className="text-red-600 text-sm">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="my-6">
                  <Label className="pb-2">Address</Label>
                  <Input
                    placeholder="Street address"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                  {errors.address && (
                    <span className="text-red-600 text-sm">
                      {errors.address.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="pb-2">City</Label>
                    <Input
                      placeholder="City"
                      {...register("city", { required: "City is required" })}
                    />
                    {errors.city && (
                      <span className="text-red-600 text-sm">
                        {errors.city.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label className="pb-2">State</Label>
                    <Input
                      placeholder="State"
                      {...register("state", { required: "State is required" })}
                    />
                    {errors.state && (
                      <span className="text-red-600 text-sm">
                        {errors.state.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label className="pb-2">Postal Code</Label>
                    <Input
                      placeholder="Postal code"
                      {...register("postalCode", {
                        required: "Postal code is required",
                      })}
                    />
                    {errors.postalCode && (
                      <span className="text-red-600 text-sm">
                        {errors.postalCode.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Payment Section */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Card Payment */}
                    <div
                      onClick={() => setPaymentMethod("Card")}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                        paymentMethod === "Card"
                          ? "border-primary ring-2 ring-primary"
                          : "border-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5" />
                        <div>
                          <p className="font-medium">Credit / Debit Card</p>
                          <p className="text-sm text-muted-foreground">
                            Pay securely using your card
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Cash on Delivery */}
                    <div
                      onClick={() => setPaymentMethod("COD")}
                      className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                        paymentMethod === "COD"
                          ? "border-primary ring-2 ring-primary"
                          : "border-muted"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5" />
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">
                            Pay when your order arrives
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-2/5">
          <Card className="shadow-sm rounded-2xl md:sticky md:top-20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShoppingCart className="w-5 h-5" /> Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-md my-2"
                >
                  <div className="grid">
                    <span className="w-full max-w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.product.title} × {item.quantity}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.color} - {item.size}
                    </span>
                  </div>
                  <div>
                    <span className="flex items-center">
                      <IndianRupee size={14} />
                      {item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between text-sm">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="flex items-center">
                  <IndianRupee size={13} />
                  {itemsPrice}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="flex items-center">
                  <IndianRupee size={13} />
                  {shippingPrice}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span className="flex items-center">
                  <IndianRupee size={13} />
                  {taxPrice}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span className="flex items-center">
                  <IndianRupee size={13} strokeWidth={3} />
                  {totalPrice}
                </span>
              </div>

              <Button
                form="checkout-form"
                className="w-full mt-4 text-white cursor-pointer hidden md:block"
                disabled={processing}
              >
                {processing ? (
                  <div className="flex justify-center items-center gap-4">
                    <Spinner /> Order processing
                  </div>
                ) : (
                  "Place Order"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Sticky Button */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg p-4 md:hidden">
          <Button
            form="checkout-form"
            className="w-full text-white"
            disabled={processing}
          >
            {processing ? (
              <div className="flex items-center gap-4">
                <Spinner /> Order processing
              </div>
            ) : (
              `₹ ${totalPrice} • Place Order`
            )}
          </Button>
        </div>
      </div>
    </Container>
  );
}
