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
import ClassCollapsibleRow from "./ClassCollapsibleRow";
import BindClassButton from "./BindClassButton";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import { useLocalStorage } from "../../util/useLocalStorage";
import Filters from "./Filters";

const SemesterTable = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [academicYears, setAcademicYears] = useState([]);
  const [selection, setSelection] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [rokAkadem, setRokAkadem] = useState("2022/2023");
  const [nameFilter, setNameFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [reload, setReload] = useState(false);

  function handleSelection(val) {
    setSelection(val);
    setRokAkadem(academicYears[val]);
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

  function getTeachingStuff(nameSurname, subjectName) {
    let responseStatus;

    fetchApi(
      BASE_URL +
        `/api/plan-year-subject-user/filters?academicYear=${rokAkadem}&userNameSurname=${nameSurname}&subjectName=${subjectName}`,
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
          setSubjects(body);
        }
      });
  }

  useEffect(() => {
    getAcademicYears();
    getTeachingStuff("", "");
  }, []);

  useEffect(() => {
    getTeachingStuff(nameFilter, subjectFilter);
  }, [nameFilter, subjectFilter]);

  useEffect(() => {
    if (reload) {
      getTeachingStuff(nameFilter, subjectFilter);
      setReload(false);
    }
  }, [reload]);

  return (
    <>
      <Grid item width="90%">
        <Grid container direction="column">
          <Grid item>
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
                  onChange={(e) => handleSelection(e.target.value)}
                >
                  {academicYears.map((el, i) => (
                    <MenuItem value={i}>{el}</MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Filters setName={setNameFilter} setSubject={setSubjectFilter} />
          </Grid>
          <Grid item>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <BindClassButton
                        rokAkadem={rokAkadem}
                        setReload={setReload}
                      />
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
                    <TableCell>
                      <Typography variant="h6">Status</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">Opcje</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((el, i) => (
                    <ClassCollapsibleRow
                      setReload={setReload}
                      userId={el.userId}
                      subjectId={el.subjectId}
                      rokAkadem={rokAkadem}
                      wydzial={el.facultyName}
                      przedmiot={el.subjectName}
                      kierunek={el.fieldOfStudiesName}
                      rodzaj={el.studiesTypeName}
                      rok={el.year}
                      semestr={el.semesterNumber}
                      lTyg={el.noWeeks}
                      godzWyklad={el.lectureHoursPerWeek}
                      grupWyklad={el.groupsPerLecture}
                      godzSemin={el.seminaryHoursPerWeek}
                      grupSemin={el.groupsPerSeminary}
                      godzCwicz={el.exerciseHoursPerWeek}
                      grupCwicz={el.groupsPerExercise}
                      godzLab={el.laboratoryHoursPerWeek}
                      grupLab={el.groupsPerLaboratory}
                      godzProj={el.projectHoursPerWeek}
                      grupProj={el.groupsPerProject}
                      status={el.statusName}
                      key={i}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SemesterTable;
