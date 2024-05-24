import "./App.css";
import Header from "./components/Header/Header";
import LeftNav from "./components/LeftNav";

function App(): JSX.Element {
  return (
    <section className="flex h-full flex-col">
      <header className="h-14 border-b">
        <Header />
      </header>
      <section className="flex flex-1">
        <aside className="flex w-[72px]">
          <LeftNav />
        </aside>
        <main className="flex-1"></main>
      </section>
    </section>
  );
}

export default App;
