import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../util/useLocalStorage";
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
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";

const SelfUpdateInfo = ({ firstName, lastName, dob, setReload }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [username, setUsername] = useLocalStorage("", "user");

  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newDob, setNewDob] = useState("");

  useEffect(() => {
    setNewFirstName(firstName);
    setNewLastName(lastName);
    setNewDob(dob);
  }, [firstName, lastName, dob]);

  function getUser() {
    let statusResponse;

    fetchApi(BASE_URL + `/api/user?username=${username}`, "GET", jwt, null)
      .then((response) => {
        statusResponse = response.status;
        return response.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setId(body.id);
        } else {
          setErrorMessage("Problem ze znalezieniem nazwy użytkownika");
          setErrorOpen(true);
        }
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  function sendUpdateRequest() {
    const reqBody = {
      name: newFirstName,
      surname: newLastName,
      dob: newDob,
    };

    let statusResponse;

    console.log(reqBody);

    fetchApi(BASE_URL + `/api/user/${id}/update`, "PUT", jwt, reqBody)
      .then((response) => {
        statusResponse = response.status;
        if (response.status === 200) {
          return response.text();
        } else {
          return response.json();
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
              placeholder="1970-01-31"
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

export default SelfUpdateInfo;
