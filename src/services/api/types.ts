import {
  Case,
  Comment,
  Group,
  Hospital,
  Patient,
  ScanJob,
  Scanner,
  Specimen,
  User,
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

export type CommonOmit =
  | "id"
  | "created_at"
  | "created_by"
  | "updated_at"
  | "org_id"
  | "org";

export type PatientPayload = Omit<Patient, CommonOmit | "user">;

export type CasePayload = Pick<
  Case,
  "name" | "description" | "hospital_id" | "patient_id"
>;

export type HospitalPayload = Omit<Hospital, CommonOmit>;

export type GroupPayload = Omit<Group, CommonOmit>;

export type SpecimenPayload = Pick<
  Specimen,
  "case_id" | "job_id" | "file_path" | "name" | "created_by_id"
>;

export type ScannerPayload = Omit<Scanner, CommonOmit>;

export type ScanJobPayload = Pick<
  ScanJob,
  "case_id" | "slot_id" | "scanner_id"
>;

export type CommentPayload = Pick<
  Comment,
  "entity" | "entity_id" | "parent_id" | "comment"
>;

export type UserPayload = Omit<User, CommonOmit | "name" | "signature">;

export type CreateOrgPayload = Pick<User, "password" | "email"> & {
  org_id: number;
};

export type API = {
  createOrg: (userPayload: UserPayload) => Promise<User>;
  login: (userPayload: UserPayload) => Promise<User>;
  logout: () => Promise<void>;
  getUserData: () => Promise<User>;

  // patients
  getPatients: () => Promise<Patient[]>;
  addPatient: (patient: PatientPayload) => Promise<Patient>;

  // cases
  getCases: () => Promise<Case[]>;
  addCase: (caseObj: CasePayload) => Promise<Case>;
  updateCase: (caseObj: Case) => Promise<Case>;

  // hospitals
  getHospitals: () => Promise<Hospital[]>;
  addHospital: (hospital: HospitalPayload) => Promise<Hospital>;

  // groups
  getGroups: () => Promise<Group[]>;
  addGroup: (group: GroupPayload) => Promise<Group>;

  // specimens
  getSpecimens: ({ caseId }: { caseId: number }) => Promise<Specimen[]>;
  addSpecimen: (specimen: SpecimenPayload) => Promise<Specimen>;

  // scanners
  getScanners: () => Promise<Scanner[]>;
  addScanner: (scanner: ScannerPayload) => Promise<Scanner>;

  // scan_jobs
  getScanJobs: () => Promise<ScanJob[]>;
  addScanJob: (job: ScanJobPayload) => Promise<ScanJob>;

  // comments
  getComments: ({
    entity,
    entity_id,
  }: {
    entity: string;
    entity_id: number;
  }) => Promise<Comment[]>;
  addComment: (props: CommentPayload) => Promise<Comment>;
};

export type ObjectType = { [key: string]: any };
