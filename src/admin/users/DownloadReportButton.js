import { IconButton, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import React from "react";
import { BASE_URL } from "../../util/globalVars";
import { useLocalStorage } from "../../util/useLocalStorage";

const DownloadReportButton = ({ id, name, surname }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");

  function sendRequest() {
    fetch(
      BASE_URL +
        `/api/plan-year-subject-user/${id}/report
        `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/csv",
        },
        Authorization: `Bearer ${jwt}`,
      }
    )
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        const fileName = name + "_" + surname + "-report" + ".csv";
        link.setAttribute("download", fileName);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  }

  return (
    <>
      <Tooltip
        title="Generuj kartę obciążeń"
        placement="bottom"
        enterDelay={500}
      >
        <IconButton onClick={() => sendRequest()}>
          <FileDownloadIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DownloadReportButton;
