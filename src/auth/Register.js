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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UpperBar from "../naviBar/UpperBar";
import { BASE_URL } from "../util/globalVars";

const Register = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [open, setOpen] = useState(false);

  function sendRegisterRequest() {
    const reqBody = {
      username: email,
      name: firstName,
      surname: lastName,
      dob: dob,
      title: title,
      positionId: position
    }

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
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Imię"
            name="firstName"
            placeholder="Jan"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Nazwisko"
            id="lastName"
            placeholder="Kowalski"
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="dob"
            label="Data urodzenia"
            id="dob"
            placeholder="1970-01-31"
            onChange={(e) => setDob(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="title"
            label="Tytuł"
            id="title"
            placeholder="Doktor"
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl required fullWidth margin="normal">
            <InputLabel>Stanowisko</InputLabel>
            <Select
              value={position}
              label="Stanowisko"
              onChange={(e) => setPosition(e.target.value)}
              //placeholder={position}
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