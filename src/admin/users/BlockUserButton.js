import {
  Alert,
  AlertTitle,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import React, { useState } from "react";
import { useLocalStorage } from "../../util/useLocalStorage";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";

const BlockUserButton = ({ id, isActive, setReload }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");

  const [openInfo, setOpenInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function deactivateUser() {
    let statusResponse;

    fetchApi(
      BASE_URL + `/api/admin/${id}/deactivate-account`,
      "PATCH",
      jwt,
      null
    )
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
          setOpenInfo(true);
          setReload(true);
          setInfoMessage("Użytkownik został pomyślnie zablokowany");
        } else {
          setOpenError(true);
          setErrorMessage(body.message);
        }
      });
  }

  function activateUser() {
    let statusResponse;

    fetchApi(BASE_URL + `/api/admin/${id}/activate-account`, "PATCH", jwt, null)
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
          setOpenInfo(true);
          setReload(true);
          setInfoMessage("Użytkownik został pomyślnie odblokowany");
        } else {
          setOpenError(true);
          setErrorMessage(body.message);
        }
      });
  }

  return (
    <>
      {isActive ? (
        <Tooltip title="Dezaktywuj konto" placement="bottom" enterDelay={500}>
          <IconButton onClick={() => deactivateUser()}>
            <PersonOffIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Aktywuj konto" placement="bottom" enterDelay={500}>
          <IconButton onClick={() => activateUser()}>
            <PersonIcon />
          </IconButton>
        </Tooltip>
      )}
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
          {errorMessage}
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
          <AlertTitle>Sukces!</AlertTitle>
          {infoMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BlockUserButton;
