import { Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const GroupInputField = ({ isDisabled, labelContent, setValue, maxAmount }) => {
  const [tempValue, setTempValue] = useState("");

  function validate(val) {
    if (val >= 0 && val <= maxAmount) {
      setValue(val);
      setTempValue(val);
    } else {
      if (val < 0) {
        setValue(0);
        setTempValue(0);
      } else if (val > maxAmount) {
        setValue(maxAmount);
        setTempValue(maxAmount);
      } else {
        setValue(0);
        setTempValue(0);
      }
    }
  }

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
            value={tempValue}
            onChange={(e) => validate(e.target.value)}
            size="small"
          />
        </Grid>
        <Grid item>/ {maxAmount}</Grid>
      </Grid>
    </>
  );
};

export default GroupInputField;
