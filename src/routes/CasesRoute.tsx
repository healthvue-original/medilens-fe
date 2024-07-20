import { CasesTableView } from "@/components/Cases/CasesTableView";
import { api } from "@/services/api";
import { Case, Hospital, Patient } from "@/services/api/models";
import { ActionFunction, LoaderFunction, useLoaderData } from "react-router";

type LoaderData = {
  patients: Patient[];
  cases: Case[];
  hospitals: Hospital[];
};

export const loader: LoaderFunction = async function loader() {
  const [patients, cases, hospitals] = await Promise.all([
    api.getPatients(),
    api.getCases(),
    api.getHospitals(),
  ]);
  return {
    patients,
    cases,
    hospitals,
  };
};

export const action: ActionFunction = async function action({ request }) {
  const formData = await request.formData();

  const patient_id = formData.get("patient_id");
  const hospital_id = formData.get("hospital_id");
  if (!patient_id || !hospital_id) {
    return {
      success: false,
      formErrors: {
        patient_id: "Patient ID missing",
      },
    };
  }

  const payload = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    patient_id: +patient_id,
    hospital_id: +hospital_id,
    created_by_id: 1,
  };

  await api.addCase(payload);
  return {
    success: true,
  };
};

function Component(): JSX.Element {
  const { patients, cases, hospitals } = useLoaderData() as LoaderData;
  return (
    <section className="cases p-8 h-full flex flex-col">
      <CasesTableView patients={patients} cases={cases} hospitals={hospitals} />
    </section>
  );
}

Component.displayName = "CasesRoute";

export const element = <Component />;
