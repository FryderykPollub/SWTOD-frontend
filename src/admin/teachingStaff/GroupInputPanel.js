import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

const GroupInputField = ({ isDisabled, labelContent, setValue, maxAmount }) => {
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="end"
        spacing={4}
      >
        <Grid item>
          <Typography>{labelContent}</Typography>
        </Grid>
        <Grid item>
          <TextField
            disabled={isDisabled}
            label="Liczba grup"
            variant="standard"
            onChange={(e) => setValue(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item>/ {maxAmount}</Grid>
      </Grid>
    </>
  );
};

export default GroupInputField;
