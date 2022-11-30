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
import CheckCorrectnessButton from "./CheckCorrectnessButton";
import PensumDetailsRow from "./PensumDetailsRow";

const PensumTable = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [pensum, setPensum] = useState([]);
  const [selection, setSelection] = useState(0);
  const [rokAkadem, setRokAkadem] = useState("2022/2023");
  const [academicYears, setAcademicYears] = useState([]);
  const [reload, setReload] = useState(false);

  function handleSelection(val) {
    setSelection(val);
    setRokAkadem(academicYears[val]);
  }

  function getPensums() {
    let statusResponse;

    fetchApi(BASE_URL + "/api/pensum", "GET", jwt, null)
      .then((res) => {
        statusResponse = res.status;
        return res.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setPensum(body);
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
    getPensums();
    getAcademicYears();
  }, []);

  useEffect(() => {
    if (reload) {
      getPensums();
    }
  }, [reload]);

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
            <CheckCorrectnessButton rokAkadem={rokAkadem} />
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
              {pensum.map((el) => (
                <PensumDetailsRow
                  id={el.userId}
                  name={el.name}
                  surname={el.surname}
                  title={el.title}
                  position={el.position}
                  aktPensum={el.actualPensum}
                  oczPensum={el.expectedPensum}
                  ileNadgodzin={el.overtimeHoursNumber}
                  procPensum={el.percentOfOvertimeHours}
                  isPoprawne={el.isCorrect}
                  key={el.userId}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default PensumTable;
