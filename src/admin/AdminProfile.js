import React from "react";
import { Box } from "@mui/system";
import UpperBar from "../naviBar/UpperBar";
import { Divider, Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useLocalStorage } from "../util/useLocalStorage";
import AdminSideBar from "./AdminSideBar";
import ClassesTable from "./classes/ClassesTable";
import UserInfoTable from "../profile/userInfoTable/UserInfoTable";
import UsersTable from "./users/UsersTable";
import GroupsTable from "../profile/myGroups/GroupsTable";
import SemesterTable from "./teachingStaff/SemesterTable";

const AdminProfile = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [userId, setUserId] = useState("");

  const [view, setView] = useState("info");
  const [showComponent, setShowComponent] = useState();

  useEffect(() => {
    if (view === "info") {
      setShowComponent(<UserInfoTable />);
    } else if (view === "users") {
      setShowComponent(<UsersTable />);
    } else if (view === "classes") {
      setShowComponent(<ClassesTable />);
    } else if (view === "semesters") {
      setShowComponent(<SemesterTable />);
    } else if (view === "groups") {
      setShowComponent(<GroupsTable />);
    } else {
      setShowComponent(<></>);
    }
  }, [view]);

  return (
    <>
      <UpperBar />
      <Box
        sx={{
          mt: 3,
          mr: 3,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "20%",
            mr: 3,
          }}
        >
          <AdminSideBar currentView={setView} />
        </Box>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {showComponent}
        </Grid>
      </Box>
    </>
  );
};

export default AdminProfile;
