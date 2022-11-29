import {
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import React, { useState } from "react";

const Filters = ({ setName, setSubject }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  function setFilters() {
    setName(nameFilter);
    setSubject(subjectFilter);
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3 }}
        spacing={2}
      >
        <Grid item>
          <Typography>Filtry:</Typography>
        </Grid>
        <Grid item>
          <TextField
            size="small"
            margin="normal"
            name="nameFilter"
            label="Imię i nazwisko"
            id="nameFilter"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            margin="normal"
            name="subjectFilter"
            label="Nazwa przedmiotu"
            id="subjectFilter"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Tooltip title="">
            <IconButton onClick={() => setFilters()}>
              <FilterAltIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </>
  );
};

export default Filters;
