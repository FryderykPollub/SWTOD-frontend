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
const ClassesTable = () => {
  function createData(
    przedmiot,
    kierunek,
    rodzajSt,
    stopien,
    rokSt,
    semestr,
    isZim,
    wyklad,
    semin,
    cwicz,
    lab,
    proj,
    grWyklad,
    grSemin,
    grCwicz,
    grLab,
    grProj
  ) {
    return {
      przedmiot,
      kierunek,
      rodzajSt,
      stopien,
      rokSt,
      semestr,
      isZim,
      wyklad,
      semin,
      cwicz,
      lab,
      proj,
      grWyklad,
      grSemin,
      grCwicz,
      grLab,
      grProj,
    };
  }

  const exampleData = [
    createData(
      "Bazy danych",
      "Informatyka",
      "Inżynierskie Stacjonarne",
      "I",
      "II",
      "V",
      true,
      3,
      null,
      null,
      10,
      null,
      1,
      null,
      null,
      5,
      null
    ),
    createData(
      "Bezpieczeństwo Informacji",
      "Informatyka",
      "Inżynierskie Niestacjonarne",
      "I",
      "II",
      "IV",
      false,
      3,
      null,
      null,
      15,
      null,
      2,
      null,
      null,
      3,
      null
    ),
    createData(
      "Bezpieczeństwo Systemów Informatycznych",
      "Informatyka",
      "Magisterskie Stacjonarne",
      "I",
      "III",
      "V",
      true,
      3,
      null,
      null,
      10,
      null,
      2,
      null,
      null,
      4,
      null
    ),
    createData(
      "Cyberbezpieczeństwo",
      "Informatyka",
      "Magisterskie Niestacjonarne",
      "I",
      "III",
      "V",
      true,
      2,
      null,
      15,
      null,
      null,
      2,
      null,
      2,
      null,
      null
    ),
  ];

  const navigate = useNavigate();

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
                  <Typography variant="h6">Nazwa Przedmiotu</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Kierunek</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Rodzaj studiów</Typography>
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
                <TableCell align="center">
                  <Typography variant="h6">Opcje</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exampleData.map((element, index) => (
                <CollapsibleRowAdmin
                  przedmiot={element.przedmiot}
                  kierunek={element.kierunek}
                  rodzajSt={element.rodzajSt}
                  stopien={element.stopien}
                  rokSt={element.rokSt}
                  semestr={element.semestr}
                  isZim={element.isZim}
                  wyklad={element.wyklad}
                  semin={element.semin}
                  cwicz={element.cwicz}
                  lab={element.lab}
                  proj={element.proj}
                  grWyklad={element.grWyklad}
                  grSemin={element.grSemin}
                  grCwicz={element.grCwicz}
                  grLab={element.grLab}
                  grProj={element.grProj}
                  key={index}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent="space-around" mt={3.5} spacing={2}>
          <Grid item>
            <AddClassButton />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ClassesTable;
