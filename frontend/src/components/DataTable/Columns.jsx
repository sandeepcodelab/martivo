import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { Link } from "react-router";

// User columns
export const userColumns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

// Order columns
export const OrderColumns = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
  },
];

// Category columns
export const CategoryColumns = (onEdit, onDelete) => [
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => onEdit(row.original)}
        >
          <Pencil />
        </Button>
        <Button
          size="icon"
          variant="destructive"
          onClick={() => onDelete(row.original)}
        >
          <Trash />
        </Button>
      </div>
    ),
  },
];

// Product columns
export const ProductColumns = [
  // {
  //   accessorKey: "productName",
  //   header: "Product",
  //   cell: ({ row }) => {
  //     const product = row.original;

  //     return (
  //       <Link to={`/admin/products/edit/${product._id}`}>
  //         {product.name}
  //       </Link>
  //     );
  //   },
  // },
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Link
          to={`/admin/products/edit/`}
          className="font-medium hover:text-primary hover:underline"
        >
          {product.productName}
        </Link>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    header: "Actions",
  },
];
