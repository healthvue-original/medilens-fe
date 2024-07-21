import { GlobalState, Action } from "../types";
import userReducer from "./user";

const reducers = [userReducer]; // Other reducers can be added as application grows

export function globalStateReducer(
  state: GlobalState,
  action: Action
): GlobalState {
  return reducers.reduce(
    (currentState, nextReducer) => nextReducer(currentState, action),
    state
  );
}

export const getInitialGlobalState = (): GlobalState => {
  return {
    user: {},
  };
};
