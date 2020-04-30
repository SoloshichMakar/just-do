import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import "../style/style.scss";
import {
  IconButton,
  Snackbar,
} from "@material-ui/core";
import JustDoComponent from "../../picture/JustDoComponent.png";
import JustDoLogo from "../../picture/JustDoLogo.png";
import {
  emailHelperMessage,
  passwordHelperMessage,
  confirmPasswordHelperMessage,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validateUserDataFunction";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { Alert } from "@material-ui/lab";
import {NavLink, useHistory} from "react-router-dom";
import { ColorButton, CustomLink } from "../style/CustomElements";


interface IRegistrationProps {
  email: string;
  password: string;
  message: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  confirmPassword: string;
  setMessage: Function;
  formClear: Function;
  errorMessage: Function;
  createUserMessage: Function;
  clearMessage: Function;
  textEmailChange: Function;
  textPasswordChange: Function;
  textConfirmPasswordChange: Function;
  showPasswordValue: Function;
  showConfirmPasswordValue: Function;
}

const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      id
      email
    }
  }
`;

let emailIsEdit = false;
let passwordIsEdit = false;
let confirmPasswordIsEdit = false;

const Registration: React.FC<IRegistrationProps> = ({
  email,
  password,
  message,
  confirmPassword,
  showPassword,
  clearMessage,
  errorMessage,
  formClear,
  setMessage,
  createUserMessage,
  showConfirmPassword,
  textEmailChange,
  textPasswordChange,
  showPasswordValue,
  showConfirmPasswordValue,
  textConfirmPasswordChange,
}) => {
  const [addUser] = useMutation(ADD_USER);
  const history = useHistory();

  function currentTextEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    emailIsEdit = true;
    const getTextAreaValue = e.target.value;
    textEmailChange(getTextAreaValue);
  }

  function redirectToSighIn() {
    formClear();
    emailIsEdit = false;
    passwordIsEdit = false;
  }

  const handleClickShowPassword = () => {
    showPasswordValue(showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    showConfirmPasswordValue(showConfirmPassword);
  };

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

  async function createNewUser() {
    try {
      if (
        !validateEmail(emailIsEdit, email) &&
        emailIsEdit &&
        !validatePassword(passwordIsEdit, password) &&
        passwordIsEdit &&
        !validateConfirmPassword(
          confirmPasswordIsEdit,
          password,
          confirmPassword
        ) &&
        confirmPasswordIsEdit
      ) {
        await addUser({
          variables: { email: email, password: password },
        });
        emailIsEdit = false;
        passwordIsEdit = false;
        confirmPasswordIsEdit = false;
        setMessage("User: " + email + " is created");
        createUserMessage();
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
    <div id="registration_main">
      <Snackbar
        open={message.length !== 0}
        autoHideDuration={10000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <div id="registration_main__logo_images">
        <img id="logo" src={JustDoLogo} />
        <img src={JustDoComponent} id="background_image" />
      </div>
      <div id="registration_main__components">
        <h1>Sign up</h1>
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
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Password"
                onChange={currentTextPasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <div id="errorMessage">
                {passwordHelperMessage(passwordIsEdit, password)}
              </div>
            </FormControl>
          </div>

          <div className="input_components__text_input">
            <FormControl id="textInput__passwordConfirmForm">
              <Input
                id="password_confirm_input"
                error={validateConfirmPassword(
                  passwordIsEdit,
                  password,
                  confirmPassword
                )}
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={currentTextConfirmPasswordChange}
                placeholder="Confirm password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
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
        </div>

        <div id="input_components__color_button">
          <ColorButton
            id="color_button"
            variant="contained"
            color="primary"
            onClick={() => createNewUser()}
          >
            Sign up
          </ColorButton>
        </div>
        <div id="input_components__footer__sign_in">
          I already have an account.
          <NavLink to="/login"><CustomLink onClick={() => redirectToSighIn()}>Sign In</CustomLink></NavLink>
        </div>
        <div id="input_components__footer__agreements">
          <div>By accessing your account, you agree to our</div>
          <div id="agreements__links">
            <NavLink to="/#"><CustomLink
              id="item__terms_conditions"
              className="agreements__links__item"
            >
              Terms conditions
            </CustomLink></NavLink>
            <div className="agreements__links__item"> and </div>
            <NavLink to="/#"><CustomLink
              id="item__privacy_policy"
              className="agreements__links__item"
            >
              Privacy Policy
            </CustomLink></NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
