import SpecimenView from "@/components/SpecimenView";
import { api } from "@/services/api";
import { Specimen } from "@/services/api/models";
import { ActionFunction, LoaderFunction, useLoaderData } from "react-router";

type LoaderData = {
  specimens: Specimen[];
};

export const loader: LoaderFunction = async function loader({ params }) {
  if (!params.caseId) {
    return;
  }
  const specimens = await api.getSpecimens({
    caseId: +params.caseId,
  });

  return {
    specimens,
  };
};

export const action: ActionFunction = async function action() {
  return {
    success: true,
  };
};

function Component(): JSX.Element {
  const { specimens } = useLoaderData() as LoaderData;
  return (
    <section className="specimens p-8 h-full flex flex-col">
      <SpecimenView specimens={specimens} />
    </section>
  );
}

Component.displayName = "SpecimensRoute";

export const element = <Component />;
