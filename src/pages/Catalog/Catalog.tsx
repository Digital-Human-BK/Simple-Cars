import { useState, useEffect } from "react";

import Box from "@mui/material/Box";

import NavBar from "../../components/NavBar/NavBar";
import Toast from "../../components/common/Toast/Toast";
import SearchBar from "../../components/SearchBar/SearchBar";
import CatalogTable from "../../components/CatalogTable/CatalogTable";

import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchAllCars, selectCatalogError } from "../../store/catalog-slice";

function Catalog() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectCatalogError);
  const [isAddingCar, setIsAddingCar] = useState<boolean>(false);

  const toggleAddCarHandler = (): void => {
    setIsAddingCar((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  return (
    <Box component="main">
      <Toast
        error={error}
        loading={false}
      />
      <NavBar />
      <SearchBar
        isAddingCar={isAddingCar}
        toggleAddCar={toggleAddCarHandler}
      />
      <CatalogTable
        isAddingCar={isAddingCar}
        toggleMenu={toggleAddCarHandler}
      />
    </Box>
  );
}

export default Catalog;
