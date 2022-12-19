import { Car, NewCar } from "../interfaces/Car";

export function validateAddCar(carData: NewCar | Car) {
  return Object.values(carData).every((value) => Boolean(value) !== false);
}
