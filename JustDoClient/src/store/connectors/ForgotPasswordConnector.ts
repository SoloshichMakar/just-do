import { connect } from "react-redux";
import {
    actionClearMessage,
    actionErrorMessage, actionTextEmailChange,
} from "../actions/ForgotPasswordActions";
import PasswordRestore from "../../components/PasswordRestore/PasswordRestore";
import ForgotPassword from "../../components/ForgotPassword/ForgotPasswordSendLink";
import {actionSetMessage} from "../actions/AuthorizationActions";

function mapStateToProps(state: any) {
    return {
        email: state.ForgotPasswordReducer.email,
        message: state.ForgotPasswordReducer.message,
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        textEmailChange(email: string) {
            dispatch(actionTextEmailChange(email));
        },
        errorMessage() {
            dispatch(actionErrorMessage())
        },
        clearMessage() {
            dispatch(actionClearMessage())
        },
        setMessage(message: string) {
            dispatch(actionSetMessage(message))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);