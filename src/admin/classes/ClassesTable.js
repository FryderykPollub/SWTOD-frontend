import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../util/useLocalStorage";
import AddClassButton from "./AddClassButton";
import CollapsibleRowAdmin from "./CollapsibleRowAdmin";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import DeleteAllButton from "./DeleteAllButton";

const ClassesTable = () => {
  const navigate = useNavigate();
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [subjects, setSubjects] = useState([]);

  function getSubjects() {
    var responseStatus;

    fetchApi(BASE_URL + "/api/plan-year-subject/all", "GET", jwt, null)
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

  useEffect(() => {
    getSubjects();
    console.log(subjects);
  }, []);

  return (
    <>
      <Grid item width="90%">
        <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
          Przedmioty
        </Typography>
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
                  key={element.subjectId}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent="space-around" mt={3.5} spacing={2}>
          <Grid item>
            <AddClassButton />
          </Grid>
          <Grid item>
            <DeleteAllButton />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ClassesTable;
