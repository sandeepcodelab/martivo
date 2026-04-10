import { Button } from "@/components/ui/button";
import { Pencil, SquarePen, Trash } from "lucide-react";
import { Link } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// User columns
export const userColumns = (onEdit) => [
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
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const user = row.original;
      const date = new Date(user.createdAt);

      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={() => onEdit(row.original)}
              className="cursor-pointer"
            >
              <SquarePen size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  },
];

// Order columns
export const OrderColumns = (onEdit) => [
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => {
      const order = row.original;

      return <p className="font-bold">#{order._id}</p>;
    },
  },
  {
    accessorKey: "user.name",
    header: "Customer",
  },
  {
    accessorKey: "orderStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original?.orderStatus;

      const statusColors = {
        Pending: "text-yellow-500",
        Processing: "text-blue-500",
        Shipped: "text-purple-500",
        Delivered: "text-green-500",
        Cancelled: "text-red-500",
      };

      return (
        <span className={statusColors[status] || "text-gray-500"}>
          {status || "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Amount",
    cell: ({ getValue }) => <span>₹{getValue()}</span>,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "paymentResult.status",
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentStatus = row.original?.paymentResult?.status;

      const statusColors = {
        Paid: "text-green-500",
        Failed: "text-red-500",
        Pending: "text-yellow-500",
      };

      return (
        <span className={statusColors[paymentStatus] || "text-gray-500"}>
          {paymentStatus || "N/A"}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Order Date",
    cell: ({ row }) => {
      const order = row.original;
      const date = new Date(order.createdAt);

      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },

  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={() => onEdit(row.original._id)}
              className="cursor-pointer"
            >
              <SquarePen size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  },
];

// Category columns
export const CategoryColumns = (onEdit, onDelete) => [
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => {
      const category = row?.original;

      return (
        <div className="flex items-center gap-3">
          <div className="w-[50px] rounded overflow-hidden">
            <img src={category.image} alt="IMG" />
          </div>
          <p className="max-w-[300px] truncate pr-5 font-semibold">
            {category.name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row?.original?.status;
      return status ? (
        <span className="text-green-500 capitalize">active</span>
      ) : (
        <span className="text-red-500 capitalize">inactive</span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const category = row.original;
      const date = new Date(category.createdAt);

      return (
        <span>
          {date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={() => onEdit(row.original)}
              className="cursor-pointer"
            >
              <SquarePen size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDelete(row.original)}
              className="cursor-pointer"
            >
              <Trash size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  },
];

// Product columns
export const ProductColumns = (onDelete) => [
  {
    accessorKey: "title",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Link
          to={`/admin/products/edit/${product._id}`}
          className="flex items-center gap-2 font-medium hover:text-primary hover:underline cursor-pointer"
        >
          <div className="w-[50px] rounded overflow-hidden">
            <img src={product?.thumbnail?.url} alt="Image" />
          </div>
          <p className="max-w-[300px] truncate pr-5">{product.title}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "minPrice",
    header: "Price",
    cell: ({ row }) => {
      const product = row.original;

      if (product?.minPrice && product?.maxPrice) {
        return <span>{`₹${product.minPrice} (₹${product.maxPrice})`}</span>;
      } else {
        return <span></span>;
      }
    },
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row?.original?.variants;

      return (
        <>
          <p>{variants.length} variants</p>
          {variants[0]?.size ? <span>{variants[0]?.size} | </span> : ""}
          {variants[0]?.color ? <span>{variants[0]?.color} | </span> : ""}
          {variants[0]?.salePrice ? <span>₹{variants[0]?.salePrice}</span> : ""}
        </>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const variants = row.original.variants;

      const totalStock = variants?.reduce(
        (totalStock, variant) => totalStock + variant.stock,
        0,
      );
      const outOfStock = variants?.reduce(
        (totalStock, variant) => totalStock + (variant.stock === 0),
        0,
      );

      return (
        <>
          {totalStock > 0 ? <span>{totalStock} units</span> : ""}
          {outOfStock > 0 ? (
            <span className="pl-1 text-red-500">
              ({outOfStock} out of stock)
            </span>
          ) : (
            ""
          )}
        </>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return status ? (
        <span className="text-green-500 capitalize">active</span>
      ) : (
        <span className="text-red-500 capitalize">inactive</span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const product = row.original;
      const date = new Date(product.createdAt);

      return (
        <span>
          {date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-4">
          {/* <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="cursor-pointer">
                <SquarePen size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip> */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="cursor-pointer"
                onClick={() => onDelete(row.original)}
              >
                <Trash size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
];
