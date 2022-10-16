import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../util/useLocalStorage";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import fetchApi from "../service/FetchService";
import { BASE_URL } from "../util/globalVars";

const UpdateInfo = ({
  id,
  title,
  firstName,
  lastName,
  dob,
  setReload,
}) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newDob, setNewDob] = useState("");

  useEffect(() => {
    setNewTitle(title);
    setNewFirstName(firstName);
    setNewLastName(lastName);
    setNewDob(dob);
  }, [title, firstName, lastName, dob]);

  function sendUpdateRequest() {
    const reqBody = {
      userId: id,
      personalInfo: {
        firstName: newFirstName,
        lastName: newLastName,
      },
    };

    let statusResponse;

    fetchApi(BASE_URL + `/user/update`, "PUT", jwt, reqBody)
      .then((response) => {
        statusResponse = response.status;
        if (response.status !== 200) return response.text();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setInfoOpen(true);
          setOpen(false);
        } else {
          setErrorMessage(body);
          setErrorOpen(true);
        }
        setReload(true);
      });
  }

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Edytuj dane osobowe
      </Button>
      <Dialog open={open} scroll="body" onClose={() => setOpen(false)}>
        <DialogTitle textAlign="center">
          {"Edit your personal info"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, maxWidth: 600 }}>
            <TextField
              margin="normal"
              fullWidth
              id="title"
              label="Tytuł"
              name="firstName"
              placeholder="doktor"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              name="name"
              label="Imię"
              id="name"
              placeholder="Jan"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              name="surname"
              label="Nazwisko"
              id="surname"
              placeholder="Kowalski"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              name="dob"
              label="Data urodzenia"
              id="dob"
              placeholder="01/01/1970"
              value={newDob}
              onChange={(e) => setNewDob(e.target.value)}
            />

          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              sendUpdateRequest();
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
          Twoje dane zostały zaktualizowane!
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateInfo;
