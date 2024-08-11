import { CasesTableView } from "@/components/Cases/CasesTableView";
import { api } from "@/services/api";
import { Case, Hospital, Patient, User } from "@/services/api/models";
import { ActionFunction, LoaderFunction, useLoaderData } from "react-router";

type LoaderData = {
  patients: Patient[];
  cases: Case[];
  hospitals: Hospital[];
  users: User[];
};

export const loader: LoaderFunction = async function loader() {
  const [patients, cases, hospitals, users] = await Promise.all([
    api.getPatients(),
    api.getCases(),
    api.getHospitals(),
    api.getAllUsers(),
  ]);
  return {
    patients,
    cases,
    hospitals,
    users,
  };
};

export const action: ActionFunction = async function action({ request }) {
  const formData = await request.formData();

  const patient_id = formData.get("patient_id");
  const hospital_id = formData.get("hospital_id");
  const assignee_id = formData.get("assignee_id");
  if (!patient_id || !hospital_id || !assignee_id) {
    return {
      success: false,
      formErrors: {
        patient_id: "Fields missing",
      },
    };
  }

  const payload = {
    description: formData.get("description") as string,
    patient_id: +patient_id,
    hospital_id: +hospital_id,
    assignee_id: +assignee_id,
  };

  await api.addCase(payload);
  return {
    success: true,
  };
};

function Component(): JSX.Element {
  const { patients, cases, hospitals, users } = useLoaderData() as LoaderData;
  return (
    <section className="cases p-8 h-full flex flex-col">
      <CasesTableView
        patients={patients}
        cases={cases}
        hospitals={hospitals}
        users={users}
      />
    </section>
  );
}

Component.displayName = "CasesRoute";

export const element = <Component />;
