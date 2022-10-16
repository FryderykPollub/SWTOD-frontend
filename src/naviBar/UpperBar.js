import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

const UpperBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <IconButton sx={{ color: "inherit" }} onClick={() => navigate("/")}>
                <HomeIcon />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
            >
              SWTOD
            </Typography>
            <IconButton color="inherit" onClick={() => navigate("/login")}>
              <PersonIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default UpperBar;
