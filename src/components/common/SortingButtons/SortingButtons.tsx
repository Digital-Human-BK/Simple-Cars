import Box from "@mui/material/Box";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useAppDispatch } from "../../../store/store";
import { sortCars } from "../../../store/catalog-slice";

type SortingButtonsProps = {
  sortBy: string;
};

function SortingButtons({ sortBy }: SortingButtonsProps) {
  const dispatch = useAppDispatch();

  const handleAscendingSort = () => {
    dispatch(sortCars({ order: "asc", key: sortBy }));
  };

  const handleDescendingSort = () => {
    dispatch(sortCars({ order: "desc", key: sortBy }));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", ml: "5px" }}>
      <Box
        component="span"
        sx={{
          width: "10px",
          height: "10px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ArrowDropUpOutlinedIcon
          sx={{ cursor: "pointer" }}
          fontSize="medium"
          color="primary"
          onClick={handleAscendingSort}
        />
      </Box>
      <Box
        component="span"
        sx={{
          width: "10px",
          height: "10px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ArrowDropDownOutlinedIcon
          sx={{ cursor: "pointer" }}
          fontSize="medium"
          color="primary"
          onClick={handleDescendingSort}
        />
      </Box>
    </Box>
  );
}

export default SortingButtons;
