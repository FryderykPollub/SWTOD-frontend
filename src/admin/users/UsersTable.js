import {
  Alert,
  AlertTitle,
  Button,
  Grid,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import { useLocalStorage } from "../../util/useLocalStorage";
import AddUserButton from "./AddUserButton";
import UserDetailsRow from "./UserDetailsRow";

const UsersTable = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [users, setUsers] = useState([]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function getUsers() {
    let statusResponse;

    fetchApi(BASE_URL + "/api/user/all", "GET", jwt, null)
      .then((res) => {
        statusResponse = res.status;
        return res.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setUsers(body);
        } else {
          setErrorMessage(body.message);
          setErrorOpen(true);
        }
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Grid item width="90%">
        <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
          Użytkownicy
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">
                  <Typography variant="h6">Imię</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Nazwisko</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">Rola</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Opcje</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <UserDetailsRow
                  id={user.id}
                  name={user.name}
                  surname={user.surname}
                  email={user.email}
                  title={user.title}
                  position={user.positionName}
                  dob={user.dob}
                  isAdmin={user.isAdmin}
                  isActive={user.isActive}
                  key={user.id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent="space-around" mt={3.5} spacing={2}>
          <Grid item>
            <AddUserButton />
          </Grid>
        </Grid>
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
      </Grid>
    </>
  );
};

export default UsersTable;
