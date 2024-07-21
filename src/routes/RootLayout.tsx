import { Outlet } from "react-router-dom";
import APIProvider from "@/context/APIProvider";
import { DialogProvider } from "@/context/DialogProvider";
import { api } from "@/services/api";
import GlobalStateProvider from "@/context/GlobalStateProvider";

export default function RootLayout(): JSX.Element {
  return (
    <APIProvider api={api}>
      <GlobalStateProvider>
        <DialogProvider>
          <Outlet />
        </DialogProvider>
      </GlobalStateProvider>
    </APIProvider>
  );
}
