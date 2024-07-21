import { GlobalState, UserActionsList, UserActionsTypes } from "../types";

export const ActionTypes = {
  setUser: "user.setUser",
};

export default function userReducer(
  state: GlobalState,
  action: UserActionsList
): GlobalState {
  if (action.type === ActionTypes.setUser) {
    return {
      ...state,
      user: action.payload.userData,
    };
  }

  return {
    ...state,
  };
}

export const UserActions = {
  setUser: (userData) => ({ type: ActionTypes.setUser, payload: { userData } }),
} as UserActionsTypes;
