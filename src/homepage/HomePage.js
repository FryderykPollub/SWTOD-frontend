import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UpperBar from "../naviBar/UpperBar";
import fetchApi from "../service/FetchService";
import { useLocalStorage } from "../util/useLocalStorage";
import Footer from "./Footer";
import { BASE_URL } from "../util/globalVars";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AssignmentIcon from "@mui/icons-material/Assignment";

const HomePage = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [username, setUsername] = useLocalStorage("", "user");
  const [valid, setValid] = useState(false);
  const [name, setName] = useState("");

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

  function getUser() {
    let statusResponse;

    fetchApi(BASE_URL + `/api/user?username=${username}`, "GET", jwt, null)
      .then((response) => {
        statusResponse = response.status;
        return response.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setName(body.name);
        }
      });
  }

  useEffect(() => {
    checkValidation();
  }, []);

  useEffect(() => {
    if (valid) {
      getUser();
    }
  }, [valid]);

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
              mb: 15,
              fontWeight: "bold",
            }}
          >
            System Wspomagający Tworzenie Obsady Dydaktycznej
          </Typography>
        </Grid>

        {valid ? (
          <>
            <Grid item>
              <Typography variant="h4">
                Witaj {name}, miło Cię widzieć!
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" mt={6}>
                Aby zacząć korzystać z systemu
                <Button
                  href="/profile"
                  variant="text"
                  size="large"
                  sx={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  kliknij tutaj
                </Button>
              </Typography>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Typography variant="h5">
                Aby móc korzystać z systemu musisz się{" "}
                <Button
                  href="/login"
                  variant="text"
                  size="large"
                  sx={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  zalogować
                </Button>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" sx={{ mt: 10, mb: 2, fontSize: 22 }}>
                Po zalogowaniu uzyskasz dostęp do:
              </Typography>

              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="start"
                  spacing={2}
                >
                  <Grid item>
                    <AssignmentIcon
                      sx={{
                        fontSize: 30,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: 20,
                      }}
                    >
                      Rozliczenia swojego pensum
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="start"
                  spacing={2}
                >
                  <Grid item>
                    <GroupsIcon
                      sx={{
                        fontSize: 30,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: 20,
                      }}
                    >
                      Podglądu prowadzonych zajęć
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}

        <Footer />
      </Grid>
    </Box>
  );
};

export default HomePage;
