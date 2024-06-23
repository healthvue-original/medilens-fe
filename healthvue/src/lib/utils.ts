import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function waitFor(delay: number = 2000, data: any): Promise<any> {
  return new Promise((res) => {
    setTimeout(() => res(data), delay);
  });
}
