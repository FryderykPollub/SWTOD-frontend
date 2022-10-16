import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SubjectIcon from "@mui/icons-material/Subject";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LogoutIcon from "@mui/icons-material/Logout";
import SecurityIcon from "@mui/icons-material/Security";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../util/useLocalStorage";
import fetchApi from "../service/FetchService";
import { BASE_URL } from "../util/globalVars";
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupsIcon from '@mui/icons-material/Groups';

const SideBar = ({ currentView }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [isAdmin, setIsAdmin] = useState(false);

  function checkAdmin() {
    fetchApi(BASE_URL + `/admin/validate`, "GET", jwt, null)
      .then((response) => {
        if (response.status === 200) setIsAdmin(true);
        else setIsAdmin(false);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => currentView("profile")}>
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Dane osobowe" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => currentView("posts")}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Rozliczenie godzin" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => currentView("answers")}>
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Moje grupy" />
              </ListItemButton>
            </ListItem>
            {isAdmin ? (
              <ListItem disablePadding>
                <ListItemButton onClick={() => currentView("admin")}>
                  <ListItemIcon>
                    <SecurityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin Panel" />
                </ListItemButton>
              </ListItem>
            ) : (
              <></>
            )}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a" onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Wyloguj" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </>
  );
};

export default SideBar;
