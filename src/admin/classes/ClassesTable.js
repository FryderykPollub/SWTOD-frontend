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
import { useLocalStorage } from "../../util/useLocalStorage";
import AddClassButton from "./AddClassButton";
import CollapsibleRowAdmin from "./CollapsibleRowAdmin";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import UploadFileButton from "./UploadFileButton";

const ClassesTable = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [subjects, setSubjects] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selection, setSelection] = useState(0);
  const [reload, setReload] = useState(false);
  const [rokAkadem, setRokAkadem] = useState("2022/2023");

  function handleSelection(val) {
    setSelection(val);
    setRokAkadem(academicYears[val]);
  }

  function getSubjects() {
    var responseStatus;

    fetchApi(
      BASE_URL +
        `/api/plan-year-subject/academic-year?academicYear=${rokAkadem}`,
      "GET",
      jwt,
      null
    )
      .then((response) => {
        responseStatus = response.status;
        return response.json();
      })
      .then((body) => {
        if (responseStatus === 200) {
          setSubjects(body);
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
    getAcademicYears();
  }, []);

  useEffect(() => {
    getSubjects();
    // console.log(subjects);
  }, []);

  useEffect(() => {
    if (reload) {
      getSubjects();
      setReload(false);
    }
  }, [reload]);

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
              Przedmioty na rok:
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
          <Grid item>
            <UploadFileButton setReload={setReload} />
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <AddClassButton rokAkadem={rokAkadem} />
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Wydział</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Nazwa Przedmiotu</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Kierunek</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Rodzaj studiów</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Rok studiów</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Opcje</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((element) => (
                <CollapsibleRowAdmin
                  id={element.subjectId}
                  wydzial={element.facultyName}
                  przedmiot={element.subjectName}
                  kierunek={element.fieldOfStudiesName}
                  rodzajSt={element.typeOfStudiesName}
                  rokSt={element.year}
                  isZim={element.semesterType === "Z" ? true : false}
                  godzWyklad={element.lectureHoursNumberPerWeek}
                  godzSemin={element.seminaryHoursNumberPerWeek}
                  godzCwicz={element.exerciseHoursNumberPerWeek}
                  godzLab={element.laboratoryHoursNumberPerWeek}
                  godzProj={element.projectHoursNumberPerWeek}
                  grWyklad={element.groupsPerLecture}
                  grSemin={element.groupsPerSeminary}
                  grCwicz={element.groupsPerExercise}
                  grLab={element.groupsPerLaboratory}
                  grProj={element.groupsPerProject}
                  setReload={setReload}
                  rokAkadem={rokAkadem}
                  key={element.subjectId}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default ClassesTable;
