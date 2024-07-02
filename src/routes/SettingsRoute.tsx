import { HospitalsTableView } from "@/components/Hospitals/HospitalsTableView";
import { api } from "@/services/api";
import { HospitalModel } from "@/services/api/models";
import { LoaderFunction, useLoaderData } from "react-router";

type LoaderData = {
  hospitals: HospitalModel[];
};

export const loader: LoaderFunction = async function loader() {
  const hospitals = await api.getHospitals();
  return {
    hospitals,
  };
};

function Component(): JSX.Element {
  const { hospitals } = useLoaderData() as LoaderData;
  return (
    <section className="settings p-8 h-full flex flex-col">
      <HospitalsTableView hospitals={hospitals} />
    </section>
  );
}

Component.displayName = "SettingsRoute";

export const element = <Component />;
