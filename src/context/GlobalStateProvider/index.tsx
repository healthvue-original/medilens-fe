import React, { createContext, Reducer, useContext, useReducer } from "react";
import { globalStateReducer, getInitialGlobalState } from "./reducers";
import { GlobalState, StateContext, Action } from "./types";

const GlobalStateContext = createContext<StateContext | null>(null);

export const useGlobalState = (): StateContext => {
  const globalContext = useContext(GlobalStateContext);
  if (!globalContext) {
    throw new Error(
      "Wrap the component with GlobalStateProvider before using useGlobalState"
    );
  }
  return globalContext;
};

export default function GlobalStateProvider({
  children,
  reducer = globalStateReducer,
  initialState,
}: {
  children: React.ReactNode;
  reducer?: Reducer<GlobalState, Action>;
  initialState?: GlobalState;
}): JSX.Element {
  const [state, dispatch] = useReducer(
    reducer,
    initialState ?? getInitialGlobalState()
  );

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}
