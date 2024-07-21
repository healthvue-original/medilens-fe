/* Do not change, this code is generated from Golang structs */

export interface Hospital {
  id: number;
  name: string;
  address: string;
  created_at: Time;
  updated_at: Time;
  org_id: number;
  org: Org;
}
export interface Patient {
  id: number;
  name: string;
  email: string;
  age: number;
  sex: string;
  phone: number;
  created_by: number;
  user: User;
  org_id: number;
  org: Org;
  created_at: Time;
  updated_at: Time;
}
export interface Org {
  id: number;
  name: string;
  created_at: Time;
  updated_at: Time;
}
export interface Time extends Date {}
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  signature: string;
  created_at: Time;
  updated_at: Time;
  org_id: number;
  org: Org;
}
export interface Case {
  id: number;
  name: string;
  description: string;
  created_by_id: number;
  created_by: User;
  result: string;
  patient_id: number;
  patient: Patient;
  hospital_id: number;
  hospital: Hospital;
  created_at: Time;
  UpdatedAt: Time;
  due_on: Time;
  org_id: number;
  org: Org;
  status: string;
  type: string;
  report: string;
  assignee_id: number;
  assignee: User;
}
export interface Comment {
  id: number;
  comment: string;
  parent_id: number;
  entity: string;
  entity_id: number;
  position: string;
  created_by_id: number;
  created_by: User;
  created_at: Time;
  updated_at: Time;
  org_id: number;
  org: Org;
}
export interface Group {
  id: number;
  name: string;
  created_at: Time;
  updated_at: Time;
  org_id: number;
  org: Org;
}

export type Slot = {
  id: number;
  order: number;
  status: string;
};
export interface Scanner {
  id: number;
  name: string;
  group_id: number;
  group: Group;
  created_at: Time;
  updated_at: Time;
  org_id: number;
  org: Org;
  slots: Slot[];
}
export interface ScanJob {
  id: number;
  scanner_id: number;
  scanner: Scanner;
  case_id: number;
  case: Case;
  status: string;
  type: string;
  slot_id: number;
  completion_percent: number;
  created_at: Time;
  updated_at: Time;
  created_by_id: number;
  created_by: User;
}

export interface Specimen {
  id: number;
  name: string;
  file_path: string;
  created_by_id: number;
  created_by: User;
  case_id: number;
  case: Case;
  job_id: number;
  scan_job: ScanJob;
  created_at: Time;
  updated_at: Time;
}
