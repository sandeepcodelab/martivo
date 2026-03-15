import { ToastContainer, Bounce } from "react-toastify";
import { useTheme } from "../Providers/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

export default function GlobalToast() {
  const { resolvedTheme } = useTheme();

  const isMobile = useIsMobile();

  return (
    <ToastContainer
      position={isMobile ? "top-center" : "bottom-right"}
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      transition={Bounce}
      pauseOnHover
      pauseOnFocusLoss={false}
      toastStyle={{
        width: isMobile ? "80vw" : "350px",
        marginTop: isMobile ? "15px" : "",
      }}
    />
  );
}
