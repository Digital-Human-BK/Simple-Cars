import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../interfaces/User";
import { BASE_URL, authEndpoints } from "../api/api";

interface UserState {
  user: User | null;
  loading: boolean;
  error: any; //null | string;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<User, Object>(
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

      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error: any) {
      return error.message;
    }
  }
);
export const register = createAsyncThunk<User, Object>(
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

      if (res.status === 500) {
        throw new Error("User already exist");
      }

      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error: any) {
      return error.message;
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
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice;
