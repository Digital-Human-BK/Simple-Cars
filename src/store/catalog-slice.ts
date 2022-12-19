import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Car, NewCar } from "../interfaces/Car";
import { BASE_URL, catalogEndpoints } from "../constants/apiEndpoints";
import { RootState } from "./store";

interface CatalogState {
  cars: Car[];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: CatalogState = {
  cars: [],
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

export const createCar = createAsyncThunk<Car, NewCar>(
  "catalog/createCar",
  async (carData: NewCar, thunkAPI) => {
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

      if(res.ok === false) {
        throw new Error("Something went wrong!")
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

export const updateCar = createAsyncThunk<Car, NewCar>(
  "catalog/updateCar",
  async (updatedCarData: NewCar, thunkAPI) => {
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

      if(res.ok === false) {
        throw new Error("Something went wrong!")
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
      state.cars = state.cars.filter((item) => {
        return Object.values(item).some((v) =>
          v.toString().toLowerCase().includes(action.payload)
        );
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

export const { searchCars } = catalogSlice.actions;
export const selectAllCars = (state: RootState) => state.catalog.cars;
export const selectCatalogLoading = (state: RootState) => state.catalog.loading;
export const selectCatalogError = (state: RootState) => state.catalog.error;

export default catalogSlice.reducer;
