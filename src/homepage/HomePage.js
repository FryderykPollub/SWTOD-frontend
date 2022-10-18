import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpperBar from "../naviBar/UpperBar";
import fetchApi from "../service/FetchService";
import { useLocalStorage } from "../util/useLocalStorage";
import Footer from "./Footer";
import { BASE_URL } from "../util/globalVars";
import SearchIcon from "@mui/icons-material/Search";

const HomePage = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);

  function checkValidation() {
    if (jwt) {
      fetchApi(BASE_URL + `/validate`, "GET", jwt, null)
        .then((response) => {
          // console.log(response.status);
          if (response.status === 200) setValid(true);
          else setValid(false);
        })
        .catch((e) => {
          // setValid(false);
        });
    } else setValid(false);
  }

  useEffect(() => {
    checkValidation();
  }, [jwt]);

  return (
    <Box>
      <UpperBar />
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{
          mt: 5,
        }}
      >
        <Grid item>
          <Typography
            variant="h3"
            sx={{
              fontSize: 50,
              mb: 5,
              fontWeight: "bold",
            }}
          >
            Wyszukiwanie rozpiski zajęć
          </Typography>
        </Grid>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={12} textAlign="center">
            <Typography
              variant="h3"
              sx={{
                fontSize: 26,
                mb: 5,
              }}>
              Podaj nazwisko prowadzącego:
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item >
                <TextField
                  id="surname"
                  label="Nazwisko"
                  name="surname"
                // onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item >
                <IconButton>
                  <SearchIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    </Box>
  );
};

export default HomePage;
