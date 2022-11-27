import { TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import EditPensumButton from "./EditPensumButton";

const PensumDetailsRow = ({ id, name, surname, title, position, pensum }) => {
  return (
    <>
      <TableRow>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{surname}</TableCell>
        <TableCell align="center">{title}</TableCell>
        <TableCell align="center">{position}</TableCell>
        <TableCell align="center">{pensum}</TableCell>
        <TableCell align="center">
          <EditPensumButton />
        </TableCell>
      </TableRow>
    </>
  );
};

export default PensumDetailsRow;
