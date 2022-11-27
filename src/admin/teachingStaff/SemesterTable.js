import {
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
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
import ClassCollapsibleRow from "./ClassCollapsibleRow";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DATA } from "./ExampleData";
import BindClassButton from "./BindClassButton";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import { useLocalStorage } from "../../util/useLocalStorage";

const SemesterTable = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [academicYears, setAcademicYears] = useState([]);
  const [selection, setSelection] = useState(3);
  const [subjects, setSubjects] = useState(DATA);

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
    getAcademicYears();
  }, []);

  return (
    <>
      <Grid item width="90%">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 3 }}
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4" textAlign="center">
              Obsada na rok:
            </Typography>
          </Grid>
          <Grid item>
            <Select
              fullWidth
              value={selection}
              onChange={(e) => setSelection(e.target.value)}
            >
              {/* {academicYears.map((el, i) => (
                <MenuItem value={i}>{el}</MenuItem>
              ))} */}
              <MenuItem value={1}>{"2020/2021"}</MenuItem>
              <MenuItem value={2}>{"2021/2022"}</MenuItem>
              <MenuItem value={3}>{"2022/2023"}</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Tooltip title="Utwórz nowy rok akademicki" enterDelay={500}>
              <IconButton>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <BindClassButton />
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Prowadzący</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Wydział</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Przedmiot</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Kierunek</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Rodzaj studiów</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Rok</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Semestr</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Liczba tygodni</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((el, i) => (
                <ClassCollapsibleRow
                  prowadzacy={el.prowadzacy}
                  wydzial={el.wydzial}
                  przedmiot={el.przedmiot}
                  kierunek={el.kierunek}
                  rodzaj={el.rodzaj}
                  rok={el.rok}
                  semestr={el.semestr}
                  isZim={el.isZim}
                  lTyg={el.lTyg}
                  godzWyklad={el.godzWyklad}
                  grupWyklad={el.grupWyklad}
                  godzSemin={el.godzSemin}
                  grupSemin={el.grupSemin}
                  godzCwicz={el.godzCwicz}
                  grupCwicz={el.grupCwicz}
                  godzLab={el.godzLab}
                  grupLab={el.grupLab}
                  godzProj={el.godzProj}
                  grupProj={el.grupProj}
                  key={i}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default SemesterTable;
