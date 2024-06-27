"use server";

import { createAPI } from "@/services/api";
import { revalidatePath } from "next/cache";

import validator from "@sknk/object-validator";
import { CasePayload, ScanJobPayload } from "@/services/api/types";

const api = createAPI({ org: "healthvue" });

const patientSchema = {
  name: ["string"],
  age: ["number", "1-99"],
};

export async function createPatient(prevState: any, formData: FormData) {
  const patient = {
    name: formData.get("name") as string,
    age: +(formData.get("age") ?? 0) as number,
    email: formData.get("email") as string,
    sex: formData.get("sex") as string,
    phone: +(formData.get("phone") ?? 0) as number,
    created_by: 1,
  };

  try {
    validator(patient, patientSchema, { strict: false });
  } catch (err) {
    console.log(err);
    return { message: "failure" };
    // return {
    //   error: err,
    // };
  }

  await api.addPatient(patient);
  revalidatePath("/patients");
  return {
    message: "submitted",
  };
}

export async function addCase(prevState: any, formData: FormData) {
  const patient_id = formData.get("patient_id");
  const hospital_id = formData.get("hospital_id");
  if (!patient_id || !hospital_id) {
    return {
      message: "",
    };
  }

  const payload: CasePayload = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    patient_id: +patient_id,
    hospital_id: +hospital_id,
    created_by: 1,
  };

  await api.addCase(payload);
  revalidatePath("/cases");
  return {
    message: "submitted",
  };
}

export async function addJob(prevState: any, formData: FormData) {
  const scanner_id = formData.get("scanner_id");
  const case_id = formData.get("case_id");
  const slot_id = formData.get("slot_id");

  if (!slot_id || !scanner_id || !case_id) {
    return {
      message: "",
    };
  }

  const payload: ScanJobPayload = {
    scanner_id: +scanner_id,
    case_id: +case_id,
    slot_id: +slot_id,
  };

  const createdJob = await api.addScanJob(payload);

  await api.addSpecimen({
    case_id: +case_id,
    job_id: createdJob.id,
    file_path: "scans/FDSSD43534GDFX",
    name: "Dummy",
    user_id: 1,
  });

  revalidatePath("/scans");
  return {
    message: "submitted",
  };
}
