import {
  ERROR,
  CLEAR_MESSAGE,
  AUTHENTICATE,
  TEXT_AUTHORIZATION_CHANGE,
  FORM_AUTHORIZATION_CLEAR,
  MESSAGE,
} from "../../utils/Constant";

export interface IActionLogin {
  type: string;
  email?: string;
  password?: string;
  message?: string;
}

export interface ILogin {
  email: string;
  password: string;
  isAuthenticated: boolean;
  success: boolean;
  message: string;
}

const initialState: ILogin = {
  email: "",
  password: "",
  isAuthenticated: false,
  message: "",
  success: false,
};

export default function UserAuthorisationReducer(
  state: ILogin = initialState,
  action: IActionLogin
): ILogin {
  switch (action.type) {
    case TEXT_AUTHORIZATION_CHANGE:
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
    case AUTHENTICATE:
      return {
        ...state,
        email: "",
        password: "",
      };
    case MESSAGE:
      if (action.message) {
        return {
          ...state,
          success: true,
          message: action.message,
        };
      }
    case ERROR:
      let message: string = "Invalid credentials";
      return {
        ...state,
        success: false,
        message: message,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        success: false,
        message: "",
      };

    case FORM_AUTHORIZATION_CLEAR:
      return {
        ...state,
        email: "",
        password: "",
        isAuthenticated: false,
        message: "",
      };

    default:
      return state;
  }
}
