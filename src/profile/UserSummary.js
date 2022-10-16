import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";

  import { useLocalStorage } from "../util/useLocalStorage";


  const UserSummary = ({ id }) => {
    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [course, setCourse] = useState("");
    const [faculty, setFaculty] = useState("");
    const [degree, setDegree] = useState("");
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");
  
    return (
      <>
        <Typography variant="h4" sx={{mb: 3}}>Rozliczenie godzin</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Przedmiot
                </TableCell>
                <TableCell align="right">{course}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Kierunek
                </TableCell>
                <TableCell align="right">{faculty}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Stopień
                </TableCell>
                <TableCell align="right">{degree}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Rok studiów
                </TableCell>
                <TableCell align="right">{year}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Semestr
                </TableCell>
                <TableCell align="right">{semester}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };
  
  export default UserSummary;
  