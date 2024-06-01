import {
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Outlet,
  Route,
} from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import PatientsList from "./components/Patients/PatientsList";
import { createAPI } from "./services/api";

const api = createAPI({ org: "healthvue" });
const baseURL = import.meta.env.BASE_URL;

function patientsLoader() {
  return defer({
    patients: api.getPatients(),
  });
}

async function addPatientAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const patient = {
    name: formData.get("name") as string,
    age: +(formData.get("age") ?? 0) as number,
    email: formData.get("email") as string,
    sex: formData.get("sex") as string,
    phone: +(formData.get("phone") ?? 0) as number,
    referred_by: 1,
  };
  if (Object.values(patient).some((val) => !val)) {
    return {
      formErrors: {
        name: "Name is required",
      },
    };
  }
  await api.addPatient(patient);
  return {
    patient,
  };
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App api={api} />}>
      <Route index element={<Home />} />
      <Route
        path="/patients"
        element={
          <div className="h-full">
            <Outlet />
          </div>
        }
      >
        <Route
          index
          element={<PatientsList />}
          loader={patientsLoader}
          action={addPatientAction}
        />
      </Route>
    </Route>
  ),
  {
    basename: baseURL,
  }
);
