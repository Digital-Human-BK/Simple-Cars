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