import {
  Avatar,
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchApi from "../service/FetchService";
import { useLocalStorage } from "../util/useLocalStorage";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Navigate, useNavigate } from "react-router-dom";
import UpperBar from "../naviBar/UpperBar";
import { BASE_URL } from "../util/globalVars";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [username, setUsername] = useLocalStorage("", "user");
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [colorError, setColorError] = useState("primary");

  function sendLoginRequest() {
    const reqBody = {
      username: email,
      password: password,
    };

    let statusResponse;

    fetchApi(BASE_URL + "/api/user/login", "POST", null, reqBody)
      .then((res) => {
        statusResponse = res.status;
        return res.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setUsername(body.username);
          setJwt(body.token);
          setColorError("primary");
          setValid(true);
        } else {
          setErrorMessage(body);
          setColorError("error");
        }
      });
  }

  function checkValidation() {
    if (jwt) {
      fetchApi(BASE_URL + `/api/user/is-user`, "GET", jwt, null)
        .then((response) => {
          if (response.status === 200) setValid(true);
          else setValid(false);
        })
        .catch((e) => {
          setValid(false);
        });
    } else setValid(false);
  }

  useEffect(() => {
    if (valid) navigate("/profile");
  }, [valid]);

  useEffect(() => {
    checkValidation();
  }, [jwt]);

  return valid ? (
    <Navigate to="/profile" />
  ) : (
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
        <Avatar sx={{ m: 1, bgcolor: "lightblue" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Zaloguj się, by móc korzystać z serwisu
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
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
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            helperText={errorMessage}
            color={colorError}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              sendLoginRequest();
            }}
          >
            Login
          </Button>
          <ForgotPassword />
        </Box>
      </Box>
    </>
  );
};

export default Login;
