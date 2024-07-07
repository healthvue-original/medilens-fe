import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";
import { useEffect } from "react";

function BootLoader() {
  useEffect(
    () => () => {
      const loader = document.getElementById("boot-loader");
      if (!loader) return;
      loader.style.display = "none";
    },
    []
  );
  return <></>;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} fallbackElement={<BootLoader />} />
  // </React.StrictMode>
);
