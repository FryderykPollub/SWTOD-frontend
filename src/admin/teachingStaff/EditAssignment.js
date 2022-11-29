import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../util/useLocalStorage";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import GroupInputField from "./GroupInputPanel";

const EditAssignment = ({ setReload, userId, subjectId, rokAkadem }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [wyklad, setWyklad] = useState("");
  const [semin, setSemin] = useState("");
  const [cwicz, setCwicz] = useState("");
  const [lab, setLab] = useState("");
  const [proj, setProj] = useState("");
  const [allSubjects, setAllSubjects] = useState([]);

  const [maxWyklad, setMaxWyklad] = useState(0);
  const [maxCwicz, setMaxCwicz] = useState(0);
  const [maxLab, setMaxLab] = useState(0);
  const [maxProj, setMaxProj] = useState(0);
  const [maxSemin, setMaxSemin] = useState(0);

  function setMaxAmounts() {
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
          setAllSubjects(body);
        } else {
          setAllSubjects([]);
        }
      });

    if (allSubjects !== []) {
      allSubjects.map((el) => {
        if (el.subjectId === subjectId) {
          setMaxWyklad(el.groupsPerLecture);
          setMaxSemin(el.groupsPerSeminary);
          setMaxCwicz(el.groupsPerExercise);
          setMaxLab(el.groupsPerLaboratory);
          setMaxProj(el.groupsPerProject);
        }
      });
    }
  }

  useEffect(() => {
    setMaxAmounts();
  }, [open]);

  function sendRequest() {
    const reqBody = {
      lectureGroupsNumber: wyklad,
      exerciseGroupsNumber: cwicz,
      laboratoryGroupsNumber: lab,
      projectGroupsNumber: proj,
      seminaryGroupsNumber: semin,
    };

    fetchApi(
      BASE_URL +
        `/api/plan-year-subject-user/change-assignment?userId=${userId}&subjectId=${subjectId}`,
      "PUT",
      jwt,
      reqBody
    ).then((res) => {
      if (res.status === 200) {
        setOpenInfo(true);
      } else {
        setOpenError(true);
      }
    });

    setReload(true);
  }

  return (
    <>
      <Tooltip title="Edytuj przypisanie" enterDelay={500}>
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle>
          <Typography align="center" variant="h6">
            Edytuj przypisane grupy
          </Typography>
        </DialogTitle>
        <DialogContent>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              sendRequest();
            }}
          >
            Potwierdź
          </Button>
          <Button onClick={() => setOpen(false)}>Anuluj</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={() => setOpenError(false)}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Błąd</AlertTitle>
          Wystąpił błąd poczas edycji przypisania
        </Alert>
      </Snackbar>

      <Snackbar
        open={openInfo}
        autoHideDuration={3000}
        onClose={() => setOpenInfo(false)}
      >
        <Alert
          onClose={() => setOpenInfo(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Sukces</AlertTitle>
          Pomyślnie zedytowano przypisanie!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditAssignment;
