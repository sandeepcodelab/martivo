import { useEffect, useState } from "react";
import { userColumns } from "../../components/DataTable/Columns";
import { DataTable } from "../../components/DataTable/Data-Table";
import { Input } from "@/components/ui/input";
import { getAllUsers } from "@/services/authService";
import { notification } from "@/utils/toast";
import { useNavigate, useSearchParams } from "react-router";

export default function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedValue, setSearchedValue] = useState("");
  const [allusers, setAllUsers] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const navigate = useNavigate();

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers({ search, page, limit });
        setAllUsers(res.data.data.users);
        setPaginationData(res.data.data.pageInfo);
      } catch (err) {
        notification.error(err.response.data.message);
      }
    };

    fetchUsers();
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

  // Edit handler
  const onEdit = (row) => {
    const userId = row._id;
    navigate(`/admin/users/edit/${userId}`);
  };

  // Delete handler
  const onDelete = (row) => {
    console.log(row);
  };

  return (
    <div className="container mx-auto">
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
      <DataTable columns={userColumns(onEdit, onDelete)} data={allusers} />
    </div>
  );
}
