import { useState, useCallback, useEffect } from "react";

import Box from "@mui/material/Box";
import CatalogTable from "../../components/CatalogTable/CatalogTable";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useAppDispatch } from "../../store/store";
import { fetchAllCars, searchCars } from "../../store/catalog-slice";

function Catalog() {
  const dispatch = useAppDispatch();
  const [isAddingCar, setIsAddingCar] = useState<boolean>(false);

  const searchHandler = useCallback(
    (criteria: string): void => {
      const lowerCase = criteria.toLowerCase().trim();

      if (lowerCase === "") {
        dispatch(fetchAllCars());
      } else {
        dispatch(searchCars(lowerCase));
      }
    },
    [dispatch]
  );

  const toggleAddCarHandler = (): void => {
    setIsAddingCar((prev) => !prev);
  };

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

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
      />
    </Box>
  );
}

export default Catalog;
