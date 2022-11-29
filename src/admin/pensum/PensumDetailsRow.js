import { TableCell, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import EditPensumButton from "./EditPensumButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const PensumDetailsRow = ({
  id,
  name,
  surname,
  title,
  position,
  aktPensum,
  oczPensum,
  ileNadgodzin,
  procPensum,
  isPoprawne,
}) => {
  return (
    <>
      <TableRow>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{surname}</TableCell>
        <TableCell align="center">{title}</TableCell>
        <TableCell align="center">{position}</TableCell>
        <TableCell align="center">{aktPensum}</TableCell>
        <TableCell align="center">{oczPensum}</TableCell>
        <TableCell align="center">{ileNadgodzin}</TableCell>
        <TableCell align="center">{procPensum}</TableCell>
        <TableCell align="center">
          {isPoprawne ? (
            <Typography color="lightgreen">
              <CheckCircleOutlineIcon />
            </Typography>
          ) : (
            <Typography color="red">
              <CancelOutlinedIcon color="red" />
            </Typography>
          )}
        </TableCell>
        <TableCell align="center">
          <EditPensumButton />
        </TableCell>
      </TableRow>
    </>
  );
};

export default PensumDetailsRow;
