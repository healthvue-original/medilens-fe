import { Patient } from "@/components/Patients/types";

type ConstructURL = { constructURL: (url: string) => string };

export type createAPIProps = {
  org: string;
};

export type TransformerProps = {
  setFetchOptions: (options: RequestInit) => RequestInit;
} & createAPIProps &
  ConstructURL;

export type AsyncTask<T, U> = (param: T) => Promise<U>;

export type FetchOptions = { url: string } & RequestInit;

export type ReqTransformer<T> = AsyncTask<T, FetchOptions>;

export type ResTransformer<T, U> = AsyncTask<T, U>;

type GetPatientsResponse = Patient[];

type AddPatientResponse = Patient;

export type API = {
  getPatients: () => Promise<GetPatientsResponse>;
  addPatient: (patient: Patient) => Promise<AddPatientResponse>;
};

export type ObjectType = { [key: string]: any };
