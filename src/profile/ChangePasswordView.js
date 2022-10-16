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
import { BASE_URL, AUTH_BASE_URL } from "../util/globalVars";

const ChangePasswordView = ({ id }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const [helperMessage, setHelperMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");
  const [username, setUsername] = useState("");

  function changePassword() {
    const reqBody = {
      id: id,
      password: newPassword,
    };

    let responseStatus;

    fetchApi(BASE_URL + `/user/passwordChange`, "PUT", jwt, reqBody)
      .then((response) => {
        responseStatus = response.status;
        if (response.status === 200) {
          setOpen(false);
          setInfoOpen(true);
        }
        return response.text();
      })
      .then((body) => {
        if (responseStatus !== 200) {
          setErrorMessage(body);
          setErrorOpen(true);
        }
      });
  }

  function getUsername() {
    let responseStatus;

    fetchApi(BASE_URL + `/user/username?id=${id}`, "GET", jwt, null)
      .then((response) => {
        responseStatus = response.status;
        return response.text();
      })
      .then((body) => {
        if (responseStatus === 200) setUsername(body);
        else setUsername("");
      });
  }

  function checkPasswordChange() {
    const request = {
      username: username,
      password: oldPassword,
    };

    fetchApi(BASE_URL + `/auth`, "POST", null, request).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        if (
          againPassword === newPassword &&
          (newPassword !== null || newPassword === "")
        ) {
          changePassword();
        } else {
          setErrorMessage("Passwords doesn't match");
          setErrorOpen(true);
        }
      } else {
        setErrorMessage("Incorrect old password");
        setErrorOpen(true);
      }
    });
  }

  useEffect(() => {
    getUsername();
  }, []);

  useEffect(() => {
    if (
      againPassword === newPassword &&
      !(againPassword === "" || againPassword === null)
    ) {
      setHelperMessage("Correct");
    } else if (againPassword === "" || againPassword === null) {
      setHelperMessage("");
    } else {
      setHelperMessage("Doesn't match");
    }
  }, [againPassword, newPassword]);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Zmień Hasło
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
              required
              id="oldPassword"
              label="Stare hasło"
              name="oldPassword"
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="newPassword"
              label="Nowe hasło"
              id="newPassword"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              name="againPassword"
              label="Powtórz nowe hasło"
              id="againPassword"
              type="password"
              helperText={helperMessage}
              onChange={(e) => setAgainPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              checkPasswordChange();
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
          <AlertTitle>Sukces!</AlertTitle>
          Twoje hasło zostało zmienione!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChangePasswordView;
