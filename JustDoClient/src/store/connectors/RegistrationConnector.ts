import Registration from "../../components/registration/Registration";
import { connect } from "react-redux";
import {
  actionTextConfirmPasswordChange,
  actionTextEmailChange,
  actionTextPasswordChange,
  actionShowPassword,
  actionShowConfirmPassword,
  actionClearMessage,
  actionCreateUserMessage,
  actionErrorMessage,
  actionFormClear,
  actionSetMessage,
} from "../actions/RegistrationActions";

function mapStateToProps(state: any) {
  return {
    email: state.RegistrationReducer.email,
    password: state.RegistrationReducer.password,
    confirmPassword: state.RegistrationReducer.confirmPassword,
    message: state.RegistrationReducer.message,
    isCreated: state.RegistrationReducer.isCreated,
    showPassword: state.RegistrationReducer.showPassword,
    showConfirmPassword: state.RegistrationReducer.showConfirmPassword,
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
    textConfirmPasswordChange(confirmPassword: string) {
      dispatch(actionTextConfirmPasswordChange(confirmPassword));
    },
    showPasswordValue(showPassword: boolean) {
      dispatch(actionShowPassword(showPassword));
    },
    showConfirmPasswordValue(showConfirmPassword: boolean) {
      dispatch(actionShowConfirmPassword(showConfirmPassword));
    },
    errorMessage() {
      dispatch(actionErrorMessage());
    },
    clearMessage() {
      dispatch(actionClearMessage());
    },
    createUserMessage() {
      dispatch(actionCreateUserMessage());
    },
    formClear() {
      dispatch(actionFormClear());
    },
    setMessage(message: string) {
      dispatch(actionSetMessage(message));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
