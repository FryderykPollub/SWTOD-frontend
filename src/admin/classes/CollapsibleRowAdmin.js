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
  Typography,
} from "@mui/material";
import EditClassButton from "./EditClassButton";
import DeleteClassButton from "./DeleteClassButton";

const CollapsibleRowAdmin = ({
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
        <TableCell>{rodzajSt}</TableCell>
        <TableCell>{stopien}</TableCell>
        <TableCell>{rokSt}</TableCell>
        <TableCell>{semestr}</TableCell>
        <TableCell align="center">
          <EditClassButton
            przedmiot={przedmiot}
            kierunek={kierunek}
            rodzajSt={rodzajSt}
            stopien={stopien}
            rokSt={rokSt}
            semestr={semestr}
            isZim={isZim}
            wyklad={wyklad}
            semin={semin}
            cwicz={cwicz}
            lab={lab}
            proj={proj}
            grWyklad={grWyklad}
            grSemin={grSemin}
            grCwicz={grCwicz}
            grLab={grLab}
            grProj={grProj}
          />
          <DeleteClassButton nazwaPrzedmiotu={przedmiot} />
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
                    <TableCell align="center">{wyklad}</TableCell>
                    <TableCell align="center">{semin}</TableCell>
                    <TableCell align="center">{cwicz}</TableCell>
                    <TableCell align="center">{lab}</TableCell>
                    <TableCell align="center">{proj}</TableCell>
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

export default CollapsibleRowAdmin;
