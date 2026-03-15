import { ToastContainer, Bounce } from "react-toastify";
import { useTheme } from "../Providers/ThemeProvider";
// import { useTheme } from "next-themes";

export default function GlobalToast() {
  const { resolvedTheme } = useTheme();

  return (
    <ToastContainer
      position={window.innerWidth < 600 ? "top-center" : "bottom-right"}
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
        width: window.innerWidth < 600 ? "80vw" : "350px",
        marginTop: window.innerWidth < 600 ? "15px" : "",
      }}
    />
  );
}
