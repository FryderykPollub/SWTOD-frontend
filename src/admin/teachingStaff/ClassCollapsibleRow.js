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
import React, { useEffect, useState } from "react";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import { useLocalStorage } from "../../util/useLocalStorage";
import EditAssignment from "./EditAssignment";
import DeleteAssignment from "./DeleteAssignment";

const ClassCollapsibleRow = ({
  setReload,
  userId,
  subjectId,
  rokAkadem,
  wydzial,
  przedmiot,
  kierunek,
  rodzaj,
  rok,
  semestr,
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
  status,
}) => {
  const [open, setOpen] = useState(false);
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [userName, setUserName] = useState("");
  const [userSurname, setUserSurname] = useState("");
  const [kierunekName, setKierunekName] = useState("");
  const [rodzajName, setRodzajName] = useState("");
  const [statusColor, setStatusColor] = useState("");

  const sumWyklad = godzWyklad * grupWyklad;
  const sumSemin = godzSemin * grupSemin;
  const sumCwicz = godzCwicz * grupCwicz;
  const sumLab = godzLab * grupLab;
  const sumProj = godzProj * grupProj;

  function getUserById() {
    let statusResponse;

    fetchApi(BASE_URL + `/api/user/${userId}`, "GET", jwt, null)
      .then((response) => {
        statusResponse = response.status;
        return response.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setUserName(body.name);
          setUserSurname(body.surname);
        }
      });
  }

  function setNames() {
    if (kierunek === "I") {
      setKierunekName("Informatyka");
    } else {
      setKierunekName("Elektrotechnika");
    }

    if (rodzaj === "IST") {
      setRodzajName("Inżynierskie Stacjonarne");
    } else if (rodzaj === "INS") {
      setRodzajName("Inżynierskie Niestacjonarne");
    } else if (rodzaj === "MST") {
      setRodzajName("Magisterskie Stacjonarne");
    } else if (rodzaj === "MNS") {
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
    getUserById();
    setNames();
  }, []);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{userName + " " + userSurname}</TableCell>
        <TableCell>{wydzial}</TableCell>
        <TableCell>{przedmiot}</TableCell>
        <TableCell>{kierunekName}</TableCell>
        <TableCell>{rodzajName}</TableCell>
        <TableCell>{rok}</TableCell>
        <TableCell>{semestr}</TableCell>
        <TableCell>{lTyg}</TableCell>
        <TableCell>
          <Typography color={statusColor}>{status}</Typography>
        </TableCell>
        <TableCell align="center">
          <EditAssignment
            setReload={setReload}
            userId={userId}
            subjectId={subjectId}
            rokAkadem={rokAkadem}
          />
          <DeleteAssignment
            setReload={setReload}
            userId={userId}
            subjectId={subjectId}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ m: 3 }}>
            <Box>
              <Typography variant="h6" textAlign="center" sx={{ mb: 1.5 }}>
                Semestr {semestr % 2 === 0 ? "zimowy" : "letni"}
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
