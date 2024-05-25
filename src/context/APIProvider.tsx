import { createContext, useContext } from "react";
import { createAPI } from "@/services/api";
import { API } from "@/services/api/types";

const APIProviderContext = createContext<API | null>(null);

export const useAPI = (): API => {
  const context = useContext(APIProviderContext);
  if (!context) {
    throw new Error("useAPI can be used within APIProvider");
  }
  return context;
};

export default function APIProvider({
  api,
  children,
}: {
  api: API;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <APIProviderContext.Provider value={api}>
      {children}
    </APIProviderContext.Provider>
  );
}
