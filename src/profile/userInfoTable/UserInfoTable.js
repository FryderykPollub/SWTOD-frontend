import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchApi from "../../service/FetchService";
import { useLocalStorage } from "../../util/useLocalStorage";
import ChangePasswordView from "./ChangePasswordView";
import SelfUpdateInfo from "./SelfUpdateInfo";
import { BASE_URL } from "../../util/globalVars";

const UserInfoTable = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [username, setUsername] = useLocalStorage("", "user");

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [reload, setReload] = useState(false);

  function getUser() {
    let statusResponse;

    fetchApi(BASE_URL + `/api/user?username=${username}`, "GET", jwt, null)
      .then((response) => {
        statusResponse = response.status;
        return response.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          // console.log(body);
          setId(body.id);
          setTitle(body.title);
          setFirstName(body.name);
          setLastName(body.surname);
          setDob(body.dob);
          setEmail(body.email);
          setPosition(body.positionName);
        }
      });
  }

  useEffect(() => {
    getUser();
    if (reload) setReload(false);
  }, [reload]);

  return (
    <>
      <Grid item width="50%">
        <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
          Dane osobowe
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }}>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontWeight: "bold" }}>Tytuł:</Typography>
                </TableCell>
                <TableCell align="left">{title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Stanowisko:
                  </Typography>
                </TableCell>
                <TableCell align="left">{position}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontWeight: "bold" }}>Imię:</Typography>
                </TableCell>
                <TableCell align="left">{firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontWeight: "bold" }}>Nazwisko:</Typography>
                </TableCell>
                <TableCell align="left">{lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Data urodzenia:
                  </Typography>
                </TableCell>
                <TableCell align="left">{dob}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontWeight: "bold" }}>Email:</Typography>
                </TableCell>
                <TableCell align="left">{email}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent="space-around" mt={3.5} spacing={2}>
          <Grid item>
            <ChangePasswordView />
          </Grid>
          <Grid item>
            <SelfUpdateInfo
              firstName={firstName}
              lastName={lastName}
              dob={dob}
              setReload={setReload}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UserInfoTable;
