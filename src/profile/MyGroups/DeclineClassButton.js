import { IconButton, Tooltip } from "@mui/material";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import React from "react";

const DeclineClassButton = () => {
  function sendRequest() {}

  return (
    <>
      <Tooltip title="Odrzuć propozycję" placement="bottom">
        <IconButton onClick={() => sendRequest()}>
          <NotInterestedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DeclineClassButton;
