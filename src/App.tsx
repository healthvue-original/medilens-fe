import "./App.css";
import Header from "./components/Header/Header";
import LeftNav from "./components/LeftNav";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function App(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location?.pathname === "/") {
      navigate("/home");
    }
  }, []);
  return (
    <section className="flex h-full flex-col">
      <header className="h-14 border-b">
        <Header />
      </header>
      <section className="flex flex-1">
        <aside className="flex w-[72px]">
          <LeftNav />
        </aside>
        <main className="flex-1">
          <Outlet />
        </main>
      </section>
    </section>
  );
}

export default App;
