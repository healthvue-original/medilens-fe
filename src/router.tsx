import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Layout, { loader as bootLoader } from "./routes/Layout";

const baseURL = import.meta.env.BASE_URL;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" loader={bootLoader} element={<Layout />}>
        <Route index lazy={() => import("./routes/HomeRoute")} />
        <Route path="/patients" lazy={() => import("./routes/PatientsRoute")} />
        <Route path="/cases" lazy={() => import("./routes/CasesRoute")} />
        <Route
          path="/cases/:caseId/specimens"
          lazy={() => import("./routes/SpecimensRoute")}
        />
        <Route path="/scans" lazy={() => import("./routes/ScansRoute")} />
        <Route path="/settings" lazy={() => import("./routes/SettingsRoute")} />
      </Route>
      <Route path="/reports" element={<Outlet />}>
        <Route
          path="/reports/cases/:caseId"
          lazy={() => import("./routes/ReportsRoute")}
        />
      </Route>
      <Route path="/auth" lazy={() => import("./routes/AuthRoute")} />
    </Route>
  ),
  {
    basename: baseURL,
  }
);
