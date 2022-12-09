export const BASE_URL: string = "http://161.35.202.170:8080";

interface authEndpointsObject {
  login: string;
  register: string;
}

interface carEndpointsObject {
  [key: string]: string
}

export const authEndpoints: authEndpointsObject = {
  login: "/users/login",
  register: "/users/register",
};

export const carEndpoints: carEndpointsObject = {
  car: "/cars", // + /{Id}/{userId}?
  cars: "/cars",
  allCars: "/cars/all",
};

interface LooseObject {
  [key: string]: any
}

export async function get(url: string) {
  return request(url, createOptions());
}

export async function post(url: string, data: LooseObject) {
  return request(url, createOptions("POST", data));
}

export async function put(url: string, data: LooseObject) {
  return request(url, createOptions("PUT", data));
}

export async function del(url: string) {
  return request(url, createOptions("DELETE"));
}

async function request(url: string, options: {} ) {
  try {
    const response = await fetch(BASE_URL + url, options);

    if (response.ok === false) {
      const error = await response.json();
      throw error;
    }

    return response.json();
  } catch (err) {
    throw err;
  }
}

function createOptions(method = "GET", data?: {}) {
  const options: LooseObject = {
    method,
    headers: {},
  };

  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  return options;
}
