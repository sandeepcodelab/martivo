import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
} from "@/services/orderService";
import { notification } from "@/utils/toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";

export default function UserOrderDetails() {
  const params = useParams();
  const [order, setOrder] = useState({});
  const [loader, setLoader] = useState(false);

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoader(true);

        const res = await getOrderById(params.id);
        setOrder(res.data.data.order);
      } catch (err) {
        notification.error(err.response.data.message);
      } finally {
        setLoader(false);
      }
    };

    fetchOrderDetails();
  }, []);

  const statusColors = {
    Pending: "bg-yellow-200 text-yellow-700",
    Processing: "bg-blue-200 text-blue-700",
    Shipped: "bg-purple-200 text-purple-700",
    Delivered: "bg-green-200 text-green-700",
    Cancelled: "bg-red-200 text-red-700",
  };

  const paymentStatusColors = {
    Pending: "bg-yellow-700 text-yellow-100",
    Paid: "bg-green-700 text-green-100",
    Failed: "bg-red-700 text-red-100",
  };

  if (loader) {
    return (
      <div className="flex justify-center items-center h-70">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 grid gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Order #{order._id}</h1>
        <div
          className={`px-3 py-1 text-sm font-medium rounded-full inline-flex items-center ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-700"}`}
        >
          {order.orderStatus}
        </div>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {order.orderItems?.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="w-[50px] overflow-hidden rounded">
                  <img src={item.product.thumbnail.url} alt="IMG" />
                </div>
                <div>
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Color: {item.variant.color}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Size: {item.variant.size} | Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <p>₹{item.priceAtPurchase}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Shipping Info */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Name:</strong> {order.shippingAddress?.fullName}
          </p>
          <p>
            <strong>Phone:</strong> {order.shippingAddress?.phone}
          </p>
          <p>
            <strong>Address:</strong> {order.shippingAddress?.address}
          </p>
          <p>
            <strong>City:</strong> {order.shippingAddress?.city},{" "}
            <strong>Postal Code:</strong> {order.shippingAddress?.postalCode}
          </p>
          <p>{order.shippingAddress?.country}</p>

          {/* Payment Info */}
          <p className="font-semibold pt-8 pb-3">Payment Info</p>
          <p>
            <strong>Method:</strong> {order.paymentMethod}
          </p>
          <p className="flex gap-2">
            <strong>Status:</strong>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full inline-flex items-center ${paymentStatusColors[order.paymentResult?.status]}`}
            >
              {order.paymentResult?.status}
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Items Price</span>
            <span>₹{order.totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹{order?.shippingPrice || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₹{order?.taxPrice || 0}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{order.totalPrice}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
