import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchApi from "../service/FetchService";
import { useLocalStorage } from "../util/useLocalStorage";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import UpperBar from "../naviBar/UpperBar";
import { BASE_URL } from "../util/globalVars";

const Register = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState(1);
  const [open, setOpen] = useState(false);
  const [validationFlag, setValidationFlag] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");
  const [nameError, setNameError] = useState(false);
  const [surnameHelperText, setSurnameHelperText] = useState("");
  const [surnameError, setSurnameError] = useState(false);
  const [dobHelperText, setDobHelperText] = useState("");
  const [dobError, setDobError] = useState(false);
  const [titleHelperText, setTitleHelperText] = useState("");
  const [titleError, setTitleError] = useState(false);

  function sendRegisterRequest() {
    const reqBody = {
      username: email,
      name: firstName,
      surname: lastName,
      dob: dob,
      title: title,
      positionId: position,
    };

    let statusResponse;

    fetchApi(BASE_URL + "/api/admin/create", "POST", jwt, reqBody)
      .then((res) => {
        statusResponse = res.status;
        return res.text();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setJwt(body);
        } else {
          setOpen(true);
        }
      });
  }

  function checkEmail(val) {
    if (!val) {
      setEmailHelperText("Email nie może być pusty");
      setEmailError(true);
    } else {
      let regEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regEmail.test(val)) {
        setEmailHelperText("Niepoprawny email");
        setEmailError(true);
      } else {
        setEmailHelperText("");
        setEmailError(false);
        setEmail(val);
      }
    }
  }

  function checkName(val) {
    if (!val) {
      setNameHelperText("Imię nie może być puste");
      setNameError(true);
    } else {
      let regName = /^[a-zA-ZąęółśżźćńĄĘÓŁŚŻŹĆŃ ,.'-]+$/;
      if (!regName.test(val)) {
        setNameHelperText("Imię zawiera błąd");
        setNameError(true);
      } else {
        setNameHelperText("");
        setNameError(false);
        setFirstName(val);
      }
    }
  }

  function checkSurname(val) {
    if (!val) {
      setSurnameHelperText("Nazwisko nie może być puste");
      setSurnameError(true);
    } else {
      let regSurname = /^[a-zA-ZąęółśżźćńĄĘÓŁŚŻŹĆŃ ,.'-]+$/;
      if (!regSurname.test(val)) {
        setSurnameHelperText("Nazwisko zawiera błąd");
        setSurnameError(true);
      } else {
        setSurnameHelperText("");
        setSurnameError(false);
        setLastName(val);
      }
    }
  }

  function checkDob(val) {
    if (!val) {
      setDobHelperText("");
      setDobError(false);
      setDob(val);
    } else {
      let regDob = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
      if (!regDob.test(val)) {
        setDobHelperText("Data urodzenia zawiera błąd");
        setDobError(true);
      } else {
        setDobHelperText("");
        setDobError(false);
        setDob(val);
      }
    }
  }

  function checkTitle(val) {
    if (!val) {
      setTitleHelperText("Tytuł nie może być pusty");
      setTitleError(true);
    } else {
      let regTitle = /^[a-zA-ZąęółśżźćńĄĘÓŁŚŻŹĆŃ ]+$/;
      if (!regTitle.test(val)) {
        setTitleHelperText("Tytuł zawiera błąd");
        setTitleError(true);
      } else {
        setTitleHelperText("");
        setTitleError(false);
        setTitle(val);
      }
    }
  }

  function checkValidation() {
    if (
      !emailError &&
      !nameError &&
      !surnameError &&
      !dobError &&
      !titleError
    ) {
      setValidationFlag(true);
    } else {
      setValidationFlag(false);
    }
  }

  useEffect(() => {
    checkValidation();
  }, [emailError, nameError, surnameError, dobError, titleError]);

  return (
    <>
      <UpperBar />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "chocolate" }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Dodaj użytkownika
        </Typography>
        <Box component="form" sx={{ mt: 3, maxWidth: 600 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            placeholder="example@mail.com"
            autoFocus
            error={emailError}
            helperText={emailHelperText}
            onChange={(e) => checkEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Imię"
            name="firstName"
            placeholder="Jan"
            error={nameError}
            helperText={nameHelperText}
            onChange={(e) => checkName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Nazwisko"
            id="lastName"
            placeholder="Kowalski"
            error={surnameError}
            helperText={surnameHelperText}
            onChange={(e) => checkSurname(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="dob"
            label="Data urodzenia"
            id="dob"
            placeholder="1970-01-31"
            error={dobError}
            helperText={dobHelperText}
            onChange={(e) => checkDob(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="title"
            label="Tytuł"
            id="title"
            placeholder="Doktor"
            error={titleError}
            helperText={titleHelperText}
            onChange={(e) => checkTitle(e.target.value)}
          />
          <FormControl required fullWidth margin="normal">
            <InputLabel>Stanowisko</InputLabel>
            <Select
              value={position}
              label="Stanowisko"
              onChange={(e) => setPosition(e.target.value)}
            >
              <MenuItem value={1}>Profesor</MenuItem>
              <MenuItem value={2}>Profesor Uczelni</MenuItem>
              <MenuItem value={3}>Adiunkt</MenuItem>
              <MenuItem value={4}>Asystent</MenuItem>
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!validationFlag}
            onClick={() => sendRegisterRequest()}
          >
            Dodaj
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Błąd</AlertTitle>
          "Nie można zarejestrować użytkownika"
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
