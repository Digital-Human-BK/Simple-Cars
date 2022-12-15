export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  engineType: string;
  gearBox: string;
  condition: string;
  horsePower: number;
  color: string;
  price: number;
  city: string;
  mileage: number;
  user: {
    id: string;
    username: string;
    password: string | null;
    firstName: string | null;
    lastName: string;
  };
  extras: string;
}

export interface NewCar {
  id: string;
  make: string;
  model: string;
  year: string | number;
  engineType: string;
  gearBox: string;
  condition: string;
  horsePower: string | number;
  color: string;
  price: string | number;
  city: string;
  mileage: string | number;
  user: {
    id: string;
    username: string;
    password: string | null;
    firstName: string;
    lastName: string;
  };
  extras: string;
}
