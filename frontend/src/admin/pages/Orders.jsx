import { useState } from "react";
import { OrderColumns } from "../components/Columns";
import { DataTable } from "../components/Data-Table";
import { Input } from "@/components/ui/input";

export default function Orders() {
  const [searchValue, setSearchValue] = useState();

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
      <div className="mb-4">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="max-w-sm"
        />
      </div>
      <DataTable columns={OrderColumns} data={orderData} />
    </div>
  );
}
