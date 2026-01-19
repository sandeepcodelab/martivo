import { useEffect, useState } from "react";
import { userColumns } from "../components/Columns";
import { DataTable } from "../components/Data-Table";
import { Input } from "@/components/ui/input";

export default function Users() {
  const [searchValue, setSearchValue] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate API call
    const getData = async () => {
      const result = [
        {
          id: "728ed52f",
          name: "Tester First",
          email: "m@example.com",
          role: "user",
        },
        {
          id: "728ed52f",
          name: "Tester",
          email: "m@example.com",
          role: "user",
        },
        {
          id: "728ed52f",
          name: "Tester",
          email: "m@example.com",
          role: "user",
        },
        {
          id: "728ed52f",
          name: "Tester",
          email: "m@example.com",
          role: "user",
        },
        {
          id: "728ed52f",
          name: "Tester",
          email: "m@example.com",
          role: "user",
        },
        {
          id: "728ed52f",
          name: "Tester",
          email: "m@example.com",
          role: "user",
        },
        {
          id: "728ed52f",
          name: "Tester",
          email: "m@example.com",
          role: "user",
        },
        {
          id: "728ed52f",
          name: "Tester",
          email: "m@example.com",
          role: "user",
        },
        {
          id: "728ed52f",
          name: "Tester",
          email: "m@example.com",
          role: "user",
        },
        {
          id: "728ed52f",
          name: "Tester",
          email: "m@example.com",
          role: "user",
        },
        {
          id: "728ed52f",
          name: "Tester Last",
          email: "m@example.com",
          role: "user",
        },
      ];

      setData(result);
    };

    getData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="max-w-sm"
        />
      </div>
      <DataTable columns={userColumns} data={data} />
    </div>
  );
}
