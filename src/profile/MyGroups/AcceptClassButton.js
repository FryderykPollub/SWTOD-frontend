import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton, Tooltip } from "@mui/material";

const AcceptClassButton = () => {
  function sendRequest() {}

  return (
    <>
      <Tooltip title="Zaakceptuj propozycję" placement="bottom">
        <IconButton onClick={() => sendRequest()}>
          <CheckCircleIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default AcceptClassButton;
