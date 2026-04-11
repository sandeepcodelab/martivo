"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  IndianRupee,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getAllOrders } from "@/services/orderService";

// ---------------- DATA ----------------

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 7000 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 8000 },
];

const ordersData = [
  { name: "Mon", orders: 40 },
  { name: "Tue", orders: 55 },
  { name: "Wed", orders: 30 },
  { name: "Thu", orders: 70 },
  { name: "Fri", orders: 90 },
  { name: "Sat", orders: 120 },
  { name: "Sun", orders: 80 },
];

const orderStatus = [
  { name: "Processing", value: 100, color: "oklch(0.488 0.243 264.376)" },
  { name: "Delivered", value: 400, color: "oklch(0.696 0.17 162.48)" },
  { name: "Pending", value: 200, color: "oklch(0.769 0.188 70.08)" },
  { name: "Shipped", value: 100, color: "oklch(0.627 0.265 303.9)" },
  { name: "Cancelled", value: 100, color: "oklch(0.577 0.245 27.325)" },
];

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-700",
  Processing: "bg-blue-200 text-blue-700",
  Shipped: "bg-purple-200 text-purple-700",
  Delivered: "bg-green-200 text-green-700",
  Cancelled: "bg-red-200 text-red-700",
};

// ---------------- COMPONENT ----------------

export default function Dashboard() {
  const [roders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        setOrders(res.data.data.orders);
      } catch (err) {
        notification.error(err.response.data.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Revenue"
            value="₹45,231"
            icon={<IndianRupee />}
            growth="+12%"
          />
          <StatCard
            title="Orders"
            value="1,230"
            icon={<ShoppingCart />}
            growth="+8%"
          />
          <StatCard
            title="Customers"
            value="845"
            icon={<Users />}
            growth="+5%"
          />
          <StatCard
            title="Products"
            value="320"
            icon={<Package />}
            growth="+2%"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip labelStyle={{ color: "var(--primary)" }} />
                  <Bar dataKey="revenue" fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={orderStatus}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill={orderStatus.color}
                  >
                    {orderStatus.map((status) => (
                      <Cell key={status.color} fill={status.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Orders Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ordersData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip labelStyle={{ color: "var(--primary)" }} />
                <Line type="monotone" dataKey="orders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {roders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-muted transition"
                    >
                      <td className="py-2">#{order._id}</td>
                      <td>{order.user.name}</td>
                      <td>
                        <Badge
                          variant="outline"
                          className={statusColors[order.orderStatus]}
                        >
                          {order.orderStatus}
                        </Badge>
                      </td>
                      <td>₹{order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Hoodie", "Sneakers", "Jacket"].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item}</span>
                    <span>{80 + i * 20} sales</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full">
                    <div className="h-2 rounded-full bg-primary w-2/3"></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ---------------- STAT CARD ----------------

function StatCard({ title, value, icon, growth }) {
  return (
    <Card className="flex flex-row flex-wrap items-center justify-between p-4 rounded-2xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-muted text-foreground">{icon}</div>

        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h2 className="text-xl font-semibold tracking-tight">{value}</h2>
        </div>
      </div>

      <div className="flex items-center text-sm text-primary">
        <TrendingUp className="w-4 h-4 mr-1" />
        <span className="font-medium">{growth}</span>
      </div>
    </Card>
  );
}
