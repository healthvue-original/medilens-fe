import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addAnnotation({ annotation, specimenId }): void {
  const previousAnnotations = localStorage.getItem(specimenId) ?? "[]";
  const annotations = JSON.parse(previousAnnotations);
  localStorage.setItem(
    specimenId,
    JSON.stringify([...annotations, annotation])
  );
}

export function getAnnotations({ specimenId }: { specimenId: string }) {
  const annotations = localStorage.getItem(specimenId) ?? "[]";
  return JSON.parse(annotations);
}

export function waitFor(delay: number = 2000, data: any): Promise<any> {
  return new Promise((res) => {
    setTimeout(() => res(data), delay);
  });
}
