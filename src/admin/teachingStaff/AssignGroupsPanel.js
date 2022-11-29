import { Button, Grid } from "@mui/material";
import React from "react";
import GroupInputField from "./GroupInputPanel";

const AssignGroupsPanel = ({
  setStep,
  setWyklad,
  setCwicz,
  setLab,
  setProj,
  setSemin,
  maxWyklad,
  maxSemin,
  maxCwicz,
  maxLab,
  maxProj,
}) => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <GroupInputField
            isDisabled={maxWyklad === 0.0 ? true : false}
            labelContent={"Wykład:"}
            setValue={setWyklad}
            maxAmount={maxWyklad}
          />
        </Grid>
        <Grid item>
          <GroupInputField
            isDisabled={maxCwicz === 0.0 ? true : false}
            labelContent={"Ćwiczenia:"}
            setValue={setCwicz}
            maxAmount={maxCwicz}
          />
        </Grid>
        <Grid item>
          <GroupInputField
            isDisabled={maxLab === 0.0 ? true : false}
            labelContent={"Laboratorium:"}
            setValue={setLab}
            maxAmount={maxLab}
          />
        </Grid>
        <Grid item>
          <GroupInputField
            isDisabled={maxProj === 0.0 ? true : false}
            labelContent={"Projekt:"}
            setValue={setProj}
            maxAmount={maxProj}
          />
        </Grid>
        <Grid item>
          <GroupInputField
            isDisabled={maxSemin === 0.0 ? true : false}
            labelContent={"Seminarium:"}
            setValue={setSemin}
            maxAmount={maxSemin}
          />
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={6}
          >
            <Button sx={{ mt: 8 }} onClick={() => setStep(1)}>
              Cofnij
            </Button>
            <Button sx={{ mt: 8 }} onClick={() => setStep(3)}>
              Dalej
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AssignGroupsPanel;
