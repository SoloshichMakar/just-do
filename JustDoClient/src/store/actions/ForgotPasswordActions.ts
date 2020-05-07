import {
  CLEAR_MESSAGE,
  ERROR,
  FORM_AUTHORIZATION_CLEAR,
  TEXT_SEND_EMAIL_CHANGE,
} from "../../utils/Constant";

export function actionTextEmailChange(email: string) {
  return {
    type: TEXT_SEND_EMAIL_CHANGE,
    email,
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

export function actionFormClear() {
  return {
    type: FORM_AUTHORIZATION_CLEAR,
  };
}
