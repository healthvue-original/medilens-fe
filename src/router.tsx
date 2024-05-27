import {
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Navigate,
  Outlet,
  Route,
} from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import AddPatient from "./components/Patients/AddPatient";
import PatientsList from "./components/Patients/PatientsList";
import { createAPI } from "./services/api";

const api = createAPI({ org: "healthvue" });
const baseURL = import.meta.env.BASE_URL;

function patientsLoader() {
  return defer({
    data: api.getPatients(),
  });
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
        <Route path="add" element={<AddPatient />} />
        <Route index element={<PatientsList />} />
      </Route>
    </Route>
  ),
  {
    basename: baseURL,
  }
);
