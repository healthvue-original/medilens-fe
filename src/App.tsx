import Header from "./components/Header/Header";
import LeftNav from "./components/LeftNav";
import { Outlet } from "react-router-dom";
import APIProvider from "./context/APIProvider";
import { API } from "./services/api/types";
import { ThemeProvider } from "./context/ThemeProvider";
import { DialogProvider } from "./context/DialogProvider";

function App({ api }: { api: API }): JSX.Element {
  return (
    <ThemeProvider>
      <APIProvider api={api}>
        <DialogProvider>
          <section className="flex h-full flex-col">
            <header className="h-14 border-b">
              <Header />
            </header>
            <section className="flex flex-1 overflow-hidden">
              <aside className="hidden sm:flex w-[72px]">
                <LeftNav />
              </aside>
              <main className="flex-1 overflow-scroll">
                <Outlet />
              </main>
            </section>
          </section>
        </DialogProvider>
      </APIProvider>
    </ThemeProvider>
  );
}

export default App;
