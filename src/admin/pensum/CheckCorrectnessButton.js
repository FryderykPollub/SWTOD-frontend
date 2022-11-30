import {
  Alert,
  AlertTitle,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import { useLocalStorage } from "../../util/useLocalStorage";
import React, { useState } from "react";

const CheckCorrectnessButton = ({ rokAkadem }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [openInfo, setOpenInfo] = useState(false);
  const [openError, setOpenError] = useState(false);

  function checkCorrectness() {
    fetchApi(
      BASE_URL +
        `/api/plan-year-subject/assignment-correctness?academicYear=${rokAkadem}`,
      "GET",
      jwt,
      null
    ).then((res) => {
      if (res.status === 200) {
        setOpenInfo(true);
      } else {
        setOpenError(true);
      }
    });
  }

  return (
    <>
      <Tooltip title="Sprawdź poprawność obsady" enterDelay={500}>
        <IconButton onClick={() => checkCorrectness()}>
          <PublishedWithChangesIcon />
        </IconButton>
      </Tooltip>
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
          <AlertTitle>Niepoprawna obsada!</AlertTitle>
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
          <AlertTitle>Obsada jest poprawna!</AlertTitle>
        </Alert>
      </Snackbar>
    </>
  );
};

export default CheckCorrectnessButton;
