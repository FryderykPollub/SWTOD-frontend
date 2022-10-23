import {
  Grid,
  IconButton,
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

import { useLocalStorage } from "../../util/useLocalStorage";
import CollapsibleRow from "./CollapsibleRow";

const UserSummary = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [course, setCourse] = useState("");
  const [faculty, setFaculty] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  function createData(
    przedmiot,
    kierunek,
    stopien,
    rokSt,
    semestr,
    isZim,
    lTyg,
    wyklad,
    semin,
    cwicz,
    lab,
    proj,
    lGrup
  ) {
    return {
      przedmiot,
      kierunek,
      stopien,
      rokSt,
      semestr,
      isZim,
      lTyg,
      wyklad,
      semin,
      cwicz,
      lab,
      proj,
      lGrup,
    };
  }

  const exampleData = [
    createData(
      "Bezpieczeństwo Informacji",
      "IINS",
      "I",
      "II",
      "IV",
      false,
      5,
      3,
      null,
      null,
      null,
      null,
      null
    ),
    createData(
      "Bezpieczeństwo Informacji",
      "IIST",
      "I",
      "II",
      "IV",
      false,
      15,
      2,
      null,
      null,
      2,
      null,
      6
    ),
    createData(
      "Bezpieczeństwo Systemów Informatycznych",
      "IINS",
      "I",
      "III",
      "V",
      true,
      5,
      3,
      null,
      null,
      null,
      null,
      null
    ),
    createData(
      "Bezpieczeństwo Systemów Informatycznych",
      "IIST",
      "I",
      "III",
      "V",
      true,
      15,
      2,
      null,
      null,
      null,
      null,
      null
    ),
    createData(
      "Projekt zespołowy - implementacja",
      "IIST",
      "I",
      "IV",
      "VII",
      true,
      10,
      null,
      null,
      null,
      null,
      3,
      2
    ),
  ];

  return (
    <>
      <Grid item width="90%">
        <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
          Rozliczenie godzin
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <Typography variant="h6">Przedmiot</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Kierunek</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Stopień</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Rok studiów</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Semestr</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exampleData.map((element) => (
                <CollapsibleRow
                  przedmiot={element.przedmiot}
                  kierunek={element.kierunek}
                  stopien={element.stopien}
                  rokSt={element.rokSt}
                  semestr={element.semestr}
                  isZim={element.isZim}
                  lTyg={element.lTyg}
                  wyklad={element.wyklad}
                  semin={element.semin}
                  cwicz={element.cwicz}
                  lab={element.lab}
                  proj={element.proj}
                  lGrup={element.lGrup}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default UserSummary;
