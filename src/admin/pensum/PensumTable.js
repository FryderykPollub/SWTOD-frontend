import {
  Grid,
  MenuItem,
  Paper,
  Select,
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
import PensumDetailsRow from "./PensumDetailsRow";
import CheckCorrectnessButton from "./CheckCorrectnessButton";

const PensumTable = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [users, setUsers] = useState([]);
  const [selection, setSelection] = useState(0);
  const [rokAkadem, setRokAkadem] = useState("2022/2023");
  const [academicYears, setAcademicYears] = useState([]);

  function handleSelection(val) {
    setSelection(val);
    setRokAkadem(academicYears[val]);
  }

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

  function getAcademicYears() {
    let responseStatus;

    fetchApi(
      BASE_URL + `/api/plan-year-subject-user/academic-years`,
      "GET",
      jwt,
      null
    )
      .then((res) => {
        responseStatus = res.status;
        return res.json();
      })
      .then((body) => {
        if (responseStatus === 200) {
          setAcademicYears(body);
        }
      });
  }

  useEffect(() => {
    getUsers();
    getAcademicYears();
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
              Pensa na rok:
            </Typography>
          </Grid>
          <Grid item mt={-1}>
            <Select
              fullWidth
              value={selection}
              onChange={(e) => handleSelection(e.target.value)}
            >
              {academicYears.map((el, i) => (
                <MenuItem value={i}>{el}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item>
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
                  <Typography variant="h6">Aktualne pensum</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Oczekiwane pensum</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Ilość nadgodzin</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Procent pensum</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Poprawność obsady</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Opcje</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <PensumDetailsRow
                id={9999}
                name={"Piotr"}
                surname={"Nowak"}
                title={"Doktor"}
                position={"Asystent"}
                aktPensum={70}
                oczPensum={100}
                ileNadgodzin={0}
                procPensum={"70%"}
                isPoprawne={false}
                key={9999}
              />
            </TableBody>

            <TableBody>
              {users.map((user) => (
                <PensumDetailsRow
                  id={user.id}
                  name={user.name}
                  surname={user.surname}
                  title={user.title}
                  position={user.positionName}
                  aktPensum={120}
                  oczPensum={100}
                  ileNadgodzin={20}
                  procPensum={"120%"}
                  isPoprawne={true}
                  key={user.id}
                />
              ))}
            </TableBody>

            <TableBody>
              <PensumDetailsRow
                id={9998}
                name={"Karol"}
                surname={"Wojtyła"}
                title={"Doktor"}
                position={"Profesor"}
                aktPensum={400}
                oczPensum={100}
                ileNadgodzin={300}
                procPensum={"400%"}
                isPoprawne={false}
                key={9998}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default PensumTable;
