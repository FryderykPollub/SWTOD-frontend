import {
  Alert,
  AlertTitle,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import React, { useState } from "react";

const CheckCorrectnessButton = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [alertSeverity, setSeverity] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(true);

  function setSnackbar() {
    if (flag) {
      setSeverity("success");
      setAlertTitle("Sukces!");
      setMessage("Obsada jest poprawna");
      setFlag(false);
    } else {
      setSeverity("error");
      setAlertTitle("Błąd!");
      setMessage("Obsada nie jest poprawna");
      setFlag(true);
    }
    setInfoOpen(true);
  }

  return (
    <>
      <Tooltip
        title="Sprawdź poprawność obsady"
        placement="bottom"
        enterDelay={500}
      >
        <IconButton onClick={() => setSnackbar()}>
          <PublishedWithChangesIcon />
        </IconButton>
      </Tooltip>
      <Snackbar
        open={infoOpen}
        autoHideDuration={3000}
        onClose={() => setInfoOpen(false)}
      >
        <Alert
          onClose={() => setInfoOpen(false)}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          <AlertTitle>{alertTitle}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CheckCorrectnessButton;
