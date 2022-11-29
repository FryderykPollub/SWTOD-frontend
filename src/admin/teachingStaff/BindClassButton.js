import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  Tooltip,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useLocalStorage } from "../../util/useLocalStorage";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import ShowSearchedUserPanel from "./ShowSearchedUserPanel";
import ShowSearchedSubjectPanel from "./ShowSearchedSubjectPanel";
import AssignGroupsPanel from "./AssignGroupsPanel";
import SubmitPanel from "./SubmitPanel";
import CloseIcon from "@mui/icons-material/Close";

const BindClassButton = ({ rokAkadem, setReload }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState(0);

  const [wyklad, setWyklad] = useState("");
  const [semin, setSemin] = useState("");
  const [cwicz, setCwicz] = useState("");
  const [lab, setLab] = useState("");
  const [proj, setProj] = useState("");
  const [maxWyklad, setMaxWyklad] = useState("");
  const [maxSemin, setMaxSemin] = useState("");
  const [maxCwicz, setMaxCwicz] = useState("");
  const [maxLab, setMaxLab] = useState("");
  const [maxProj, setMaxProj] = useState("");

  function loadUsers() {
    let statusResponse;

    fetchApi(BASE_URL + "/api/user/all", "GET", jwt, null)
      .then((res) => {
        statusResponse = res.status;
        return res.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setUsers(body);
        } else {
          setErrorMessage(body.message);
          setErrorOpen(true);
        }
      });
  }

  function loadSubjects() {
    let statusResponse;

    fetchApi(
      BASE_URL +
        `/api/plan-year-subject/academic-year?academicYear=${rokAkadem}`,
      "GET",
      jwt,
      null
    )
      .then((res) => {
        statusResponse = res.status;
        return res.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setSubjects(body);
        } else {
          setErrorMessage(body.message);
          setErrorOpen(true);
        }
      });
  }

  useEffect(() => {
    loadUsers();
    loadSubjects();
  }, []);

  return (
    <>
      <Tooltip title="Przypisz przedmiot do prowadzącego" enterDelay={500}>
        <IconButton
          onClick={() => {
            setOpen(true);
            setStep(0);
          }}
        >
          <AddBoxIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} maxWidth={"md"} fullWidth>
        <DialogTitle>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ ml: 3 }}
          >
            <Grid item>
              <Typography
                noWrap
                variant="h4"
                align="center"
                m={2}
                mr={6}
                ml={6}
              >
                Przypisz przedmiot do prowadzącego
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={step} sx={{ mt: 3, mb: 3 }}>
              <Step key={0}>
                <StepLabel>Wybór prowadzącego</StepLabel>
              </Step>
              <Step key={1}>
                <StepLabel>Wybór przedmiotu</StepLabel>
              </Step>
              <Step key={2}>
                <StepLabel>Przypisanie godzin</StepLabel>
              </Step>
              <Step key={3}>
                <StepLabel>Podsumowanie</StepLabel>
              </Step>
            </Stepper>
            <Box>
              {step === 0 ? (
                <Grid container direction="column" spacing={0.5}>
                  {users.map((el) => (
                    <Grid item>
                      <ShowSearchedUserPanel
                        id={el.id}
                        tytul={el.title}
                        imie={el.name}
                        nazwisko={el.surname}
                        setStep={setStep}
                        setUserId={setUserId}
                        key={el.id}
                      />
                    </Grid>
                  ))}

                  <Button sx={{ mt: 2 }} onClick={() => setOpen(false)}>
                    Anuluj
                  </Button>
                </Grid>
              ) : step === 1 ? (
                <>
                  <Grid container direction="column" spacing={0.5}>
                    {subjects.map((el) => (
                      <Grid item>
                        <ShowSearchedSubjectPanel
                          subjectId={el.subjectId}
                          wydzial={el.facultyName}
                          nazwa={el.subjectName}
                          kierunek={el.fieldOfStudiesName}
                          rodzajSt={el.typeOfStudiesName}
                          rokSt={el.year}
                          setSubjectId={setSubjectId}
                          setStep={setStep}
                          maxWyklad={el.groupsPerLecture}
                          maxSemin={el.groupsPerSeminary}
                          maxCwicz={el.groupsPerExercise}
                          maxLab={el.groupsPerLaboratory}
                          maxProj={el.groupsPerProject}
                          setMaxWyklad={setMaxWyklad}
                          setMaxSemin={setMaxSemin}
                          setMaxCwicz={setMaxCwicz}
                          setMaxLab={setMaxLab}
                          setMaxProj={setMaxProj}
                          key={el.subjectId}
                        />
                      </Grid>
                    ))}

                    <Button sx={{ mt: 2 }} onClick={() => setStep(0)}>
                      Cofnij
                    </Button>
                  </Grid>
                </>
              ) : step === 2 ? (
                <AssignGroupsPanel
                  setStep={setStep}
                  setWyklad={setWyklad}
                  setCwicz={setCwicz}
                  setLab={setLab}
                  setProj={setProj}
                  setSemin={setSemin}
                  maxWyklad={maxWyklad}
                  maxSemin={maxSemin}
                  maxCwicz={maxCwicz}
                  maxLab={maxLab}
                  maxProj={maxProj}
                />
              ) : (
                <>
                  <SubmitPanel
                    setStep={setStep}
                    setOpen={setOpen}
                    userId={userId}
                    subjectId={subjectId}
                    wyklad={wyklad}
                    cwicz={cwicz}
                    lab={lab}
                    proj={proj}
                    semin={semin}
                    setReload={setReload}
                  />
                </>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Błąd</AlertTitle>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BindClassButton;
