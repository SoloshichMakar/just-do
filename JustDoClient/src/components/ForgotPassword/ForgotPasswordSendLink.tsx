import React from "react";
import { Snackbar } from "@material-ui/core";
import JustDoLogo from "../../picture/JustDoLogo.png";
import JustDoComponent from "../../picture/JustDoComponent.png";
import BackArrow from "../../picture/ic_arrow_left.svg";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import { Link, useHistory } from "react-router-dom";
import { ColorButton } from "../style/CustomElements";
import { gql } from "apollo-boost";
import {
  emailHelperMessage,
  validateEmail,
} from "../../utils/validateUserDataFunction";
import { useMutation } from "@apollo/react-hooks";
import { Alert } from "@material-ui/lab";

interface IForgotPassword {
  email: string;
  message: string;
  setMessage: Function;
  errorMessage: Function;
  clearMessage: Function;
  textEmailChange: Function;
}

const SEND_INSTRUCTIONS = gql`
  mutation SendEmailPasswordRestore($email: String!) {
    sendEmailPasswordRestore(email: $email) {
      message
    }
  }
`;

let emailIsEdit = false;

const ForgotPassword: React.FC<IForgotPassword> = ({
  email,
  message,
  setMessage,
  errorMessage,
  clearMessage,
  textEmailChange,
}) => {
  const [sendEmailPasswordRestore] = useMutation(SEND_INSTRUCTIONS);
  const history = useHistory();

  function currentTextEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    emailIsEdit = true;
    const getTextAreaValue = e.target.value;
    textEmailChange(getTextAreaValue);
  }

  async function sendEmail() {
    try {
      if (!validateEmail(emailIsEdit, email) && emailIsEdit) {
        const response = await sendEmailPasswordRestore({
          variables: { email: email },
        });
        emailIsEdit = false;
        setMessage("Instruction to restore your password is sent to your email: " + email);
        textEmailChange("");
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
        <h1>Forgot Password</h1>
        <div id="components_helper_text">
          {" "}
          Please enter your email below to receive your <br /> password reset
          instruction{" "}
        </div>
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

          <div id="input_components__color_button">
            <ColorButton
              id="color_button"
              variant="contained"
              color="primary"
              onClick={() => sendEmail()}
            >
              Send
            </ColorButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
