import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  selectAuthError,
  selectAuthLoading,
  selectUser,
} from "../store/auth-slice";
import { login } from "../store/auth-slice";
import { appRoutes } from "../constants/appRoutes";
import { useAppDispatch, useAppSelector } from "../store/store";
import { LoginUser, InputsTouched } from "../interfaces/User";
import { validateLogin } from "../utils/validateLogin";

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [inputsTouched, setInputsTouched] = useState<InputsTouched>({
    username: false,
    password: false,
  });
  const [userCredentials, setUserCredentials] = useState<LoginUser>({
    username: "",
    password: "",
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

  useEffect(() => {
    if (user) {
      navigate(appRoutes.catalog, { replace: true });
    }
  }, [user, navigate]);

  return {
    user,
    error,
    loading,
    showPassword,
    handleToggleShowPassword,
    handleMouseDownPassword,
    inputsTouched,
    userCredentials,
    inputErrors,
    handleChange,
    handleLoginSubmit,
  };
}

export default useLogin;
