import {
  Alert,
  AlertTitle,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import { useLocalStorage } from "../../util/useLocalStorage";
import PensumDetailsRow from "./PensumDetailsRow";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import CheckCorrectnessButton from "./CheckCorrectnessButton";

const PensumTable = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [users, setUsers] = useState([]);

  const [reload, setReload] = useState(false);

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
        }
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Grid item width="90%">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          sx={{ mb: 1 }}
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
              Pensa
            </Typography>
          </Grid>
          <Grid item mt={0.5}>
            <CheckCorrectnessButton />
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="h6">Imię</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Nazwisko</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Tytuł</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Stanowisko</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Pensum</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Opcje</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <PensumDetailsRow
                  id={user.id}
                  name={user.name}
                  surname={user.surname}
                  title={user.title}
                  position={user.positionName}
                  pensum={300}
                  key={user.id}
                />
              ))}
            </TableBody>
            <TableBody>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell align="right">
                <Typography variant="h6">Suma</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">1200</Typography>
              </TableCell>
              <TableCell />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default PensumTable;
