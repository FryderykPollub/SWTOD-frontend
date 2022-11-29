import React, { useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import { useLocalStorage } from "../../util/useLocalStorage";
import CancelIcon from "@mui/icons-material/Cancel";

const DeclineClassButton = ({ userId, subjectId, setReload }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [open, setOpen] = useState("");
  const [openInfo, setOpenInfo] = useState("");
  const [openError, setOpenError] = useState("");

  function sendRequest() {
    fetchApi(
      BASE_URL +
        `/api/user/reject-assignment?userId=${userId}&subjectId=${subjectId}`,
      "PATCH",
      jwt,
      null
    ).then((res) => {
      if (res.status === 200) {
        setOpenInfo(true);
      } else {
        setOpenError(true);
      }
    });
    setOpen(false);
    setReload(true);
  }

  return (
    <>
      <Tooltip title="Odrzuć propozycję" placement="bottom">
        <IconButton onClick={() => setOpen(true)} sx={{ color: "red" }}>
          <CancelIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle>
          <Typography variant="h6">Czy chcesz odrzucić propozycję?</Typography>
        </DialogTitle>
        <DialogContent>Tej operacji nie będzie można cofnąć</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Anuluj</Button>
          <Button onClick={() => sendRequest()}>Potwierdź</Button>
        </DialogActions>
      </Dialog>
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
          Nie udało się wysłać żądania
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
          <AlertTitle>Sukces</AlertTitle>
          Żądanie zostało poprawnie wysłane
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeclineClassButton;
