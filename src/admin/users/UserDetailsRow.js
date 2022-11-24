import {
  Alert,
  AlertTitle,
  IconButton,
  Snackbar,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import EditUserButton from "./EditUserButton";
import React, { useState } from "react";
import BlockUserButton from "./BlockUserButton";

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
  setReload,
}) => {
  const [infoOpen, setInfoOpen] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{surname}</TableCell>
        <TableCell align="center">{title}</TableCell>
        <TableCell align="center">{position}</TableCell>
        <TableCell align="center">{email}</TableCell>
        <TableCell align="center">
          {isAdmin ? (
            <Typography color="lightslategray">administrator</Typography>
          ) : (
            <Typography color="lightslategray">użytkownik</Typography>
          )}
        </TableCell>
        <TableCell align="center">
          {isActive ? (
            <Typography color="lightgreen">aktywny</Typography>
          ) : (
            <Typography color="red">zablokowany</Typography>
          )}
        </TableCell>
        <TableCell align="center">
          <EditUserButton
            id={id}
            email={email}
            title={title}
            setInfoOpen={setInfoOpen}
            setReload={setReload}
          />
          <Tooltip
            title="Generuj kartę obciążeń"
            placement="bottom"
            enterDelay={500}
          >
            <IconButton>
              <FileDownloadIcon />
            </IconButton>
          </Tooltip>
          {isAdmin ? (
            <></>
          ) : (
            <BlockUserButton
              id={id}
              isAdmin={isAdmin}
              isActive={isActive}
              setReload={setReload}
            />
          )}
        </TableCell>
      </TableRow>
      <Snackbar
        open={infoOpen}
        autoHideDuration={3000}
        onClose={() => setInfoOpen(false)}
      >
        <Alert
          onClose={() => setInfoOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Sukces</AlertTitle>
          Dane zostały zaktualizowane!
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserDetailsRow;
