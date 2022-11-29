import React, { useEffect, useState } from "react";
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
import AcceptClassButton from "./AcceptClassButton";
import DeclineClassButton from "./DeclineClassButton";

const CollapsibleRowGroups = ({
  setReload,
  userId,
  subjectId,
  status,
  wydzial,
  przedmiot,
  kierunek,
  rodzajSt,
  rokSt,
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
  const [kierunekName, setKierunekName] = useState("");
  const [rodzajName, setRodzajName] = useState("");
  const [statusColor, setStatusColor] = useState("");

  const sumWyklad = godzWyklad * grWyklad;
  const sumSemin = godzSemin * grSemin;
  const sumCwicz = godzCwicz * grCwicz;
  const sumLab = godzLab * grLab;
  const sumProj = godzProj * grProj;

  function setNames() {
    if (kierunek === "I") {
      setKierunekName("Informatyka");
    } else {
      setKierunekName("Elektrotechnika");
    }

    if (rodzajSt === "IST") {
      setRodzajName("Inżynierskie Stacjonarne");
    } else if (rodzajSt === "INS") {
      setRodzajName("Inżynierskie Niestacjonarne");
    } else if (rodzajSt === "MST") {
      setRodzajName("Magisterskie Stacjonarne");
    } else if (rodzajSt === "MNS") {
      setRodzajName("Magisterskie Niestacjonarne");
    }

    if (status === "odrzucony") {
      setStatusColor("red");
    } else if (status === "zaakceptowany") {
      setStatusColor("lightgreen");
    } else {
      setStatusColor("goldenrod");
    }
  }

  useEffect(() => {
    setNames();
  });

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
        <TableCell>{kierunekName}</TableCell>
        <TableCell>{rodzajName}</TableCell>
        <TableCell>{rokSt}</TableCell>
        <TableCell align="center">
          {status === "oczekujący" ? (
            <>
              <AcceptClassButton
                userId={userId}
                subjectId={subjectId}
                setReload={setReload}
              />
              <DeclineClassButton
                userId={userId}
                subjectId={subjectId}
                setReload={setReload}
              />
            </>
          ) : (
            <>
              <Typography color={statusColor}>{status}</Typography>
            </>
          )}
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

export default CollapsibleRowGroups;
