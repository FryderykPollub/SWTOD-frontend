import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import fetchApi from "../../service/FetchService";
import { BASE_URL } from "../../util/globalVars";
import { useLocalStorage } from "../../util/useLocalStorage";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const UserSummary = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [actualPensum, setActualPensum] = useState("");
  const [expectedPensum, setExpectedPensum] = useState("");
  const [isCorrect, setIsCorrect] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [overtimePercent, setOvertimePercent] = useState("");
  const [username, setUsername] = useLocalStorage("", "user");
  const [id, setId] = useState("");

  function getUser() {
    let statusResponse;

    fetchApi(BASE_URL + `/api/user?username=${username}`, "GET", jwt, null)
      .then((response) => {
        statusResponse = response.status;
        return response.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setId(body.id);
        }
      });
  }

  function getPensum() {
    let statusResponse;

    fetchApi(BASE_URL + `/api/pensum/${id}`, "GET", jwt, null)
      .then((res) => {
        statusResponse = res.status;
        return res.json();
      })
      .then((body) => {
        if (statusResponse === 200) {
          setActualPensum(body.actualPensum);
          setExpectedPensum(body.expectedPensum);
          setIsCorrect(body.isCorrect);
          setOvertimeHours(body.overtimeHoursNumber);
          setOvertimePercent(body.percentOfOvertimeHours);
        }
      });
  }

  useEffect(() => {
    getUser();
    console.log(id);
  }, []);

  useEffect(() => {
    getPensum();
  }, [id]);

  return (
    <>
      <Grid item width="40%">
        <Typography variant="h4" sx={{ mb: 3 }} textAlign="center">
          Pensum
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }}>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Aktualne pensum:
                  </Typography>
                </TableCell>
                <TableCell align="left">{actualPensum}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Oczekiwane pensum:
                  </Typography>
                </TableCell>
                <TableCell align="left">{expectedPensum}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Liczba nadgodzin:
                  </Typography>
                </TableCell>
                <TableCell align="left">{overtimeHours}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Procent nadgodzin:
                  </Typography>
                </TableCell>
                <TableCell align="left">{overtimePercent}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <Typography sx={{ fontWeight: "bold" }}>
                    Poprawność pensum:
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  {isCorrect ? (
                    <CheckCircleIcon sx={{ color: "lightgreen" }} />
                  ) : (
                    <CancelOutlinedIcon sx={{ color: "red" }} />
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default UserSummary;
