import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
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
} from "@mui/material";

const DeleteClassButton = ({ nazwaPrzedmiotu }) => {
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Nieznany błąd");
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <Tooltip title="Usuń przedmiot" placement="bottom" enterDelay={500}>
        <IconButton onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle>Usuń przedmiot</DialogTitle>
        <DialogContent>
          Czy na pewno chcesz usunąć "{nazwaPrzedmiotu}" z listy przedmiotów?
          <br />
          Nie będzie można cofnąć tej operacji.
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
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
          Dane przedmiotu zostały zaktualizowane!
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteClassButton;
