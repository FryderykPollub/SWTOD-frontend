import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useEffect } from "react";

const ShowSearchedUserPanel = ({
  id,
  tytul,
  imie,
  nazwisko,
  setStep,
  setUserId,
}) => {
  function handleClick() {
    setUserId(id);
    setStep(1);
  }

  return (
    <>
      <Card>
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography fontSize={16} color="lightslategray">
                {tytul}
              </Typography>
            </Grid>
            <Grid item>
              <Typography fontSize={22}>
                {imie} {nazwisko}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Wybierz tego prowadzącego">
                <IconButton size="small" onClick={() => handleClick()}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ShowSearchedUserPanel;
