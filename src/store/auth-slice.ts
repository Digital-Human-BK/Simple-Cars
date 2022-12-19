import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginUser, NewUser, User } from "../interfaces/User";
import { BASE_URL, authEndpoints } from "./apiEndpoints";
import { RootState } from "./store";

interface UserState {
  userData: User | null;
  loading: boolean;
  error: null | undefined | string;
}

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<User, LoginUser>(
  "auth/login",
  async (loginData) => {
    try {
      const res = await fetch(BASE_URL + authEndpoints.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (res.status === 401) {
        throw new Error("Wrong Username or Password");
      }

      if (res.status === 500) {
        throw new Error("User does not exist");
      }

      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) {
        message = err.message;
      }
      throw message;
    }
  }
);

export const register = createAsyncThunk<string, NewUser>(
  "auth/register",
  async (registerData) => {
    try {
      const res = await fetch(BASE_URL + authEndpoints.register, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (res.status === 500 || res.status === 404) {
        throw new Error("User already exist");
      }

      if (res.ok) {
        return "Success";
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) {
        message = err.message;
      }
      throw message;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
    resetError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { logout, resetError } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.userData?.user;
export const selectToken = (state: RootState) => state.auth.userData?.jwtToken;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
