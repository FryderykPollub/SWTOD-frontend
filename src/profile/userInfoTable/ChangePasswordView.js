import React, { useEffect, useState } from "react";
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
import { useLocalStorage } from "../../util/useLocalStorage";

const ChangePasswordView = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [username, setUsername] = useLocalStorage("", "user");
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);
  const [helperMessage, setHelperMessage] = useState("");
  const [helperError, setHelperError] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");

  function changePassword() {
    const reqBody = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword,
      repeatedNewPassword: againPassword,
    };

    let responseStatus;

    fetchApi(BASE_URL + `/api/user/change-password`, "PATCH", jwt, reqBody)
      .then((response) => {
        responseStatus = response.status;
        if (response.status === 200) {
          setOpen(false);
          setInfoOpen(true);
        }
        if (response.status === 401) {
          return response.text();
        }
        return response.json();
      })
      .then((body) => {
        if (responseStatus !== 200 && responseStatus !== 401) {
          setErrorMessage(body.message);
          setErrorOpen(true);
        }

        if (responseStatus === 401) {
          setErrorMessage("Stare hasło jest niepoprawne");
          setErrorOpen(true);
        }
      });
  }

  useEffect(() => {
    if (
      againPassword === newPassword &&
      !(againPassword === "" || againPassword === null)
    ) {
      setHelperMessage("Hasła są zgodne");
      setHelperError(false);
    } else if (againPassword === "" || againPassword === null) {
      setHelperMessage("");
      setHelperError(false);
    } else {
      setHelperMessage("Hasła nie są zgodne");
      setHelperError(true);
    }
  }, [againPassword, newPassword]);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Zmień Hasło
      </Button>
      <Dialog open={open} scroll="body" onClose={() => setOpen(false)}>
        <DialogTitle textAlign="center">Zmień hasło</DialogTitle>
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
              error={helperError}
              onChange={(e) => setAgainPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={helperError}
            onClick={() => {
              changePassword();
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
