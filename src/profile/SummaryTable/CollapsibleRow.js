import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const CollapsibleRow = ({
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
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{przedmiot}</TableCell>
        <TableCell>{kierunek}</TableCell>
        <TableCell>{stopien}</TableCell>
        <TableCell>{rokSt}</TableCell>
        <TableCell>{semestr}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ m: 3 }}>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      Semestr {isZim ? "zimowy" : "letni"}
                    </TableCell>
                    <TableCell>L. tyg.</TableCell>
                    <TableCell>Wykład</TableCell>
                    <TableCell>Seminarium</TableCell>
                    <TableCell>Ćwiczenia</TableCell>
                    <TableCell>Laboratoria</TableCell>
                    <TableCell>Projekt</TableCell>
                    <Divider
                      orientation="vertical"
                      sx={{ borderRightWidth: 10, borderLeftWidth: 10 }}
                    />
                    <TableCell>L. grup</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell align="center">
                    Liczba godz. tygodn. wg planu studiów
                  </TableCell>
                  <TableCell>{lTyg}</TableCell>
                  <TableCell>{wyklad}</TableCell>
                  <TableCell>{semin}</TableCell>
                  <TableCell>{cwicz}</TableCell>
                  <TableCell>{lab}</TableCell>
                  <TableCell>{proj}</TableCell>
                  <Divider orientation="vertical" />
                  <TableCell>{lGrup}</TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollapsibleRow;
