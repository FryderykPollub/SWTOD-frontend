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
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");

  function changePassword() {
    const reqBody = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword,
      repeatNewPassword: againPassword,
    };

    let responseStatus;

    fetchApi(BASE_URL + `api/user/change-password`, "PATCH", jwt, reqBody)
      .then((response) => {
        responseStatus = response.status;
        if (response.status === 200) {
          setOpen(false);
          setInfoOpen(true);
        }
        return response.json();
      })
      .then((body) => {
        if (responseStatus !== 200) {
          setErrorMessage(body.message);
          setErrorOpen(true);
        }
      });
  }

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
