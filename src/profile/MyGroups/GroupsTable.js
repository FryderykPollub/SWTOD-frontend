import {
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
import React from "react";

const GroupsTable = () => {
  function createData(przedmiot, kod, lGrup, lGodz) {
    return {
      przedmiot,
      kod,
      lGrup,
      lGodz,
    };
  }

  const exampleData = [
    createData("Bezpieczeństwo Informacji", "IIS4.6", 10, 30),
    createData("Bezpieczeństwo Informacji", "", 5, 15),
    createData("Bezpieczeństwo Systemów Informatycznych", "", 12, 30),
    createData("Bezpieczeństwo Systemów Informatycznych", "", 4, 10),
    createData("Projekt zespołowy - implementacja", "", 3, 30),
  ];

  return (
    <>
      <Grid item width="90%">
        <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
          Moje Grupy
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Przedmiot</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Kod przedmiotu</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Liczba grup</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Liczba godzin</Typography>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {exampleData.map((el) => (
                <TableRow>
                  <TableCell>{el.przedmiot}</TableCell>
                  <TableCell>{el.kod}</TableCell>
                  <TableCell>{el.lGrup}</TableCell>
                  <TableCell>{el.lGodz}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default GroupsTable;
