import Home from "@/components/Home";
import { LoaderFunction } from "react-router";

export const loader: LoaderFunction = async function loader() {
  return {};
};

function Component(): JSX.Element {
  return (
    <section>
      <Home />
    </section>
  );
}

Component.displayName = "HomeRoute";

export const element = <Component />;
