import {
  ERROR,
  CLEAR_MESSAGE,
  TEXT_PASSWORD_RESTORE_CHANGE,
  MESSAGE,
} from "../../utils/Constant";
import { IActionRegistration } from "../../types/types";

interface IStatePasswordRestore {
  password: string;
  confirmPassword: string;
  message: string;
}

const initialState: IStatePasswordRestore = {
  password: "",
  confirmPassword: "",
  message: "",
};

export default function PasswordRestoreReducer(
  state: IStatePasswordRestore = initialState,
  action: IActionRegistration
): IStatePasswordRestore {
  switch (action.type) {
    case TEXT_PASSWORD_RESTORE_CHANGE:
      if (typeof action.password === "string") {
        return {
          ...state,
          password: action.password,
        };
      }
      if (typeof action.confirmPassword === "string") {
        return {
          ...state,
          confirmPassword: action.confirmPassword,
        };
      }
    case MESSAGE:
      if (action.message) {
        return {
          ...state,
          message: action.message,
        };
      }
    case ERROR:
      return {
        ...state,
        message:
          "This link is forbidden, please make new request to get password restore link.",
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
}
