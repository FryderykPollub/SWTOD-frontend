import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchApi from "../service/FetchService";
import { useLocalStorage } from "../util/useLocalStorage";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import UpperBar from "../naviBar/UpperBar";
import { BASE_URL } from "../util/globalVars";

const Register = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [degree, setDegree] = useState("");
  const [dob, setDob] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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
          <LockOutlinedIcon />
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
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="degree"
            label="Tytuł"
            id="degree"
            placeholder="dr"
            onChange={(e) => setDegree(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="firstName"
            label="Imię"
            name="firstName"
            placeholder="Jan"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="normal"
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
            placeholder="01/01/1970"
            onChange={(e) => setDob(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => setOpen(true)}
          >
            Register
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
          <AlertTitle>Error</AlertTitle>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
