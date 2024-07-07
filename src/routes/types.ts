export type FormResponse<T> = {
  success: boolean;
  formErrors?: { [K in keyof T]: string };
};
