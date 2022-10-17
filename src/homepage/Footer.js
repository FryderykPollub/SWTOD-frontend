import { Grid, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="flex-end"
        sx={{ position: "fixed", bottom: 10 }}
      >
        <Grid item>
          <Typography variant="body2">
            Created by M&M
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
