import {
  TEXT_PASSWORD_RESTORE_CHANGE,
  CLEAR_MESSAGE,
  ERROR,
  MESSAGE,
} from "../../utils/Constant";

export function actionTextPasswordChange(password: string) {
  return {
    type: TEXT_PASSWORD_RESTORE_CHANGE,
    password,
  };
}

export function actionTextConfirmPasswordChange(confirmPassword: string) {
  return {
    type: TEXT_PASSWORD_RESTORE_CHANGE,
    confirmPassword,
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

export function actionSetMessage(message: string) {
  return {
    type: MESSAGE,
    message,
  };
}
