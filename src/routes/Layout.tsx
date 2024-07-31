import "../App.css";
import Header from "@/components/Header/Header";
import LeftNav from "@/components/LeftNav";
import { api } from "@/services/api";
import {
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router";
import { useFetcher } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeProvider";
import { useGlobalState } from "@/context/GlobalStateProvider";
import { User } from "@/services/api/models";
import { useEffect } from "react";
import { UserActions } from "@/context/GlobalStateProvider/reducers/user";
import { Toaster } from "@/components/ui/sonner";

export const loader: LoaderFunction = async () => {
  try {
    const userData = await api.getUserData();
    return userData;
  } catch (err) {
    return redirect("/auth/login");
  }
};

export default function Layout(): JSX.Element {
  const navigation = useNavigation();
  const fetcher = useFetcher();
  const showLoader =
    navigation.state === "loading" ||
    navigation.state === "submitting" ||
    fetcher.state === "submitting" ||
    fetcher.state === "loading";

  const userData = useLoaderData() as User;

  const { dispatch } = useGlobalState();

  useEffect(() => {
    dispatch(UserActions.setUser(userData));
  }, [userData]);

  return (
    <ThemeProvider>
      <section className="flex h-full flex-col">
        <header className="h-14 border-b p-relative">
          <Header />
          <div className={`loader ${showLoader ? "visible" : "invisible"}`}>
            <div className="slider"></div>
            <div className="slider"></div>
            <div className="slider"></div>
          </div>
        </header>
        <section className="flex flex-1 overflow-hidden">
          <aside className="hidden sm:flex w-[72px]">
            <LeftNav />
          </aside>
          <main className="flex-1 overflow-scroll">
            <Outlet />
          </main>
        </section>
        <Toaster position="top-center" />
      </section>
    </ThemeProvider>
  );
}
