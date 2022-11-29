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
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import CollapsibleRowGroups from "./CollapsibleRowGroups";

const GroupsTable = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [username, setUsername] = useLocalStorage("", "user");
  const [userId, setUserId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selection, setSelection] = useState(0);
  const [rokAkadem, setRokAkadem] = useState("2022/2023");
  const [academicYears, setAcademicYears] = useState([]);
  const [reload, setReload] = useState(false);

  function handleSelection(val) {
    setSelection(val);
    setRokAkadem(academicYears[val]);
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
          setUserId(body.id);
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

  function getTeachingStuff() {
    let responseStatus;

    fetchApi(
      BASE_URL +
        `/api/plan-year-subject-user/filters?academicYear=${rokAkadem}`,
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
    getUser();
    getTeachingStuff();
    getAcademicYears();
  }, []);

  useEffect(() => {
    if (reload) {
      getTeachingStuff();
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
          alignItems="stretch"
          sx={{ mb: 1 }}
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
              Grupy na rok:
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
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
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
                  <Typography variant="h6">Status</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((element) =>
                element.userId === userId ? (
                  <CollapsibleRowGroups
                    setReload={setReload}
                    userId={element.userId}
                    subjectId={element.subjectId}
                    status={element.statusName}
                    wydzial={element.facultyName}
                    przedmiot={element.subjectName}
                    kierunek={element.fieldOfStudiesName}
                    rodzajSt={element.studiesTypeName}
                    rokSt={element.year}
                    isZim={element.semesterType === "Z" ? true : false}
                    godzWyklad={element.lectureHoursPerWeek}
                    godzSemin={element.seminaryHoursPerWeek}
                    godzCwicz={element.exerciseHoursPerWeek}
                    godzLab={element.laboratoryHoursPerWeek}
                    godzProj={element.projectHoursPerWeek}
                    grWyklad={element.groupsPerLecture}
                    grSemin={element.groupsPerSeminary}
                    grCwicz={element.groupsPerExercise}
                    grLab={element.groupsPerLaboratory}
                    grProj={element.groupsPerProject}
                    key={element.subjectId}
                  />
                ) : (
                  <></>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default GroupsTable;
