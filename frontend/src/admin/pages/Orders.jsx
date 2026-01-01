import { OrderColumns } from "../components/columns";
import { DataTable } from "../components/Data-Table";

export default function Orders() {
  const orderData = [
    {
      orderId: "ORD-1001",
      customer: "Rahul Sharma",
      status: "Pending",
      totalAmount: 2499,
      paymentMethod: "UPI",
      paymentStatus: "Paid",
      orderDate: "2025-01-02",
    },
    {
      orderId: "ORD-1002",
      customer: "Ananya Verma",
      status: "Shipped",
      totalAmount: 4599,
      paymentMethod: "Credit Card",
      paymentStatus: "Paid",
      orderDate: "2025-01-01",
    },
    {
      orderId: "ORD-1003",
      customer: "Amit Kumar",
      status: "Delivered",
      totalAmount: 1299,
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      orderDate: "2024-12-30",
    },
    {
      orderId: "ORD-1004",
      customer: "Priya Singh",
      status: "Cancelled",
      totalAmount: 3199,
      paymentMethod: "Debit Card",
      paymentStatus: "Refunded",
      orderDate: "2024-12-29",
    },
    {
      orderId: "ORD-1005",
      customer: "Neha Gupta",
      status: "Delivered",
      totalAmount: 7999,
      paymentMethod: "Net Banking",
      paymentStatus: "Paid",
      orderDate: "2024-12-28",
    },
  ];

  return (
    <div className="container mx-auto ">
      <DataTable columns={OrderColumns} data={orderData} />
    </div>
  );
}
