const upperCaseLetters = /[A-Z][A-Z]/g;
const numbers = /[0-9]/g;
const specialChar = /[!@#$&*]/g;
const whitespaceChar =  /[\s]/g

export function validateEmail(EmailIsEdit: boolean, email: string) {
  if (EmailIsEdit) {
    const regularExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !regularExpression.test(email);
  }
  return EmailIsEdit;
}

export function emailHelperMessage(emailIsEdit: boolean, email: string) {
  if (emailIsEdit && email === "") {
    return "Email should not be empty";
  } else if (validateEmail(emailIsEdit, email)) {
    return "Enter a valid e-mail address";
  }
}

export function validatePassword(passwordIsEdit: boolean, password: string) {
  if (passwordIsEdit) {
    const regularExpression = new RegExp(
      "^(?=.*[A-Z].*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})[\\S]+$"
    );
    return !regularExpression.test(password);
  }
  return passwordIsEdit;
}

export function passwordHelperMessage(
  passwordIsEdit: boolean,
  password: string
) {
  if (passwordIsEdit && password === "") {
    return "Password should not be empty";
  } else if (validatePassword(passwordIsEdit, password)) {
    if (password.length < 7) {
      return "The password must be 8 symbols. Now " + password.length;
    } else if (!password.match(upperCaseLetters)) {
      return "The password must contain at least 2 capital letters";
    } else if (!password.match(numbers)) {
      return "The password must contain numbers";
    } else if (!password.match(specialChar)) {
      return "The password must contain special char (!@#$&*)";
    }else if (password.match(whitespaceChar)) {
      return "The password should not contain whitespaces";
    }
  }
}

export function validateConfirmPassword(
  confirmPasswordIsEdit: boolean,
  password: string,
  confirmPassword: string
) {
  if (confirmPasswordIsEdit) {
    return !(confirmPassword === password);
  }
  return confirmPasswordIsEdit;
}

export function confirmPasswordHelperMessage(
  confirmPasswordIsEdit: boolean,
  password: string,
  confirmPassword: string
) {
  if (confirmPasswordIsEdit) {
    if (password !== confirmPassword) {
      return "Password do not match";
    }
  }
}
