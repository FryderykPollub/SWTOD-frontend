import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import { useLocalStorage } from "../../util/useLocalStorage";
import AddBoxIcon from "@mui/icons-material/AddBox";

const AddClassButton = ({ rokAkadem, setReload }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Nieznany błąd");
  const [infoOpen, setInfoOpen] = useState(false);

  const [newWydzial, setWydzial] = useState("WEII");
  const [newPrzedmiot, setPrzedmiot] = useState("");
  const [newKierunek, setKierunek] = useState("I");
  const [newRodzajSt, setRodzajSt] = useState("IST");
  const [newRokSt, setRokSt] = useState(1);
  const [newIsZim, setIsZim] = useState(true);
  const [newWyklad, setWyklad] = useState("");
  const [newSemin, setSemin] = useState("");
  const [newCwicz, setCwicz] = useState("");
  const [newLab, setLab] = useState("");
  const [newProj, setProj] = useState("");
  const [newGrWyklad, setGrWyklad] = useState("");
  const [newGrSemin, setGrSemin] = useState("");
  const [newGrCwicz, setGrCwicz] = useState("");
  const [newGrLab, setGrLab] = useState("");
  const [newGrProj, setGrProj] = useState("");

  function validateData() {
    if (newPrzedmiot === "" || newPrzedmiot == null) {
      setErrorMessage("Nazwa przedmiotu nie może być pusta");
      setErrorOpen(true);
    } else if (newWyklad === "" || newWyklad === null) {
      if (newGrWyklad === "" || newGrWyklad == null) {
        setWyklad(0);
        setGrWyklad(0);
      } else {
        setErrorMessage("Nie prowadzono liczby godzin dla wykładu");
        setErrorOpen(true);
      }
    } else if (newSemin === "" || newSemin === null) {
      if (newGrSemin === "" || newGrSemin == null) {
        setSemin(0);
        setGrSemin(0);
      } else {
        setErrorMessage("Nie prowadzono liczby godzin dla seminarium");
        setErrorOpen(true);
      }
    } else if (newCwicz === "" || newCwicz === null) {
      if (newGrCwicz === "" || newGrCwicz == null) {
        setCwicz(0);
        setGrCwicz(0);
      } else {
        setErrorMessage("Nie prowadzono liczby godzin dla ćwiczeń");
        setErrorOpen(true);
      }
    } else if (newLab === "" || newLab === null) {
      if (newGrLab === "" || newGrLab == null) {
        setLab(0);
        setGrLab(0);
      } else {
        setErrorMessage("Nie prowadzono liczby godzin dla laboratorium");
        setErrorOpen(true);
      }
    } else if (newProj === "" || newProj === null) {
      if (newGrProj === "" || newGrProj == null) {
        setProj(0);
        setGrProj(0);
      } else {
        setErrorMessage("Nie prowadzono liczby godzin dla projektu");
        setErrorOpen(true);
      }
    } else if (newGrWyklad === "" || newGrWyklad === null) {
      setErrorMessage("Nie prowadzono liczby grup dla wykładu");
      setErrorOpen(true);
    } else if (newGrSemin === "" || newGrSemin === null) {
      setErrorMessage("Nie prowadzono liczby grup dla seminarium");
      setErrorOpen(true);
    } else if (newGrCwicz === "" || newGrCwicz === null) {
      setErrorMessage("Nie prowadzono liczby grup dla ćwiczeń");
      setErrorOpen(true);
    } else if (newGrLab === "" || newGrLab === null) {
      setErrorMessage("Nie prowadzono liczby grup dla laboratorium");
      setErrorOpen(true);
    } else if (newGrProj === "" || newGrProj === null) {
      setErrorMessage("Nie prowadzono liczby grup dla projektu");
      setErrorOpen(true);
    } else if (
      newWyklad +
        newGrWyklad +
        newSemin +
        newGrSemin +
        newCwicz +
        newGrCwicz +
        newLab +
        newGrLab +
        newProj +
        newGrProj ===
      0
    ) {
      setErrorMessage("Nie dodano żadnych grup ani godzin do przedmiotu");
      setErrorOpen(true);
    } else {
      addNewClassRequest();
    }
  }

  function addNewClassRequest() {
    var typSemestru;
    var tygodnie;

    if (newIsZim) {
      typSemestru = "Z";
    } else {
      typSemestru = "L";
    }

    if (newRodzajSt === "IST" || newRodzajSt === "MST") {
      tygodnie = 15;
    } else {
      tygodnie = 5;
    }

    const reqBody = {
      classesTypeNamesPysIds: {},
      id: null,
      subjectId: null,
      facultyName: newWydzial,
      year: newRokSt,
      academicYear: rokAkadem,
      fieldOfStudiesName: newKierunek,
      typeOfStudiesName: newRodzajSt,
      subjectName: newPrzedmiot,
      weeksPerSemester: tygodnie,
      lectureHoursNumberPerWeek: newWyklad,
      exerciseHoursNumberPerWeek: newCwicz,
      laboratoryHoursNumberPerWeek: newLab,
      projectHoursNumberPerWeek: newProj,
      seminaryHoursNumberPerWeek: newSemin,
      numberOfStudents: 420,
      groupsPerLecture: newGrWyklad,
      lectureHoursNumber: tygodnie * newGrWyklad,
      groupsPerExercise: newGrCwicz,
      exerciseHoursNumber: tygodnie * newGrCwicz,
      groupsPerLaboratory: newGrLab,
      laboratoryHoursNumber: tygodnie * newGrLab,
      groupsPerProject: newGrProj,
      projectHoursNumber: tygodnie * newGrProj,
      groupsPerSeminary: newGrSemin,
      seminaryHoursNumber: tygodnie * newGrSemin,
      semesterType: typSemestru,
      hoursTotal:
        tygodnie *
        (newGrWyklad + newGrCwicz + newGrLab + newGrProj + newGrSemin),
    };

    console.log(reqBody);

    let statusResponse;

    fetchApi(BASE_URL + `/api/plan-year-subject/add`, "POST", jwt, reqBody)
      .then((response) => {
        statusResponse = response.status;
        if (response.status !== 200) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((body) => {
        if (statusResponse === 200) {
          setInfoOpen(true);
          setOpen(false);
        } else {
          setErrorMessage(body.message);
          setErrorOpen(true);
        }
      });

    setOpen(false);
    setReload(true);
  }

  return (
    <>
      <Tooltip title="Dodaj nowy przedmiot">
        <IconButton onClick={() => setOpen(true)}>
          <AddBoxIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} scroll="body" onClose={() => setOpen(false)}>
        <DialogTitle textAlign="center">
          Wprowadź dane dotyczące nowego przedmiotu
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ m: 2, maxWidth: 600 }}>
            <Select
              fullWidth
              value={newWydzial}
              onChange={(e) => setWydzial(e.target.value)}
            >
              <MenuItem value={"WEII"}>WEiI</MenuItem>
              <MenuItem value={"WM"}>WM</MenuItem>
              <MenuItem value={"WBIA"}>WBiA</MenuItem>
              <MenuItem value={"WIS"}>WIS</MenuItem>
              <MenuItem value={"WZ"}>WZ</MenuItem>
              <MenuItem value={"WPT"}>WPT</MenuItem>
            </Select>
            <TextField
              margin="normal"
              fullWidth
              name="przedmiot"
              label="Nazwa przedmiotu"
              id="przedmiot"
              value={newPrzedmiot}
              onChange={(e) => setPrzedmiot(e.target.value)}
            />
            <InputLabel>Kierunek</InputLabel>
            <Select
              fullWidth
              value={newKierunek}
              onChange={(e) => setKierunek(e.target.value)}
            >
              <MenuItem value={"I"}>Informatyka</MenuItem>
              <MenuItem value={"E"}>Elektrotechnika</MenuItem>
            </Select>
            <InputLabel>Rodzaj studiów</InputLabel>
            <Select
              fullWidth
              value={newRodzajSt}
              onChange={(e) => setRodzajSt(e.target.value)}
            >
              <MenuItem value={"IST"}>Inżynierskie Stacjonarne</MenuItem>
              <MenuItem value={"INS"}>Inżynierskie Niestacjonarne</MenuItem>
              <MenuItem value={"MST"}>Magisterskie Stacjonarne</MenuItem>
              <MenuItem value={"MNS"}>Magisterskie Niestacjonarne</MenuItem>
            </Select>
            <InputLabel>Rok studiów</InputLabel>
            <Select
              fullWidth
              value={newRokSt}
              onChange={(e) => setRokSt(e.target.value)}
            >
              <MenuItem value={1}>I</MenuItem>
              <MenuItem value={2}>II</MenuItem>
              <MenuItem value={3}>III</MenuItem>
              <MenuItem value={4}>IV</MenuItem>
            </Select>
            <InputLabel>Rodzaj semestru</InputLabel>
            <Select
              fullWidth
              value={newIsZim}
              onChange={(e) => setIsZim(e.target.value)}
            >
              <MenuItem value={true}>zimowy</MenuItem>
              <MenuItem value={false}>letni</MenuItem>
            </Select>
            <Divider sx={{ mt: 2.5, mb: 0.5 }}>Wykłady</Divider>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <TextField
                  margin="normal"
                  name="wyklad"
                  label="Liczba godzin"
                  id="wyklad"
                  value={newWyklad}
                  onChange={(e) => setWyklad(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  name="grWyklad"
                  label="Liczba grup"
                  id="grWyklad"
                  value={newGrWyklad}
                  onChange={(e) => setGrWyklad(e.target.value)}
                />
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2.5, mb: 0.5 }}>Seminarium</Divider>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <TextField
                  margin="normal"
                  name="semin"
                  label="Liczba godzin"
                  id="semin"
                  value={newSemin}
                  onChange={(e) => setSemin(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  name="grSemin"
                  label="Liczba grup"
                  id="grSemin"
                  value={newGrSemin}
                  onChange={(e) => setGrSemin(e.target.value)}
                />
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2.5, mb: 0.5 }}>Ćwiczenia</Divider>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <TextField
                  margin="normal"
                  name="cwicz"
                  label="Liczba godzin"
                  id="cwicz"
                  value={newCwicz}
                  onChange={(e) => setCwicz(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  name="grCwicz"
                  label="Liczba grup"
                  id="grCwicz"
                  value={newGrCwicz}
                  onChange={(e) => setGrCwicz(e.target.value)}
                />
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2.5, mb: 0.5 }}>Laboratoria</Divider>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <TextField
                  margin="normal"
                  name="lab"
                  label="Liczba godzin"
                  id="lab"
                  value={newLab}
                  onChange={(e) => setLab(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  name="grLab"
                  label="Liczba grup"
                  id="grLab"
                  value={newGrLab}
                  onChange={(e) => setGrLab(e.target.value)}
                />
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2.5, mb: 0.5 }}>Projekt</Divider>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <TextField
                  margin="normal"
                  name="proj"
                  label="Liczba godzin"
                  id="proj"
                  value={newProj}
                  onChange={(e) => setProj(e.target.value)}
                />
              </Grid>
              <Grid item>
                <TextField
                  margin="normal"
                  name="grProj"
                  label="Liczba grup"
                  id="grProj"
                  value={newGrProj}
                  onChange={(e) => setGrProj(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              validateData();
            }}
          >
            Potwierdź
          </Button>
          <Button onClick={() => setOpen(false)}>Anuluj</Button>
        </DialogActions>
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

      <Snackbar
        open={infoOpen}
        autoHideDuration={3000}
        onClose={() => setInfoOpen(false)}
      >
        <Alert
          onClose={() => setInfoOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Sukces</AlertTitle>
          Przedmiot został dodany!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddClassButton;
