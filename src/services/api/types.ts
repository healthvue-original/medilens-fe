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

export type CommonOmit = "id" | "created_at" | "updated_at";

export type PatientPayload = Omit<PatientModel, CommonOmit>;

export type CasePayload = Omit<CaseModel, CommonOmit | "status">;

export type HospitalPayload = Omit<HospitalModel, CommonOmit>;

export type GroupPayload = Omit<GroupModel, CommonOmit>;

export type SpecimenPayload = Omit<SpecimenModel, CommonOmit>;

export type ScannerPayload = Omit<ScannerModel, CommonOmit>;

export type ScanJobPayload = Omit<ScanJobModel, CommonOmit | "status">;

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
