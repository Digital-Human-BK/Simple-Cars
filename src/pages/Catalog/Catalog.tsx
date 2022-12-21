import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import CatalogTable from "../../components/CatalogTable/CatalogTable";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useAppDispatch } from "../../store/store";
import { fetchAllCars } from "../../store/catalog-slice";

function Catalog() {
  const dispatch = useAppDispatch();
  const [isAddingCar, setIsAddingCar] = useState<boolean>(false);

  const toggleAddCarHandler = (): void => {
    setIsAddingCar((prev) => !prev);
  };

  // useEffect(() => {
  //   dispatch(fetchAllCars());
  // }, [dispatch]);

  return (
    <Box component="main">
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
