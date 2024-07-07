import { api } from "@/services/api";
import { LoaderFunction, Outlet, redirect } from "react-router";

export const loader: LoaderFunction = async function loader() {
  const isAuthenticated = await api.isAuthenticated();
  if (isAuthenticated) {
    return redirect("/");
  }
  return {};
};

function Component(): JSX.Element {
  return (
    <section>
      Auth Page <Outlet />
    </section>
  );
}

Component.displayName = "AuthRoute";

export const element = <Component />;
