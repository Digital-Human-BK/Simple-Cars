import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Car, NewCar } from "../interfaces/Car";
import { BASE_URL, catalogEndpoints } from "../constants/apiEndpoints";
import { RootState } from "./store";

const mockData: Car[] = [
  {
    id: "1",
    make: "Honda",
    model: "Accord",
    year: 2004,
    engineType: "DIESEL",
    gearBox: "AUTOMATIC",
    condition: "NEW",
    horsePower: 144,
    color: "gunmetal",
    price: 6000,
    city: "Pleven",
    mileage: 320000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f11",
      username: "MikeLP",
      password: null,
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "economic",
  },
  {
    id: "2",
    make: "Toyota",
    model: "Prius",
    year: 2011,
    engineType: "HYBRID",
    gearBox: "AUTOMATIC",
    condition: "USED",
    horsePower: 112,
    color: "white",
    price: 16000,
    city: "Sofia",
    mileage: 530000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f11",
      username: "MikeLP",
      password: null,
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "economic",
  },
  {
    id: "3",
    make: "Mercedes",
    model: "S-class",
    year: 2019,
    engineType: "Petrol",
    gearBox: "AUTOMATIC",
    condition: "NEW",
    horsePower: 450,
    color: "black",
    price: 160000,
    city: "Burgas",
    mileage: 10000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f11",
      username: "MikeLP",
      password: null,
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "power",
  },
];

interface CatalogState {
  cars: Car[];
  filteredCars: Car[]
  loading: boolean;
  error: null | string | undefined;
}

const initialState: CatalogState = {
  cars: mockData,
  filteredCars: mockData,
  loading: false,
  error: null,
};

export const fetchAllCars = createAsyncThunk<Car[]>(
  "catalog/fetchAllCars",
  async () => {
    try {
      const response = await fetch(BASE_URL + catalogEndpoints.allCars);

      if (response.ok === false) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) {
        message = err.message;
      }
      throw message;
    }
  }
);

export const createCar = createAsyncThunk<Car, NewCar | Car>(
  "catalog/createCar",
  async (carData: NewCar | Car, thunkAPI) => {
    carData.year = Number(carData.year);
    carData.horsePower = Number(carData.horsePower);
    carData.price = Number(carData.price);
    carData.mileage = Number(carData.mileage);

    try {
      const state = thunkAPI.getState() as RootState;
      const token = state.auth.userData?.jwtToken;

      if (!token) {
        throw new Error("Unauthorized");
      }

      const res = await fetch(BASE_URL + catalogEndpoints.cars, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(carData),
      });

      if (res.ok === false) {
        throw new Error("Something went wrong!");
      }

      return res.json();
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) {
        message = err.message;
      }
      throw message;
    }
  }
);

export const updateCar = createAsyncThunk<Car, NewCar | Car>(
  "catalog/updateCar",
  async (updatedCarData: NewCar | Car, thunkAPI) => {
    updatedCarData.year = Number(updatedCarData.year);
    updatedCarData.horsePower = Number(updatedCarData.horsePower);
    updatedCarData.price = Number(updatedCarData.price);
    updatedCarData.mileage = Number(updatedCarData.mileage);

    try {
      const store = thunkAPI.getState() as RootState;
      const token = store.auth.userData?.jwtToken;
      const userId = store.auth.userData?.user.id;

      if (!token) {
        throw new Error("Unauthorized");
      }

      const res = await fetch(BASE_URL + catalogEndpoints.cars + `/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCarData),
      });

      if (res.ok === false) {
        throw new Error("Something went wrong!");
      }

      return res.json();
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) {
        message = err.message;
      }
      throw message;
    }
  }
);

export const deleteCar = createAsyncThunk<string, { carId: string }>(
  "catalog/deleteCar",
  async ({ carId }, thunkAPI) => {
    try {
      const store = thunkAPI.getState() as RootState;
      const token = store.auth.userData?.jwtToken;
      const userId = store.auth.userData?.user.id;

      if (!token) {
        throw new Error("Unauthorized");
      }

      const res = await fetch(
        BASE_URL + catalogEndpoints.cars + `/${carId}/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        return carId;
      } else {
        throw new Error("Something went wrong");
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

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    searchCars(state, action) {
      if (action.payload === "") {
        state.filteredCars = [...state.cars];
      } else {
        state.filteredCars = state.cars.filter((item) => {
          return Object.values(item).some((v) =>
            v.toString().toLowerCase().includes(action.payload)
          );
        });
      }
    },
    sortCars(state, action) {
      state.filteredCars.sort((a, b) => {
        let key: string = action.payload.key;
        let order: string = action.payload.order;
        let valueA = a[key as keyof Car];
        let valueB = b[key as keyof Car];
        if (order === "asc") {
          return valueA < valueB ? -1 : 1;
        }
        if (order === "desc") {
          return valueA > valueB ? -1 : 1;
        }
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    //fetch all cars
    builder.addCase(fetchAllCars.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCars.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.cars = action.payload;
    });
    builder.addCase(fetchAllCars.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // create new car
    builder.addCase(createCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCar.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.cars.unshift(action.payload);
    });
    builder.addCase(createCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // update car
    builder.addCase(updateCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCar.fulfilled, (state, action) => {
      state.cars = state.cars.map((car) =>
        car.id !== action.payload.id ? car : action.payload
      );
      state.error = null;
      state.loading = false;
    });
    builder.addCase(updateCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //delete car
    builder.addCase(deleteCar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
      state.error = null;
      state.loading = false;
    });
    builder.addCase(deleteCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { searchCars, sortCars } = catalogSlice.actions;
export const selectAllCars = (state: RootState) => state.catalog.filteredCars;
export const selectCatalogLoading = (state: RootState) => state.catalog.loading;
export const selectCatalogError = (state: RootState) => state.catalog.error;

export default catalogSlice.reducer;
