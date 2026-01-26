import MinimalHeader from "@/components/Header/MinimalHeader";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <>
      <MinimalHeader />
      <Outlet />
    </>
  );
}
