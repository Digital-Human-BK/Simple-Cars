import { InputsTouched, LoginUser } from "../interfaces/User";

interface LoginInputs {
  usernameError: string | null;
  passwordError: string | null;
  formDisabled: boolean;
}

export function validateLogin(
  { username, password }: LoginUser,
  inputsTouched: InputsTouched
): LoginInputs {

  const inputErrors: LoginInputs = {
    usernameError: null,
    passwordError: null,
    formDisabled: true,
  };

  //validate username
  if (username.trim() === "" && inputsTouched.username) {
    inputErrors.usernameError = "Username is required";
  } else if (username.trim().length < 3 && inputsTouched.username) {
    inputErrors.usernameError = "At least 3 characters";
  } else {
    inputErrors.usernameError = null;
  }
  //validate password
  if (password.trim() === "" && inputsTouched.password) {
    inputErrors.passwordError = "Password is required";
  } else if (password.trim().length < 5 && inputsTouched.password) {
    inputErrors.passwordError = "At least 5 characters";
  } else {
    inputErrors.passwordError = null;
  }
  //validate form
  if (
    inputsTouched.username &&
    inputsTouched.password &&
    inputErrors.usernameError === null &&
    inputErrors.passwordError === null
  ) {
    inputErrors.formDisabled = false;
  }

  return inputErrors;
}
