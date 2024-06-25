"use client";
import { createContext, useContext, useState } from "react";

type DialogProviderState = {
  open: (element: JSX.Element) => void;
  close: () => void;
};

const DialogContext = createContext<DialogProviderState | null>(null);

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [element, setElement] = useState<JSX.Element>(<></>);
  const open = setElement;
  const close = () => setElement(<></>);
  return (
    <DialogContext.Provider value={{ open, close }}>
      {children}
      {element}
    </DialogContext.Provider>
  );
}

export function useDialog(): DialogProviderState {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Wrap Dialog Provider");
  }
  return context;
}
