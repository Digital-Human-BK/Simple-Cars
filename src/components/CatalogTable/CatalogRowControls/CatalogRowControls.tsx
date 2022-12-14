import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



//to be used when catalog-slice is done
type ControlsProps = {
  toggleAdd: () => void;
  onAddCar: () => void;
};

function CatalogRowControls({ toggleAdd, onAddCar }: ControlsProps) {
  return (
    <Box>
      <DoneIcon
        onClick={onAddCar}
        sx={{ mr: "5px", cursor: "pointer" }}
      />

      <CloseIcon
        onClick={toggleAdd}
        sx={{ cursor: "pointer" }}
      />
    </Box>
  );
}

export default CatalogRowControls;
