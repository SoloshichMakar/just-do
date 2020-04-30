import {
    ERROR,
    CLEAR_MESSAGE,
    AUTHENTICATE,
    TEXT_AUTHORIZATION_CHANGE,
    FORM_AUTHORIZATION_CLEAR, MESSAGE, TEXT_SEND_EMAIL_CHANGE
} from '../../utils/Constant'

export interface IActionLogin {
    type: string;
    email?: string,
    message?: string
}

export interface ILogin {
    email: string,
    message: string
}

const initialState: ILogin = {
    email: '',
    message: '',
}

export default function UserAuthorisationReducer(state: ILogin = initialState, action:IActionLogin): ILogin {
    switch (action.type) {
        case TEXT_SEND_EMAIL_CHANGE:
            if (typeof action.email === "string") {
                return {
                    ...state,
                    email: action.email,
                };
            }
        case MESSAGE :
            if( action.message) {
                return {
                    ...state,
                    message: action.message,
                };
            }
        case ERROR:
            let message: string = 'Invalid credentials';
            return {
                ...state,
                message: message
            };
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: "",
            };

        case FORM_AUTHORIZATION_CLEAR:
            return {
                ...state,
                email: '',
                message: '',
            };

        default:
            return state;
    }
}
