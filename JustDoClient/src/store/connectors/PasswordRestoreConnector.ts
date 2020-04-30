import { connect } from "react-redux";
import {
    actionTextConfirmPasswordChange,
    actionTextPasswordChange,
    actionClearMessage,
    actionErrorMessage,
    actionSetMessage,
} from "../actions/PasswordRestoreActions";
import PasswordRestore from "../../components/PasswordRestore/PasswordRestore";

function mapStateToProps(state: any) {
    return {
        password: state.PasswordRestoreReducer.password,
        confirmPassword: state.PasswordRestoreReducer.confirmPassword,
        message: state.PasswordRestoreReducer.message,
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        textPasswordChange(password: string) {
            dispatch(actionTextPasswordChange(password));
        },
        textConfirmPasswordChange(confirmPassword: string) {
            dispatch(actionTextConfirmPasswordChange(confirmPassword));
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRestore);