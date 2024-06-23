"use server";

import { createAPI } from "@/services/api";
import { revalidatePath } from "next/cache";

import validator from "@sknk/object-validator";

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
