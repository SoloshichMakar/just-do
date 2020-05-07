import React from "react";
import { Snackbar } from "@material-ui/core";
import JustDoLogo from "../../picture/JustDoLogo.png";
import JustDoComponent from "../../picture/JustDoComponent.png";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import {
  emailHelperMessage,
  passwordHelperMessage,
  validateEmail,
  validatePassword,
} from "../../utils/validateUserDataFunction";
import { NavLink, useHistory } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { Alert } from "@material-ui/lab";
import { ColorButton, CustomLink } from "../style/CustomElements";

interface IAuthorization {
  email: string;
  password: string;
  message: string;
  isCreated: boolean;
  success: false;
  formClear: Function;
  authenticated: Function;
  errorMessage: Function;
  clearMessage: Function;
  textEmailChange: Function;
  textPasswordChange: Function;
}

let emailIsEdit = false;
let passwordIsEdit = false;

const USER_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
      }
      token
    }
  }
`;

const Authorization: React.FC<IAuthorization> = ({
  email,
  password,
  message,
  success,
  isCreated,
  errorMessage,
  clearMessage,
  formClear,
  authenticated,
  textEmailChange,
  textPasswordChange,
}) => {
  const [login] = useMutation(USER_LOGIN);
  const history = useHistory();

  function currentTextEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    emailIsEdit = true;
    const getTextAreaValue = e.target.value;
    textEmailChange(getTextAreaValue);
  }

  function currentTextPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    passwordIsEdit = true;
    const getTextAreaValue = e.target.value;
    textPasswordChange(getTextAreaValue);
  }

  function redirectToSighUp() {
    formClear();
    emailIsEdit = false;
    passwordIsEdit = false;
  }

  async function userAuthorization() {
    try {
      if (
        !validateEmail(emailIsEdit, email) &&
        emailIsEdit &&
        !validatePassword(passwordIsEdit, password) &&
        passwordIsEdit
      ) {
        const response = await login({
          variables: { email: email, password: password },
        });
        localStorage.setItem("token", response.data.login.token);
        authenticated();
        emailIsEdit = false;
        passwordIsEdit = false;
        history.push("/");
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

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    clearMessage();
  };

  console.log(success);
  return (
    <div id="registration_main">
      <Snackbar
        open={message.length !== 0 && !success}
        autoHideDuration={10000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={isCreated || success}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <div id="registration_main__logo_images">
        <img id="logo" src={JustDoLogo} />
        <img src={JustDoComponent} id="background_image" />
      </div>
      <div id="registration_main__components">
        <h1>Sign in</h1>
        <div id="components__input_components">
          <div className="input_components__text_input">
            <FormControl id="textInput__email">
              <Input
                id="email_input"
                error={validateEmail(emailIsEdit, email)}
                type="text"
                value={email}
                onChange={currentTextEmailChange}
                placeholder="E-mail"
              />
              <div id="errorMessage">
                {emailHelperMessage(emailIsEdit, email)}
              </div>
            </FormControl>
          </div>

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
          </div>
        </div>

        <div id="input_components__color_button">
          <div id="input_components__password_restore">
            <NavLink to="/password_restore">
              <CustomLink href="#" id="forgot_password">
                Forgot password?
              </CustomLink>
            </NavLink>
          </div>

          <ColorButton
            id="color_button"
            variant="contained"
            color="primary"
            onClick={() => userAuthorization()}
          >
            Sign in
          </ColorButton>
        </div>
        <div id="input_components__footer__sign_in">
          <NavLink to="/registration">
            <CustomLink
              href="/registration"
              id="sign_in__link"
              onClick={() => redirectToSighUp()}
            >
              Sign Up
            </CustomLink>
          </NavLink>
        </div>
        <div id="input_components__footer__agreements">
          <div>By accessing your account, you agree to our</div>
          <div id="agreements__links">
            <NavLink to="/#">
              <CustomLink
                id="item__terms_conditions"
                className="agreements__links__item"
                href="#"
              >
                Terms conditions
              </CustomLink>
            </NavLink>
            <div className="agreements__links__item"> and </div>
            <NavLink to="/#">
              <CustomLink
                id="item__privacy_policy"
                className="agreements__links__item"
              >
                Privacy Policy
              </CustomLink>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
