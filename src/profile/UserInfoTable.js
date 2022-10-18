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
import fetchApi from "../service/FetchService";
import { useLocalStorage } from "../util/useLocalStorage";
import ChangePasswordView from "./ChangePasswordView";
import SelfUpdateInfo from "./SelfUpdateInfo";
import { BASE_URL } from "../util/globalVars";

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
          console.log(body);
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
      <Typography variant="h4" sx={{ mb: 3 }}>Dane osobowe</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Tytuł
              </TableCell>
              <TableCell align="right">{title}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Stanowisko
              </TableCell>
              <TableCell align="right">{position}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Imię
              </TableCell>
              <TableCell align="right">{firstName}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Nazwisko
              </TableCell>
              <TableCell align="right">{lastName}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Data Urodzenia
              </TableCell>
              <TableCell align="right">{dob}</TableCell>
            </TableRow>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Email
              </TableCell>
              <TableCell align="right">{email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Grid container justifyContent="space-around" mt={3.5}>
        <Grid item>
          <ChangePasswordView id={id} />
        </Grid>
        <Grid item>
          <SelfUpdateInfo
            id={id}
            firstName={firstName}
            lastName={lastName}
            dob={dob}
            setReload={setReload}
          />
        </Grid>
      </Grid> */}
    </>
  );
};

export default UserInfoTable;
