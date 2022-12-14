import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

import { useAppSelector } from "../../store/store";
import { searchBarStyles } from "./styles";

type SearchBarProps = {
  onSearch: (searchCriteria: string) => void;
  isAddingCar: boolean;
  toggleAddCar: () => void;
};

function SearchBar({ onSearch, isAddingCar, toggleAddCar }: SearchBarProps) {
  const user = useAppSelector((state) => state.auth.user);

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    console.log("Warning loop");

    const debounce = setTimeout(() => {
      onSearch(search);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [search, onSearch]);

  return (
    <Grid
      container
      sx={searchBarStyles.container}
    >
      <Grid
        item
        xs={3}
      >
        <Typography
          variant="h5"
          component="h2"
          fontWeight={600}
          sx={searchBarStyles.title}
        >
          Simple Cars
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
      >
        <Box sx={searchBarStyles.searchBar}>
          <TextField
            placeholder="Search by model"
            id="search"
            type="search"
            variant="standard"
            color="info"
            value={search}
            onChange={(ev) => setSearch(ev.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  component="button"
                  position="start"
                  sx={searchBarStyles.adornment}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {user && (
            <IconButton onClick={toggleAddCar}>
              {isAddingCar ? (
                <DoNotDisturbOnIcon color="secondary" />
              ) : (
                <AddBoxIcon color="success" />
              )}
            </IconButton>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
