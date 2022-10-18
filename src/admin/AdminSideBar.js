import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  import React from "react";
  import { Box } from "@mui/system";
  import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
  import LogoutIcon from "@mui/icons-material/Logout";
  import { useNavigate } from "react-router-dom";
  import GroupsIcon from '@mui/icons-material/Groups';
  import GroupIcon from '@mui/icons-material/Group';
  import SchoolIcon from '@mui/icons-material/School';
  import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
  import MenuBookIcon from '@mui/icons-material/MenuBook';
  
  const AdminSideBar = ({ currentView }) => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.clear();
      navigate("/");
    };
  
    return (
      <>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => currentView("info")}>
                  <ListItemIcon>
                    <AssignmentIndIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dane osobowe" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => currentView("users")}>
                  <ListItemIcon>
                    <GroupIcon />
                  </ListItemIcon>
                  <ListItemText primary="Użytkownicy" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => currentView("classes")}>
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                  <ListItemText primary="Przedmioty" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => currentView("mailBox")}>
                  <ListItemIcon>
                    <MarkunreadMailboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Prośby" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => currentView("semesters")}>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary="Semestry" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => currentView("groups")}>
                  <ListItemIcon>
                    <GroupsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Moje grupy" />
                </ListItemButton>
              </ListItem>
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
  
  export default AdminSideBar;
  