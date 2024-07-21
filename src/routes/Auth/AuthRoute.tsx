import { api } from "@/services/api";
import { LoaderFunction, Outlet, redirect } from "react-router";

export const loader: LoaderFunction = async function loader({ request }) {
  try {
    await api.getUserData();
    return redirect("/");
  } catch (err) {
    console.error(err);
    const url = new URL(request.url);

    if (url.pathname === "/auth" || url.pathname === "/auth/") {
      return redirect("/auth/login");
    }
  }
  return {};
};

function Component(): JSX.Element {
  return (
    <section className=" h-full bg-secondary">
      <div className="h-full flex items-center justify-center">
        <div className=" h-[680px] w-[520px] bg-white rounded-lg">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

Component.displayName = "AuthRoute";

export const element = <Component />;
