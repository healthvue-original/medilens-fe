import CaseReportView from "@/components/Reports/CaseReportView";
import { api } from "@/services/api";
import { Case } from "@/services/api/models";
import { ActionFunction, LoaderFunction, useLoaderData } from "react-router";

type LoaderData = {
  caseObj: Case;
};

export const loader: LoaderFunction = async function loader({ params }) {
  if (!params || !params.caseId) {
    return;
  }
  const cases = await api.getCases();

  const caseObj = cases.find((c) => c.id === +params?.caseId);

  return {
    caseObj,
  };
};

export const action: ActionFunction = async function action() {
  return {
    success: true,
  };
};

function Component(): JSX.Element {
  const { caseObj } = useLoaderData() as LoaderData;
  return (
    <section className="reports">
      <CaseReportView caseObj={caseObj} />
    </section>
  );
}

Component.displayName = "ReportsRoute";

export const element = <Component />;
