import { createBrowserRouter, defer } from "react-router-dom";
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
          loader: async () => {
            return defer({
              data: new Promise((res, rej) => {
                setTimeout(() => res("Home Loaded after 2s"), 2000);
              }),
            });
          },
          // loader: async () => {
          //   return new Promise((res, rej) => {
          //     setTimeout(() => res("Hello"), 5000);
          //   });
          // },
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
