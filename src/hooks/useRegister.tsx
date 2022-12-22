import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  selectUser,
  selectAuthError,
  selectAuthLoading,
} from "../store/auth-slice";
import { appRoutes } from "../constants/appRoutes";
import { login, register } from "../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { InputsTouched, RegisterUser } from "../interfaces/User";
import { validateRegister } from "../utils/validateRegister";

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function useRegister() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [inputsTouched, setInputsTouched] = useState<InputsTouched>({
    username: false,
    password: false,
    firstName: false,
    lastName: false,
  });
  const [userCredentials, setUserCredentials] = useState<RegisterUser>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const inputErrors = validateRegister(userCredentials, inputsTouched);

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

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    await dispatch(register(userCredentials)).unwrap();
    await dispatch(
      login({
        username: userCredentials.username,
        password: userCredentials.password,
      })
    ).unwrap();
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
    userCredentials,
    inputErrors,
    handleChange,
    handleRegisterSubmit,
  };
}

export default useRegister;
