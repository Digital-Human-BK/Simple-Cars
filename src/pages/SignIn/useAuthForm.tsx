import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  login,
  register,
  selectAuthError,
  selectAuthLoading,
  selectUser,
} from "../../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoginUser, InputsTouched, RegisterUser, AuthUser } from "../../interfaces/User";
import { validateLogin } from "../../helpers/validateLogin";

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function useAuthForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [inputsTouched, setInputsTouched] = useState<InputsTouched>({
    username: false,
    password: false,
  });
  const [userCredentials, setUserCredentials] = useState<AuthUser>({
    username: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const inputErrors = validateLogin(userCredentials, inputsTouched);

  const handleToggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (ev: ChangeEvent) => {
    setInputsTouched((prevState) => ({
      ...prevState,
      [ev.target.name]: true,
    }));
    setUserCredentials((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value.trim(),
    }));
  };

  const handleLoginSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    await dispatch(login(userCredentials)).unwrap();
  };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // await dispatch(register(userCredentials)).unwrap();
    await dispatch(
      login({
        username: userCredentials.username,
        password: userCredentials.password,
      })
    ).unwrap();
  };

  return {
    showPassword,
    handleToggleShowPassword,
    handleMouseDownPassword,
    inputsTouched,
    userCredentials,
    inputErrors,
    handleChange,
    handleLoginSubmit,
    handleRegisterSubmit,
  };
}

export default useAuthForm;
