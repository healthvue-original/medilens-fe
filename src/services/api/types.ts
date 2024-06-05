import {
  CaseModel,
  GroupModel,
  HospitalModel,
  PatientModel,
  ScanJobModel,
  ScannerModel,
  SpecimenModel,
  UserModel,
} from "./models";

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

type CommonOmit = "id" | "created_at" | "updated_at";

type PatientPayload = Omit<PatientModel, CommonOmit>;

type CasePayload = Omit<CaseModel, CommonOmit | "status">;

type HospitalPayload = Omit<HospitalModel, CommonOmit>;

type GroupPayload = Omit<GroupModel, CommonOmit>;

type SpecimenPayload = Omit<SpecimenModel, CommonOmit>;

type ScannerPayload = Omit<ScannerModel, CommonOmit>;

type ScanJobPayload = Omit<ScanJobModel, CommonOmit>;

export type API = {
  getUserData: () => Promise<UserModel>;

  // patients
  getPatients: () => Promise<PatientModel[]>;
  addPatient: (patient: PatientPayload) => Promise<PatientModel>;

  // cases
  getCases: () => Promise<CaseModel[]>;
  addCase: (caseObj: CasePayload) => Promise<CaseModel>;

  // hospitals
  getHospitals: () => Promise<HospitalModel[]>;
  addHospital: (hospital: HospitalPayload) => Promise<HospitalModel>;

  // groups
  getGroups: () => Promise<GroupModel[]>;
  addGroup: (group: GroupPayload) => Promise<GroupModel>;

  // specimens
  getSpecimens: () => Promise<SpecimenModel[]>;
  addSpecimen: (specimen: SpecimenPayload) => Promise<SpecimenModel>;

  // scanners
  getScanners: () => Promise<ScannerModel[]>;
  addScanner: (scanner: ScannerPayload) => Promise<ScannerModel>;

  // scan_jobs
  getScanJobs: () => Promise<ScanJobModel[]>;
  addScanJob: (job: ScanJobPayload) => Promise<ScanJobModel>;
};

export type ObjectType = { [key: string]: any };
