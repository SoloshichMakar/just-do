import {
    TEXT_AUTHORIZATION_CHANGE,
    CLEAR_MESSAGE,
    ERROR,
    AUTHENTICATE, FORM_AUTHORIZATION_CLEAR, MESSAGE
} from "../../utils/Constant";

export function actionTextEmailChange(email: string) {
    return {
        type: TEXT_AUTHORIZATION_CHANGE,
        email,
    };
}

export function actionTextPasswordChange(password: string) {
    return {
        type: TEXT_AUTHORIZATION_CHANGE,
        password,
    };
}

export function actionClearMessage() {
    return {
        type: CLEAR_MESSAGE,
    }
}

export function actionErrorMessage() {
    return {
        type: ERROR,
    }
}

export function actionAuthenticated() {
    return {
        type: AUTHENTICATE,
    }
}

export function actionFormClear() {
    return {
        type: FORM_AUTHORIZATION_CLEAR,
    }
}


export function actionSetMessage(message: string) {
    return {
        type: MESSAGE,
        message,
    };
}




