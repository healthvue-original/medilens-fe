import { Outlet } from "react-router-dom";
import APIProvider from "@/context/APIProvider";
import { DialogProvider } from "@/context/DialogProvider";
import { api } from "@/services/api";

export default function RootLayout(): JSX.Element {
  return (
    <APIProvider api={api}>
      <DialogProvider>
        <Outlet />
      </DialogProvider>
    </APIProvider>
  );
}
