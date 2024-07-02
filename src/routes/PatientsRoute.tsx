import { PatientTableView } from "@/components/Patients/PatientTableView";
import { api } from "@/services/api";
import { PatientModel } from "@/services/api/models";
import {
  ActionFunction,
  json,
  LoaderFunction,
  useLoaderData,
} from "react-router";

export const loader: LoaderFunction = async function loader() {
  const patients = await api.getPatients();
  return { patients };
};

export const action: ActionFunction = async function action({ request }) {
  const formData = await request.formData();
  const patient = {
    name: formData.get("name") as string,
    age: +(formData.get("age") ?? 0) as number,
    email: formData.get("email") as string,
    sex: formData.get("sex") as string,
    phone: +(formData.get("phone") ?? 0) as number,
    created_by: 1,
  };
  if (Object.values(patient).some((val) => !val)) {
    return {
      success: false,
      formErrors: {
        name: "Name is required",
      },
    };
  }
  await api.addPatient(patient);
  return json({
    success: true,
  });
};

function Component(): JSX.Element {
  const { patients } = useLoaderData() as { patients: PatientModel[] };
  return (
    <section className="patients p-8 h-full flex flex-col">
      <PatientTableView patients={patients} />
    </section>
  );
}

Component.displayName = "PatientsRoute";

export const element = <Component />;
