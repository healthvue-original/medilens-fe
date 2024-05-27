import "./App.css";
import Header from "./components/Header/Header";
import LeftNav from "./components/LeftNav";
import { Outlet } from "react-router-dom";
import APIProvider from "./context/APIProvider";
import { API } from "./services/api/types";

function App({ api }: { api: API }): JSX.Element {
  return (
    <APIProvider api={api}>
      <section className="flex h-full flex-col">
        <header className="h-14 border-b">
          <Header />
        </header>
        <section className="flex flex-1 overflow-hidden">
          <aside className="flex w-[72px]">
            <LeftNav />
          </aside>
          <main className="flex-1 overflow-scroll">
            <Outlet />
          </main>
        </section>
      </section>
    </APIProvider>
  );
}

export default App;
