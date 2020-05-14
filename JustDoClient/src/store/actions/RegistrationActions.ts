import {
  TEXT_REGISTRATION_CHANGE,
  SHOW_CONTENT,
  CLEAR_MESSAGE,
  ERROR,
  CREATE_USER,
  AUTHENTICATE,
  FORM_REGISTRATION_CLEAR,
  MESSAGE,
} from "../../utils/Constant";

export function actionTextEmailChange(email: string) {
  return {
    type: TEXT_REGISTRATION_CHANGE,
    email,
  };
}

export function actionTextPasswordChange(password: string) {
  return {
    type: TEXT_REGISTRATION_CHANGE,
    password,
  };
}

export function actionTextConfirmPasswordChange(confirmPassword: string) {
  return {
    type: TEXT_REGISTRATION_CHANGE,
    confirmPassword,
  };
}

export function actionShowPassword(showPassword: boolean) {
  return {
    type: SHOW_CONTENT,
    showPassword,
  };
}

export function actionShowConfirmPassword(showConfirmPassword: boolean) {
  return {
    type: SHOW_CONTENT,
    showConfirmPassword,
  };
}

export function actionClearMessage() {
  return {
    type: CLEAR_MESSAGE,
  };
}

export function actionErrorMessage() {
  return {
    type: ERROR,
  };
}

export function actionCreateUserMessage() {
  return {
    type: CREATE_USER,
  };
}
export function actionAuthenticated() {
  return {
    type: AUTHENTICATE,
  };
}

export function actionFormClear() {
  return {
    type: FORM_REGISTRATION_CLEAR,
  };
}

export function actionSetMessage(message: string) {
  return {
    type: MESSAGE,
    message,
  };
}
