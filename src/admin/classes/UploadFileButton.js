import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import React, { useState } from "react";
import { useLocalStorage } from "../../util/useLocalStorage";
import Papa from "papaparse";
import { BASE_URL } from "../../util/globalVars";

const UploadFileButton = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [wydzial, setWydzial] = useState("WEII");
  const [file, setFile] = useState();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnCancel = () => {
    setFile();
    setWydzial("WEII");
    setOpen(false);
  };

  const handleOnSubmit = () => {
    // console.log("FILE", file);
    if (file) {
      postFile(file);
      fileReader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        const all = parsedData;
        // console.log("Content", all);
      };
      fileReader.readAsText(file);
    } else {
      setErrorMessage("Nie można załadować pliku.");
      setErrorOpen(true);
    }
  };

  function postFile(sendFile) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwt}`);

    var formdata = new FormData();
    formdata.append("PZD", sendFile);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    let responseStatus;

    fetch(
      BASE_URL + `/api/plan-year-subject/upload-file?facultyName=${wydzial}`,
      requestOptions
    )
      .then((response) => {
        responseStatus = response.status;
        return response.json();
      })
      .then((result) => {
        if (responseStatus !== 200) {
          setErrorMessage(result.message);
          setErrorOpen(true);
        } else {
          setInfoOpen(true);
          setOpen(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Tooltip title="Import pliku" placement="bottom" enterDelay={500}>
        <IconButton onClick={() => setOpen(true)}>
          <UploadFileIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} maxWidth={"md"} fullWidth>
        <DialogTitle>
          <Typography noWrap variant="h4" align="center" m={2} mr={6} ml={6}>
            Zaimportuj plik csv
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item>
              Wydział:
              <Select
                value={wydzial}
                onChange={(e) => setWydzial(e.target.value)}
              >
                <MenuItem value={"WM"}>{"Mechaniczny"}</MenuItem>
                <MenuItem value={"WEII"}>
                  {"Elektrotechniki i Informatyki"}
                </MenuItem>
                <MenuItem value={"WBIA"}>
                  {"Budownictwa i Architektury"}
                </MenuItem>
                <MenuItem value={"WIS"}>{"Inżynierii Środowiska"}</MenuItem>
                <MenuItem value={"WZ"}>{"Zarządzania"}</MenuItem>
                <MenuItem value={"WPT"}>{"Podstaw Techniki"}</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <form>
                <input
                  type={"file"}
                  id={"csvFileInput"}
                  accept={".csv"}
                  onChange={handleOnChange}
                />
              </form>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={8}
            sx={{ mt: -4 }}
          >
            <Grid item>
              <Button
                onClick={() => {
                  handleOnCancel();
                }}
              >
                Anuluj
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  handleOnSubmit();
                }}
              >
                Importuj
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
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
          severity="succes"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Sukces!</AlertTitle>
          "Poprawnie zaimportowane plik"
        </Alert>
      </Snackbar>
    </>
  );
};

export default UploadFileButton;
