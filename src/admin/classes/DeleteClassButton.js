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
import { useLocalStorage } from "../../util/useLocalStorage";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";

const DeleteClassButton = ({ id, nazwaPrzedmiotu, setReload }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Nieznany błąd");
  const [infoOpen, setInfoOpen] = useState(false);

  function deleteRequest() {
    let statusResponse;

    fetchApi(
      BASE_URL + `/api/plan-year-subject/${id}/delete`,
      "DELETE",
      jwt,
      null
    )
      .then((response) => {
        statusResponse = response.status;
        return response.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setInfoOpen(true);
          setOpen(false);
        } else {
          setErrorMessage(body.message);
          setErrorOpen(true);
        }
      });

    setOpen(false);
    setReload(true);
  }

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
              deleteRequest();
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
          Przedmiot został usunięty!
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteClassButton;
