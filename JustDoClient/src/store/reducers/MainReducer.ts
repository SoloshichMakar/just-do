import RegistrationReducer from "./RegistrationReducer";
import AuthorizationReducer from "./AuthorizationReducer";
import PasswordRestoreReducer from "./PasswordRestoreReducer";
import ForgotPasswordReducer from "./ForgotPasswordReducer";

import { combineReducers } from "redux";

const MainReducer = combineReducers({
  RegistrationReducer,
  AuthorizationReducer,
  PasswordRestoreReducer,
  ForgotPasswordReducer,
});

export default MainReducer;
