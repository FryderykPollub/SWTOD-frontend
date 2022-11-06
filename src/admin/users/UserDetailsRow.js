import {
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BlockIcon from "@mui/icons-material/Block";
import React from "react";

const UserDetailsRow = ({
  id,
  name,
  surname,
  email,
  title,
  position,
  dob,
  isAdmin,
  isActive,
}) => {
  return (
    <>
      <TableRow>
        <TableCell>{name}</TableCell>
        <TableCell>{surname}</TableCell>
        <TableCell>
          {isAdmin ? (
            <Typography color="lightslategray">admin</Typography>
          ) : (
            <Typography color="lightslategray">user</Typography>
          )}
        </TableCell>
        <TableCell align="center">
          <Tooltip
            title="Zarządzaj użytkownikiem"
            placement="bottom"
            enterDelay={500}
          >
            <IconButton>
              <ManageAccountsIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Dezaktywuj konto" placement="bottom" enterDelay={500}>
            <span>
              <IconButton disabled={isAdmin}>
                <BlockIcon />
              </IconButton>
            </span>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserDetailsRow;
