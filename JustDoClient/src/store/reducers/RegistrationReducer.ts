import {
  ERROR,
  SHOW_CONTENT,
  CREATE_USER,
  CLEAR_MESSAGE,
  TEXT_REGISTRATION_CHANGE,
  FORM_REGISTRATION_CLEAR,
  MESSAGE,
} from "../../utils/Constant";
import { IActionRegistration } from "../../types/types";

interface IStateRegistration {
  email: string;
  password: string;
  confirmPassword: string;
  message: string;
  isCreated: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

const initialState: IStateRegistration = {
  email: "",
  password: "",
  confirmPassword: "",
  message: "",
  isCreated: false,
  showPassword: false,
  showConfirmPassword: false,
};

export default function RegistrationReducer(
  state: IStateRegistration = initialState,
  action: IActionRegistration
): IStateRegistration {
  switch (action.type) {
    case TEXT_REGISTRATION_CHANGE:
      if (typeof action.email === "string") {
        return {
          ...state,
          email: action.email,
        };
      }
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
    case SHOW_CONTENT:
      if (typeof action.showPassword === "boolean") {
        return {
          ...state,
          showPassword: !action.showPassword,
        };
      }
      if (typeof action.showConfirmPassword === "boolean") {
        return {
          ...state,
          showConfirmPassword: !action.showConfirmPassword,
        };
      }
    case CREATE_USER:
      return {
        ...state,
        email: "",
        password: "",
        confirmPassword: "",
        isCreated: true,
      };

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
        message: "This email address is already exist",
        isCreated: false,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        isCreated: false,
        message: "",
      };
    case FORM_REGISTRATION_CLEAR:
      return {
        ...state,
        email: "",
        password: "",
        confirmPassword: "",
        message: "",
        isCreated: false,
        showPassword: false,
        showConfirmPassword: false,
      };
    default:
      return state;
  }
}
