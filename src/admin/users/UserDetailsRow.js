import {
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
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
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">{surname}</TableCell>
        <TableCell align="right">
          {isAdmin ? (
            <Typography color="lightslategray">administrator</Typography>
          ) : (
            <Typography color="lightslategray">użytkownik</Typography>
          )}
        </TableCell>
        <TableCell align="center">
          <Tooltip
            title="Edytuj dane użytkownika"
            placement="bottom"
            enterDelay={500}
          >
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Pokaż rozliczenie użytkownika"
            placement="bottom"
            enterDelay={500}
          >
            <IconButton>
              <TextSnippetIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Generuj kartę obciążeń"
            placement="bottom"
            enterDelay={500}
          >
            <IconButton>
              <FileDownloadIcon />
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
