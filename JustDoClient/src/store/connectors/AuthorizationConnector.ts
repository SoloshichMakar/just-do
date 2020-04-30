import Authorization from "../../components/Authorization/Authorization";
import { connect } from "react-redux";
import {
    actionTextEmailChange,
    actionTextPasswordChange,
    actionClearMessage, actionErrorMessage, actionAuthenticated, actionFormClear,actionSetMessage,
} from "../actions/AuthorizationActions";

function mapStateToProps(state: any) {
    return {
        email: state.AuthorizationReducer.email,
        password: state.AuthorizationReducer.password,
        message: state.AuthorizationReducer.message,
        success: state.AuthorizationReducer.success,
        isCreated: state.RegistrationReducer.isCreated,
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        textEmailChange(email: string) {
            dispatch(actionTextEmailChange(email));
        },
        textPasswordChange(password: string) {
            dispatch(actionTextPasswordChange(password));
        },
        errorMessage() {
            dispatch(actionErrorMessage())
        },
        clearMessage() {
            dispatch(actionClearMessage())
        },
        authenticated() {
            dispatch(actionAuthenticated());
        },
        formClear() {
          dispatch(actionFormClear())
        },
        setMessage(message: string) {
            dispatch(actionSetMessage(message))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
