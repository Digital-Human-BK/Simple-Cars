import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { useAppSelector } from "../../../store/store";
import {
  selectCatalogError,
  selectCatalogLoading,
} from "../../../store/catalog-slice";

function CatalogTableNotification() {
  const loading = useAppSelector(selectCatalogLoading);
  const error = useAppSelector(selectCatalogError);

  return (
    <TableRow>
      <TableCell
        colSpan={13}
        sx={{ height: "400px", fontSize: "2rem", textAlign: "center" }}
      >
        {error && error}
        {loading && "Loading data..."}
        {!error && !loading && "No Data Found"}
      </TableCell>
    </TableRow>
  );
}

export default CatalogTableNotification;
