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
import { useLocalStorage } from "../../util/useLocalStorage";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";

const EditPensumButton = ({ id, setReload }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [pensum, setPensum] = useState("");

  function editPensum() {
    fetchApi(
      BASE_URL + `/api/pensum/${id}/update?pensum=${pensum}`,
      "PUT",
      jwt,
      null
    ).then((res) => {
      if (res.status === 200) {
        setInfoOpen(true);
      } else {
        setErrorOpen(true);
      }
    });
    setOpen(false);
    setReload(true);
  }

  return (
    <>
      <Tooltip title="Edytuj pensum" placement="bottom" enterDelay={500}>
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} scroll="body" onClose={() => setOpen(false)}>
        <DialogTitle textAlign="center">Edytuj oczekiwane pensum</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2, maxWidth: 600 }}>
            <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              id="pensum"
              label="Oczekiwane pensum"
              name="pensum"
              value={pensum}
              onChange={(e) => setPensum(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              editPensum();
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
          severity="success"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Sukces!</AlertTitle>
          Pomyślnie zaktualizowano pensum
        </Alert>
      </Snackbar>
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
          <AlertTitle>Błąd!</AlertTitle>
          Nie udało się zaktualizować pensum
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditPensumButton;
