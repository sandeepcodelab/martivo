// "use client";

import { useEffect, useState } from "react";
import { userColumns } from "../components/columns";
import { DataTable } from "../components/Data-Table";

export default function Users() {
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
          email: "tester@example.com",
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
    <div className="container mx-auto ">
      <DataTable columns={userColumns} data={data} />
    </div>
  );
}
