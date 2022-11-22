import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AcceptClassButton from "./AcceptClassButton";
import DeclineClassButton from "./DeclineClassButton";

const CollapsibleRowGroups = ({
  id,
  wydzial,
  przedmiot,
  kierunek,
  rodzajSt,
  rokSt,
  semestr,
  isZim,
  godzWyklad,
  godzSemin,
  godzCwicz,
  godzLab,
  godzProj,
  grWyklad,
  grSemin,
  grCwicz,
  grLab,
  grProj,
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
        <TableCell>{wydzial}</TableCell>
        <TableCell>{przedmiot}</TableCell>
        <TableCell>{kierunek}</TableCell>
        <TableCell>{rodzajSt}</TableCell>
        <TableCell>{rokSt}</TableCell>
        <TableCell align="center">
          <AcceptClassButton />
          <DeclineClassButton />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ m: 3 }}>
            <Box>
              <Typography variant="h6" textAlign="center" sx={{ mb: 1.5 }}>
                Semestr {isZim ? "zimowy" : "letni"}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="center">Wykład</TableCell>
                    <TableCell align="center">Seminarium</TableCell>
                    <TableCell align="center">Ćwiczenia</TableCell>
                    <TableCell align="center">Laboratoria</TableCell>
                    <TableCell align="center">Projekt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      Liczba godzin w tygodniu
                    </TableCell>
                    <TableCell align="center">{godzWyklad}</TableCell>
                    <TableCell align="center">{godzSemin}</TableCell>
                    <TableCell align="center">{godzCwicz}</TableCell>
                    <TableCell align="center">{godzLab}</TableCell>
                    <TableCell align="center">{godzProj}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Liczba grup</TableCell>
                    <TableCell align="center">{grWyklad}</TableCell>
                    <TableCell align="center">{grSemin}</TableCell>
                    <TableCell align="center">{grCwicz}</TableCell>
                    <TableCell align="center">{grLab}</TableCell>
                    <TableCell align="center">{grProj}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollapsibleRowGroups;
