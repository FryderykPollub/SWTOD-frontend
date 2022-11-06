import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import UpperBar from "../naviBar/UpperBar";
import Papa from "papaparse";
import { BASE_URL } from "../util/globalVars";
import { useLocalStorage } from "../util/useLocalStorage";

const FileImport = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [file, setFile] = useState();
  const [output, setOutput] = useState();

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = () => {
    if (file) {
      postFile(file);
      fileReader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        const all = parsedData;
        setOutput(all);
        console.log(all);
      };
      fileReader.readAsText(file);
    }
  };

  function postFile(sendFile) {
    fetch(BASE_URL + "/api/plan-year-subject/upload-file", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  return (
    <>
      <UpperBar />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        marginTop={5}
      >
        <Grid item>
          <Grid container direction="row">
            <Grid item>
              <form>
                <input
                  type={"file"}
                  id={"csvFileInput"}
                  accept={".csv"}
                  onChange={handleOnChange}
                />
              </form>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  handleOnSubmit();
                }}
              >
                Import CSV
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default FileImport;
