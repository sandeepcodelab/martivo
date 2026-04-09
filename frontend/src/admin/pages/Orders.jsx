import { useEffect, useState } from "react";
import { OrderColumns } from "../../components/DataTable/Columns";
import { DataTable } from "../../components/DataTable/Data-Table";
import { Input } from "@/components/ui/input";
import { getAllOrders } from "@/services/orderService";
import { notification } from "@/utils/toast";
import { useNavigate, useSearchParams } from "react-router";
import { PaginationList } from "@/components/Pagination/Pagination";

export default function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedValue, setSearchedValue] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const navigate = useNavigate();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  // Fetching Ordres
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders({ search, page, limit });
        setAllOrders(res.data.data.orders);
        setPaginationData(res.data.data.pageInfo);
      } catch (err) {
        notification.error(err.response.data.message);
      }
    };

    fetchOrders();
  }, [search, page, limit]);

  // Set filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        prev.set("search", searchedValue);
        prev.set("page", 1);
        prev.set("limit", 10);
        return prev;
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchedValue]);

  const onEdit = (id) => {
    navigate(`/admin/orders/${id}`);
  };

  return (
    <div className="container mx-auto ">
      <div className="mb-4">
        <Input
          value={searchedValue}
          onChange={(e) =>
            setSearchedValue(e.target.value.trim().toLowerCase())
          }
          placeholder="Search..."
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <DataTable columns={OrderColumns(onEdit)} data={allOrders} />

      {/* Pagination controls */}
      <div className="pt-4">
        <PaginationList
          paginationData={paginationData}
          onPageChange={(newPage) =>
            setSearchParams((prev) => {
              prev.set("page", newPage);
              return prev;
            })
          }
          onLimitChange={(newLimit) =>
            setSearchParams((prev) => {
              prev.set("limit", newLimit);
              return prev;
            })
          }
        />
      </div>
    </div>
  );
}
