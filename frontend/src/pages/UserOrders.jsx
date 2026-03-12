import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Container from "@/components/Container/Container";
import { getAllOrders } from "@/services/orderService";
import { notification } from "@/utils/toast";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await getAllOrders();
        setOrders(res.data.data.orders);
      } catch (err) {
        notification.error("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusColors = {
    Pending: "bg-gray-200 text-gray-800",
    Processing: "bg-yellow-200 text-yellow-800",
    Shipped: "bg-blue-200 text-blue-800",
    Delivered: "bg-green-200 text-green-800",
    Cancelled: "bg-red-200 text-red-800",
  };

  const statusColor = (status) =>
    statusColors[status] || "bg-gray-200 text-gray-800";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-70">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Container>
      <div className="py-8">
        {/* Header */}

        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl font-semibold">My Orders</h1>
            <p className="text-sm text-muted-foreground">
              View your order history
            </p>
          </div>

          {/* <Input placeholder="Search order ID..." className="max-w-sm" /> */}
        </div>

        {/* Orders */}

        <div className="space-y-5">
          {orders.map((order) => {
            const firstItem = order.orderItems[0];
            const remaining = order.orderItems.length - 1;

            const orderDate = new Date(order.createdAt);

            return (
              <Card key={order._id} className="p-6 hover:shadow-md transition">
                <CardContent className="p-0">
                  {/* Top Row */}

                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <p className="font-semibold">Order #{order._id}</p>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${statusColor(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  {/* Main Row */}

                  <div className="grid grid-cols-1 md:grid-cols-4 md:flex-row md:items-center md:justify-between gap-6">
                    {/* Product */}

                    <div className="flex items-center gap-4">
                      <img
                        src={firstItem.product?.thumbnail.url}
                        className="w-16 h-16 rounded-md border object-cover"
                      />

                      <div className="min-w-0">
                        <p className="font-medium truncate">
                          {firstItem.product?.title}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Qty: {firstItem.quantity}
                        </p>

                        {remaining > 0 && (
                          <p className="text-sm text-muted-foreground">
                            +{remaining} more items
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Order Info */}
                    <div className="grid place-items-center">
                      <p className="text-muted-foreground">Placed</p>
                      <p className="font-medium">
                        {orderDate.toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="grid place-items-center">
                      <p className="text-muted-foreground">Payment Method</p>
                      <p className="font-medium">{order.paymentMethod}</p>
                    </div>

                    <div className="grid place-items-center">
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-semibold">₹{order.totalPrice}</p>
                    </div>

                    {/* Button */}
                    {/* <Button variant="outline">View Details</Button> */}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
