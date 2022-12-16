export const BASE_URL: string = "http://161.35.202.170:8080";

interface authEndpointsObject {
  login: string;
  register: string;
}

interface catalogEndpointsObject {
  [key: string]: string
}

export const authEndpoints: authEndpointsObject = {
  login: "/users/login",
  register: "/users/registerr",
};

export const catalogEndpoints: catalogEndpointsObject = {
  cars: "/cars", // + /{Id}/{userId}?
  allCars: "/cars/all",
};