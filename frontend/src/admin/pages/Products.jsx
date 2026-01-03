import { ProductColumns } from "../components/Columns";
import { DataTable } from "../components/Data-Table";

export default function ProductsTable() {
  const products = [
    {
      productName: "iPhone 15 Pro",
      category: "Electronics",
      price: 129999,
      stock: 25,
      status: "Active",
      createdAt: "2025-01-01",
    },
    {
      productName: "Samsung Galaxy S24",
      category: "Electronics",
      price: 89999,
      stock: 18,
      status: "Active",
      createdAt: "2024-12-28",
    },
    {
      productName: "Dell Inspiron Laptop",
      category: "Electronics",
      price: 65999,
      stock: 10,
      status: "Active",
      createdAt: "2024-12-20",
    },
    {
      productName: "Men's Cotton T-Shirt",
      category: "Clothing",
      price: 799,
      stock: 120,
      status: "Active",
      createdAt: "2024-12-18",
    },
    {
      productName: "Women's Denim Jacket",
      category: "Clothing",
      price: 2499,
      stock: 45,
      status: "Active",
      createdAt: "2024-12-15",
    },
    {
      productName: "Running Shoes",
      category: "Sports & Fitness",
      price: 3999,
      stock: 60,
      status: "Active",
      createdAt: "2024-12-10",
    },
    {
      productName: "Yoga Mat",
      category: "Sports & Fitness",
      price: 999,
      stock: 80,
      status: "Active",
      createdAt: "2024-12-08",
    },
    {
      productName: "Office Chair",
      category: "Home & Kitchen",
      price: 7499,
      stock: 14,
      status: "Active",
      createdAt: "2024-12-05",
    },
    {
      productName: "Wooden Dining Table",
      category: "Home & Kitchen",
      price: 15999,
      stock: 5,
      status: "Inactive",
      createdAt: "2024-12-02",
    },
    {
      productName: "Non-Stick Cookware Set",
      category: "Home & Kitchen",
      price: 3499,
      stock: 32,
      status: "Active",
      createdAt: "2024-11-30",
    },
    {
      productName: "Fiction Novel",
      category: "Books",
      price: 499,
      stock: 150,
      status: "Active",
      createdAt: "2024-11-28",
    },
    {
      productName: "Self-Help Book",
      category: "Books",
      price: 599,
      stock: 90,
      status: "Active",
      createdAt: "2024-11-25",
    },
    {
      productName: "Bluetooth Headphones",
      category: "Electronics",
      price: 2999,
      stock: 40,
      status: "Active",
      createdAt: "2024-11-22",
    },
    {
      productName: "Smart Watch",
      category: "Electronics",
      price: 6999,
      stock: 22,
      status: "Inactive",
      createdAt: "2024-11-20",
    },
    {
      productName: "Face Care Kit",
      category: "Beauty & Personal Care",
      price: 1299,
      stock: 55,
      status: "Active",
      createdAt: "2024-11-18",
    },
  ];

  return (
    <div className="container mx-auto ">
      <DataTable columns={ProductColumns} data={products} />
    </div>
  );
}
