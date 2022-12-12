import Box from "@mui/material/Box";
import CatalogTable from "../../components/CatalogTable/CatalogTable";
import NavBar from "../../components/NavBar/NavBar";

function Catalog() {
  return (
    <Box component={"main"}>
      <NavBar />
      <CatalogTable />
    </Box>
  );
}

export default Catalog;
