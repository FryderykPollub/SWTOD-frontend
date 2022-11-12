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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useState } from "react";

const ClassCollapsibleRow = ({
  prowadzacy,
  wydzial,
  przedmiot,
  kierunek,
  rodzaj,
  rok,
  semestr,
  isZim,
  lTyg,
  godzWyklad,
  grupWyklad,
  godzSemin,
  grupSemin,
  godzCwicz,
  grupCwicz,
  godzLab,
  grupLab,
  godzProj,
  grupProj,
}) => {
  const [open, setOpen] = useState(false);

  const sumWyklad = godzWyklad * grupWyklad;
  const sumSemin = godzSemin * grupSemin;
  const sumCwicz = godzCwicz * grupCwicz;
  const sumLab = godzLab * grupLab;
  const sumProj = godzProj * grupProj;

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{prowadzacy}</TableCell>
        <TableCell>{wydzial}</TableCell>
        <TableCell>{przedmiot}</TableCell>
        <TableCell>{kierunek}</TableCell>
        <TableCell>{rodzaj}</TableCell>
        <TableCell>{rok}</TableCell>
        <TableCell>{semestr}</TableCell>
        <TableCell>{lTyg}</TableCell>
        <TableCell />
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
                    <TableCell align="center">{grupWyklad}</TableCell>
                    <TableCell align="center">{grupSemin}</TableCell>
                    <TableCell align="center">{grupCwicz}</TableCell>
                    <TableCell align="center">{grupLab}</TableCell>
                    <TableCell align="center">{grupProj}</TableCell>
                    <Divider orientation="vertical" sx={{ width: 20 }} />
                    <TableCell align="center">
                      <Typography fontWeight="bold">Razem</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography fontWeight="bold">Podsumowanie</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight="bold">{sumWyklad}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight="bold">{sumSemin}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight="bold">{sumCwicz}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight="bold">{sumLab}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography fontWeight="bold">{sumProj}</Typography>
                    </TableCell>
                    <Divider orientation="vertical" />
                    <TableCell align="center">
                      <Typography fontWeight="bold">
                        {sumWyklad + sumSemin + sumCwicz + sumLab + sumProj}
                      </Typography>
                    </TableCell>
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

export default ClassCollapsibleRow;
