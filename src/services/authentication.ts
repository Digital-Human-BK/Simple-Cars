import { BASE_URL, authEndpoints } from "../api/api";

type userLogin = {
  username: string;
  password: string;
};

type userRegister = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
};

export async function login(loginData: userLogin) {
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
    throw error.message;
  }
}

export async function register(registerData: userRegister) {
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
      console.log("Success");
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error: any) {
    throw error.message;
  }
}
