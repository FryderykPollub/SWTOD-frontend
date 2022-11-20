import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import { useLocalStorage } from "../../util/useLocalStorage";
import GroupInputField from "./GroupInputPanel";

const AssignGroupsPanel = ({
  setStep,
  subjectId,
  setWyklad,
  setCwicz,
  setLab,
  setProj,
  setSemin,
}) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [subject, setSubject] = useState("");

  function getSubjectById() {
    let statusResponse;

    fetchApi(BASE_URL + `/api/plan-year-subject/${subjectId}`, "GET", jwt, null)
      .then((response) => {
        statusResponse = response.status;
        return response.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setSubject(body);
        }
      });
  }

  useEffect(() => {
    getSubjectById();
  }, [subjectId]);
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
            isDisabled={subject.groupsPerLecture === 0.0 ? true : false}
            labelContent={"Wykład:"}
            setValue={setWyklad}
            maxAmount={subject.groupsPerLecture}
          />
        </Grid>
        <Grid item>
          <GroupInputField
            isDisabled={subject.groupsPerExercise === 0.0 ? true : false}
            labelContent={"Ćwiczenia:"}
            setValue={setCwicz}
            maxAmount={subject.groupsPerExercise}
          />
        </Grid>
        <Grid item>
          <GroupInputField
            isDisabled={subject.groupsPerLaboratory === 0.0 ? true : false}
            labelContent={"Laboratorium:"}
            setValue={setLab}
            maxAmount={subject.groupsPerLaboratory}
          />
        </Grid>
        <Grid item>
          <GroupInputField
            isDisabled={subject.groupsPerProject === 0.0 ? true : false}
            labelContent={"Projekt:"}
            setValue={setProj}
            maxAmount={subject.groupsPerProject}
          />
        </Grid>
        <Grid item>
          <GroupInputField
            isDisabled={subject.groupsPerSeminary === 0.0 ? true : false}
            labelContent={"Seminarium:"}
            setValue={setSemin}
            maxAmount={subject.groupsPerSeminary}
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
