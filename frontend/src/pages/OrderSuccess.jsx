import Container from "@/components/Container/Container";
import { Button } from "@/components/ui/button";
import { BadgeCheck, CircleCheckBig } from "lucide-react";
import React from "react";
import { useNavigate, useLocation } from "react-router";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold">No order information found.</h2>
      </div>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-center px-4 py-8">
        <div className="bg-card border-1 shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
          <div className="flex justify-center text-green-500 text-6xl mb-4">
            <CircleCheckBig size={60} />
          </div>

          <h1 className="text-2xl font-bold mb-2">
            Order Placed Successfully!
          </h1>

          <p className="mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          <div className="bg-gray-200 dark:bg-neutral-800 text-left p-4 rounded-lg mb-6">
            <p className="mb-2">
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Total Amount:</span> ₹
              {order.totalPrice}
            </p>
            <p>
              <span className="font-semibold">Delivery Address:</span>{" "}
              {order.shippingAddress?.address}, {order.shippingAddress?.city},{" "}
              {order.shippingAddress?.postalCode}
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              className="text-white cursor-pointer"
            >
              Go to Home
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate(`/user/orders/${order._id}`)}
              className="cursor-pointer"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
