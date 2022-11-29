import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import { useLocalStorage } from "../../util/useLocalStorage";

const SubmitPanel = ({
  setStep,
  setOpen,
  userId,
  subjectId,
  wyklad,
  cwicz,
  lab,
  proj,
  semin,
  setReload,
}) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [subject, setSubject] = useState("");
  const [user, setUser] = useState("");

  function handleSubmit() {
    const reqBody = {
      lectureGroupsNumber: wyklad,
      exerciseGroupsNumber: cwicz,
      laboratoryGroupsNumber: lab,
      projectGroupsNumber: proj,
      seminaryGroupsNumber: semin,
    };

    fetchApi(
      BASE_URL +
        `/api/plan-year-subject-user/assign-groups?userId=${userId}&subjectId=${subjectId}`,
      "POST",
      jwt,
      reqBody
    ).then((response) => {
      console.log(response.status);
    });

    setReload(true);
    setOpen(false);
    setStep(0);
  }

  function getUserById() {
    let statusResponse;

    fetchApi(BASE_URL + `/api/user/${userId}`, "GET", jwt, null)
      .then((response) => {
        statusResponse = response.status;
        return response.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setUser(body);
        }
      });
  }

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

  useEffect(() => {
    getUserById();
  }, [userId]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        <Grid item>
          <Card>
            <CardContent>
              <Typography align="center" color="lightsalmon" sx={{ mb: 1.5 }}>
                Dane prowadzącego
              </Typography>
              <Typography>Tytuł: {user.title}</Typography>
              <Typography>Imię: {user.name}</Typography>
              <Typography>Nazwisko: {user.surname}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Typography align="center" color="lightsalmon" sx={{ mb: 1.5 }}>
                Dane przedmiotu
              </Typography>
              <Typography>Nazwa przedmiotu: {subject.subjectName}</Typography>
              <Typography>Wydział: {subject.facultyName}</Typography>
              <Typography>Kierunek: {subject.fieldOfStudiesName}</Typography>
              <Typography>
                Rodzaj studiów: {subject.typeOfStudiesName}
              </Typography>
              <Typography>Rok studiów: {subject.year}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Typography align="center" color="lightsalmon" sx={{ mb: 1.5 }}>
                Przypisane godziny
              </Typography>
              <Typography>Wykład: {wyklad ? wyklad : 0}</Typography>
              <Typography>Ćwiczenia: {cwicz ? cwicz : 0}</Typography>
              <Typography>Laboratorium: {lab ? lab : 0}</Typography>
              <Typography>Projekt: {proj ? proj : 0}</Typography>
              <Typography>Seminarium: {semin ? semin : 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={10}
        sx={{ mt: -6.5 }}
      >
        <Grid item>
          <Button onClick={() => setStep(2)}>Cofnij</Button>
        </Grid>
        <Grid item>
          <Button onClick={() => handleSubmit()}>Potwierdź</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SubmitPanel;
