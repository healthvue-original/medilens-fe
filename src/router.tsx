import {
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Route,
} from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Patients from "./components/Patients";
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
      <Route path="/home" element={<Home />} />
      <Route path="/patients" element={<Patients />} loader={patientsLoader} />
    </Route>
  ),
  {
    basename: baseURL,
  }
);
