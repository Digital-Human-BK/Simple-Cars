export interface Car {
    id: string,
    make: string,
    model: string,
    year: number,
    engineType: string,
    gearBox: string,
    condition: string,
    horsePower: number,
    color: string,
    price: number,
    city: string,
    mileage: number,
    user: {
      id: string,
      username: string,
      password: string,
      firstName: string | null,
      lastName: string,
    },
    extras: string,
}