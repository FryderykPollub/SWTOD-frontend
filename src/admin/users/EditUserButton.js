import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useLocalStorage } from "../../util/useLocalStorage";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";

const EditUserButton = ({ id, email, title, setInfoOpen, setReload }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");

  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [newTitle, setNewTitle] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [validationFlag, setValidationFlag] = useState(false);

  const [emailHelperText, setEmailHelperText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [titleHelperText, setTitleHelperText] = useState("");
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    setNewTitle(title);
    setNewPosition(1);
    setNewEmail(email);
  }, []);

  function sendUpdateRequest() {
    const reqBody = {
      username: email,
      title: newTitle,
      positionId: newPosition,
    };

    let statusResponse;

    console.log(reqBody);

    fetchApi(BASE_URL + `/api/admin/${id}/update`, "PUT", jwt, reqBody)
      .then((res) => {
        statusResponse = res.status;
        if (res.status !== 200) {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then((body) => {
        if (statusResponse === 200) {
          setOpen(false);
          setReload(true);
          setInfoOpen(true);
        } else {
          setErrorOpen(true);
          setErrorMessage(body.message);
          setEmailError(true);
        }
      });
  }

  function checkEmail(val) {
    if (!val) {
      setEmailHelperText("Email nie może być pusty");
      setEmailError(true);
    } else {
      let regEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regEmail.test(val)) {
        setEmailHelperText("Niepoprawny email");
        setEmailError(true);
      } else {
        setEmailHelperText("");
        setEmailError(false);
        setNewEmail(val);
      }
    }
  }

  function checkTitle(val) {
    if (!val) {
      setTitleHelperText("Tytuł nie może być pusty");
      setTitleError(true);
    } else {
      let regTitle = /^[a-zA-ZąęółśżźćńĄĘÓŁŚŻŹĆŃ ]+$/;
      if (!regTitle.test(val)) {
        setTitleHelperText("Tytuł zawiera błąd");
        setTitleError(true);
      } else {
        setTitleHelperText("");
        setTitleError(false);
        setNewTitle(val);
      }
    }
  }

  function checkValidation() {
    if (!titleError) {
      setValidationFlag(true);
    } else {
      setValidationFlag(false);
    }
  }

  useEffect(() => {
    checkValidation();
  }, [titleError]);

  return (
    <>
      <Tooltip
        title="Edytuj dane użytkownika"
        placement="bottom"
        enterDelay={500}
      >
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} scroll="body" onClose={() => setOpen(false)}>
        <DialogTitle textAlign="center">
          {"Edytuj dane użytkownika"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, maxWidth: 600 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              placeholder="example@mail.com"
              error={emailError}
              helperText={emailHelperText}
              onChange={(e) => checkEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              name="title"
              label="Tytuł"
              id="title"
              placeholder="Doktor"
              error={titleError}
              helperText={titleHelperText}
              onChange={(e) => checkTitle(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Stanowisko</InputLabel>
              <Select
                value={newPosition}
                label="Stanowisko"
                onChange={(e) => setNewPosition(e.target.value)}
              >
                <MenuItem value={1}>Profesor</MenuItem>
                <MenuItem value={2}>Profesor Uczelni</MenuItem>
                <MenuItem value={3}>Adiunkt</MenuItem>
                <MenuItem value={4}>Asystent</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={!validationFlag}
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
    </>
  );
};

export default EditUserButton;
