export const BASE_URL: string = "http://161.35.202.170:8080"; 

export const authEndpoints = {
  login: "/users/login",
  register: "/users/register"
};

 export const carEndpoints = {
  car: "/cars", // + /{Id}/{userId}?
  cars: "/cars",
  allCars: "/cars/all"
}

