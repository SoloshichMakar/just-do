import React from "react";
import { Snackbar } from "@material-ui/core";
import JustDoLogo from "../../picture/JustDoLogo.png";
import JustDoComponent from "../../picture/JustDoComponent.png";
import BackArrow from "../../picture/ic_arrow_left.svg";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import { Link, useHistory } from "react-router-dom";
import {
  confirmPasswordHelperMessage,
  passwordHelperMessage,
  validateConfirmPassword,
  validatePassword,
} from "../../utils/validateUserDataFunction";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Alert } from "@material-ui/lab";
import { ColorButton } from "../style/CustomElements";

interface IForgotPasswordRestore {
  password: string;
  message: string;
  confirmPassword: string;
  match: any;
  setMessage: Function;
  errorMessage: Function;
  clearMessage: Function;
  textPasswordChange: Function;
  textConfirmPasswordChange: Function;
}

const PASSWORD_RESTORE = gql`
  mutation PasswordRestore($id: ID!, $password: String!, $token: String!) {
    passwordRestore(id: $id, password: $password, token: $token) {
      id
      email
    }
  }
`;

let passwordIsEdit = false;
let confirmPasswordIsEdit = false;

const PasswordRestore: React.FC<IForgotPasswordRestore> = ({
  password,
  confirmPassword,
  message,
  errorMessage,
  clearMessage,
  setMessage,
  textPasswordChange,
  textConfirmPasswordChange,
  match,
}) => {
  const [passwordRestore] = useMutation(PASSWORD_RESTORE);
  const history = useHistory();

  function currentTextPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    passwordIsEdit = true;
    const getTextAreaValue = e.target.value;
    textPasswordChange(getTextAreaValue);
  }

  function currentTextConfirmPasswordChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    confirmPasswordIsEdit = true;
    const getTextAreaValue = e.target.value;
    textConfirmPasswordChange(getTextAreaValue);
  }

  async function updatePassword() {
    try {
      if (
        !validatePassword(passwordIsEdit, password) &&
        passwordIsEdit &&
        !validateConfirmPassword(
          confirmPasswordIsEdit,
          password,
          confirmPassword
        ) &&
        confirmPasswordIsEdit
      ) {
        await passwordRestore({
          variables: {
            id: parseInt(match.params.id),
            password: password,
            token: match.params.token,
          },
        });
        passwordIsEdit = false;
        confirmPasswordIsEdit = false;
        setMessage("You have successfully changed your password!");
        history.push("/login");
      }
    } catch (error) {
      errorMessage();
    }
  }

  const handleErrorClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    clearMessage();
  };

  return (
    <div id="forgot_password_main">
      <Snackbar
        open={message.length !== 0}
        autoHideDuration={10000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <div id="forgot_password_main__logo_images">
        <img id="logo" src={JustDoLogo} />
        <img src={JustDoComponent} id="background_image" />
      </div>
      <div id="forgot_password_main__components">
        <Link id="arrow_link" to="/login">
          <img src={BackArrow} />
        </Link>
        <h1>Password restore</h1>
        <div id="components_helper_text">
          {" "}
          Please enter and confirm your new password{" "}
        </div>
        <div id="components__input_components">
          <div className="input_components__text_input">
            <FormControl id="textInput__passwordForm">
              <Input
                id="password_input"
                error={validatePassword(passwordIsEdit, password)}
                type={"password"}
                value={password}
                placeholder="Password"
                onChange={currentTextPasswordChange}
              />
              <div id="errorMessage">
                {passwordHelperMessage(passwordIsEdit, password)}
              </div>
            </FormControl>

            <div className="input_components__text_input">
              <FormControl id="textInput__passwordConfirmForm">
                <Input
                  id="password_confirm_input"
                  error={validateConfirmPassword(
                    passwordIsEdit,
                    password,
                    confirmPassword
                  )}
                  type="password"
                  value={confirmPassword}
                  onChange={currentTextConfirmPasswordChange}
                  placeholder="Confirm password"
                />

                <div id="errorMessage">
                  {confirmPasswordHelperMessage(
                    confirmPasswordIsEdit,
                    password,
                    confirmPassword
                  )}
                </div>
              </FormControl>
            </div>

            <div id="input_components__color_button">
              <ColorButton
                id="color_button"
                variant="contained"
                color="primary"
                onClick={() => updatePassword()}
              >
                Send
              </ColorButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRestore;
