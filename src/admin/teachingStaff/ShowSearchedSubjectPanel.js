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

const ShowSearchedSubjectPanel = ({
  subjectId,
  wydzial,
  nazwa,
  kierunek,
  rodzajSt,
  rokSt,
  setSubjectId,
  setStep,
  maxWyklad,
  maxSemin,
  maxCwicz,
  maxLab,
  maxProj,
  setMaxWyklad,
  setMaxSemin,
  setMaxCwicz,
  setMaxLab,
  setMaxProj,
}) => {
  function handleClick() {
    setSubjectId(subjectId);
    setStep(2);
    setMaxWyklad(maxWyklad);
    setMaxSemin(maxSemin);
    setMaxCwicz(maxCwicz);
    setMaxLab(maxLab);
    setMaxProj(maxProj);
  }

  return (
    <>
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <Typography fontSize={22}>{nazwa}</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1.5}
            >
              <Grid item>
                <Typography fontSize={16}>Wydział: {wydzial}</Typography>
              </Grid>
              <Grid item>
                <Typography fontSize={16}>
                  Kierunek: {kierunek}
                  {rodzajSt}
                </Typography>
              </Grid>
              <Grid item>
                <Typography fontSize={16}>rok: {rokSt}</Typography>
              </Grid>
              <Grid item>
                <Tooltip title="Wybierz ten przedmiot">
                  <IconButton size="small" onClick={() => handleClick()}>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default ShowSearchedSubjectPanel;
