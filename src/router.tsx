import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Patients from "./components/Patients";
import Cases from "./components/Cases";
import Reports from "./components/Reports";
import Settings from "./components/Settings";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/patients",
          element: <Patients />,
        },
        {
          path: "/cases",
          element: <Cases />,
        },
        {
          path: "/reports",
          element: <Reports />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
  ],
  {
    basename: "/healthvue/",
  }
);
