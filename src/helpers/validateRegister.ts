import { InputsTouched, RegisterUser } from "../interfaces/User";

interface RegisterInputs {
  firstNameError: string | null;
  lastNameError: string | null;
  usernameError: string | null;
  passwordError: string | null;
  formDisabled: boolean;
}

export function validateRegister(
  {firstName, lastName, username, password }: RegisterUser,
  inputsTouched: InputsTouched
): RegisterInputs {

  const inputErrors: RegisterInputs = {
    firstNameError: null,
    lastNameError: null,
    usernameError: null,
    passwordError: null,
    formDisabled: true,
  };

  //validate firstName
  if (firstName.trim() === "" && inputsTouched.firstName) {
    inputErrors.firstNameError = "First name is required";
  } else if (firstName.trim().length < 2 && inputsTouched.firstName) {
    inputErrors.firstNameError = "At least 2 characters";
  } else {
    inputErrors.firstNameError = null;
  }

  //validate lastName
  if (lastName.trim() === "" && inputsTouched.lastName) {
    inputErrors.lastNameError = "Last name is required";
  } else if (lastName.trim().length < 2 && inputsTouched.lastName) {
    inputErrors.lastNameError = "At least 2 characters";
  } else {
    inputErrors.lastNameError = null;
  }
  
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
    inputsTouched.firstName &&
    inputsTouched.lastName &&
    inputsTouched.username &&
    inputsTouched.password &&
    inputErrors.firstNameError === null &&
    inputErrors.lastNameError === null &&
    inputErrors.usernameError === null &&
    inputErrors.passwordError === null
  ) {
    inputErrors.formDisabled = false;
  }

  return inputErrors;
}
