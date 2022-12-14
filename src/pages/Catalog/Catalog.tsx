import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import CatalogTable from "../../components/CatalogTable/CatalogTable";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";

import { Car } from "../../interfaces/Car";

const mockData = [
  {
    id: "0",
    make: "Honda",
    model: "S2000",
    year: 2002,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 240,
    color: "red",
    price: 13000,
    city: "London",
    mileage: 60000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f1",
      username: "MikeLP",
      password: "11111",
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "hardtop",
  },
  {
    id: "1",
    make: "Honda",
    model: "NSX",
    year: 1995,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 298,
    color: "red",
    price: 43000,
    city: "London",
    mileage: 100000,
    user: {
      id: "77637bb4-77c5-4b4a-a3ae-0f53fa4f3ec9",
      username: "SullyG",
      password: "11111",
      firstName: "Sully",
      lastName: "Erna",
    },
    extras: "hardtop",
  },
  {
    id: "2",
    make: "Honda",
    model: "S2000",
    year: 2002,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 240,
    color: "red",
    price: 13000,
    city: "London",
    mileage: 60000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f1",
      username: "MikeLP",
      password: "11111",
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "hardtop",
  },
  {
    id: "3",
    make: "Honda",
    model: "S2000",
    year: 2002,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 240,
    color: "red",
    price: 13000,
    city: "London",
    mileage: 60000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f1",
      username: "MikeLP",
      password: "11111",
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "hardtop",
  },
  {
    id: "4",
    make: "Honda",
    model: "S2000",
    year: 2002,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 240,
    color: "red",
    price: 13000,
    city: "London",
    mileage: 60000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f1",
      username: "MikeLP",
      password: "11111",
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "hardtop",
  },
  {
    id: "5",
    make: "Honda",
    model: "S2000",
    year: 2002,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 240,
    color: "red",
    price: 13000,
    city: "London",
    mileage: 60000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f1",
      username: "MikeLP",
      password: "11111",
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "hardtop",
  },
  {
    id: "6",
    make: "Honda",
    model: "S2000",
    year: 2002,
    engineType: "PETROL",
    gearBox: "MANUAL",
    condition: "NEW",
    horsePower: 240,
    color: "red",
    price: 13000,
    city: "London",
    mileage: 60000,
    user: {
      id: "c8c17b7a-b922-4c16-b0a2-a06f3afda2f1",
      username: "MikeLP",
      password: "11111",
      firstName: "Mike",
      lastName: "Shinoda",
    },
    extras: "hardtop",
  },
];

function Catalog() {
  const [carData, setCarData] = useState<Car[]>(mockData);
  const [isAddingCar, setIsAddingCar] = useState<boolean>(false);

  const searchHandler = useCallback((criteria: string): void => {
    // if (criteria.trim() === "") {
    //   setCarData(mockData);
    // } else {
    //   const searchResults = mockData.filter(
    //     (item) =>
    //       item.model.toLocaleLowerCase() === criteria.toLocaleLowerCase()
    //   );
    //   setCarData(searchResults);
    // }
    const lowerCase = criteria.toLowerCase().trim();
      if (lowerCase === '') {
        setCarData(mockData);
      } else {
        console.log(lowerCase);
        
        const filteredData = mockData.filter((item) => {
          return Object.values(item).some((v) =>
            v.toString().toLowerCase().includes(lowerCase)
          );
        });
        setCarData(filteredData);
      }
  }, []);

  const addCarHandler = (newCarData: any) => {
    newCarData.year = Number(newCarData.year);
    newCarData.horsePower = Number(newCarData.horsePower);
    newCarData.price = Number(newCarData.price);
    newCarData.mileage = Number(newCarData.mileage);

    setCarData((prevData) => [newCarData, ...prevData]);
  };

  const editHandler = (newCarData: any) => {
    newCarData.year = Number(newCarData.year);
    newCarData.horsePower = Number(newCarData.horsePower);
    newCarData.price = Number(newCarData.price);
    newCarData.mileage = Number(newCarData.mileage);

    const updatedData = carData.map((car) =>
      car.id !== newCarData.id ? car : newCarData
    );

    setCarData(updatedData);
  };

  const deleteCarHandler = (id: string) => {
    const filteredCarData = carData.filter((car) => car.id !== id);
    setCarData(filteredCarData);
  };

  const toggleAddCarHandler = (): void => {
    setIsAddingCar((prev) => !prev);
  };

  return (
    <Box component={"main"}>
      <NavBar />
      <SearchBar
        onSearch={searchHandler}
        isAddingCar={isAddingCar}
        toggleAddCar={toggleAddCarHandler}
      />
      <CatalogTable
        carData={carData}
        isAddingCar={isAddingCar}
        toggleMenu={toggleAddCarHandler}
        onAddNewData={addCarHandler}
        onDataEdit={editHandler}
        onDeleteData={deleteCarHandler}
      />
    </Box>
  );
}

export default Catalog;
