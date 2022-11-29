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
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { useLocalStorage } from "../../util/useLocalStorage";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";

const DeleteAssignment = ({ setReload, userId, subjectId }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openError, setOpenError] = useState(false);

  function deleteRequest() {
    fetchApi(
      BASE_URL +
        `/api/plan-year-subject-user/delete-assignment?userId=${userId}&subjectId=${subjectId}`,
      "DELETE",
      jwt,
      null
    ).then((res) => {
      if (res.status === 200) {
        setOpenInfo(true);
      } else {
        setOpenError(true);
      }
    });

    setReload(true);
  }

  return (
    <>
      <Tooltip title="Usuń przypisanie" enterDelay={500}>
        <IconButton onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle>
          Czy na pewno chcesz usunąć to przypisanie z obsady?
        </DialogTitle>
        <DialogContent>Operacji nie będzie można cofnąć</DialogContent>
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
          Wystąpił błąd poczas usuwania przypisania
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
          Przypisanie zostało usunięte!
        </Alert>
      </Snackbar>
    </>
  );
};
<Tooltip>
  <IconButton></IconButton>
</Tooltip>;
export default DeleteAssignment;
