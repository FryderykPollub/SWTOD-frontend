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
  TextField,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { Box } from "@mui/system";

const EditPensumButton = () => {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [alertSeverity, setSeverity] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(true);

  function setSnackbar() {
    if (flag) {
      setSeverity("success");
      setAlertTitle("Sukces!");
      setMessage("Pensum zostało zaktalizowane");
      setFlag(false);
    } else {
      setSeverity("error");
      setAlertTitle("Błąd!");
      setMessage("Nie udało się zaktualizować pensum");
      setFlag(true);
    }
    setInfoOpen(true);
    setOpen(false);
  }

  return (
    <>
      <Tooltip title="Edytuj pensum" placement="bottom" enterDelay={500}>
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} scroll="body" onClose={() => setOpen(false)}>
        <DialogTitle textAlign="center">Edytuj Pensum</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, maxWidth: 600 }}>
            <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              id="pensum"
              label="Pensum"
              name="pensum"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setSnackbar();
            }}
          >
            Potwierdź
          </Button>
          <Button onClick={() => setOpen(false)}>Anuluj</Button>
        </DialogActions>
      </Dialog>
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

export default EditPensumButton;
