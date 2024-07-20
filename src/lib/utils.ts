import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function waitFor<T>(delay: number = 2000, data: T): Promise<T> {
  return new Promise((res) => {
    setTimeout(() => res(data), delay);
  });
}

export const dateFormatter = new Intl.DateTimeFormat("en-IN");

export const updatePageTitle = (title: string) => {
  document.title = title;
};
