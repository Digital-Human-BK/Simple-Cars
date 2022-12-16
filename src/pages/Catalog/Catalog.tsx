import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import CatalogTable from "../../components/CatalogTable/CatalogTable";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useAppDispatch } from "../../store/store";
import { createCar, deleteCar, fetchAllCars, searchCars, updateCar } from "../../store/catalog-slice";
import { NewCar } from "../../interfaces/Car";

function Catalog() {
  const dispatch = useAppDispatch();
  const [isAddingCar, setIsAddingCar] = useState<boolean>(false);

  const searchHandler = useCallback((criteria: string): void => {
    const lowerCase = criteria.toLowerCase().trim();
    
    if (lowerCase === "") {
      dispatch(fetchAllCars());
    } else {
      dispatch(searchCars(lowerCase))
    }
  }, [dispatch]);

  const addCarHandler = (newCarData: NewCar) => {
    dispatch(createCar(newCarData));
  };

  const editHandler = (newCarData: NewCar) => {
    dispatch(updateCar(newCarData));
  };

  const deleteCarHandler = (carId: string) => {
    dispatch(deleteCar({carId}));
  };

  const toggleAddCarHandler = (): void => {
    setIsAddingCar((prev) => !prev);
  };

  return (
    <Box component="main">
      <NavBar />
      <SearchBar
        onSearch={searchHandler}
        isAddingCar={isAddingCar}
        toggleAddCar={toggleAddCarHandler}
      />
      <CatalogTable
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
