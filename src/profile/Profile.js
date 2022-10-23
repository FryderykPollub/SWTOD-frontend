import React from "react";
import { Box } from "@mui/system";
import UpperBar from "../naviBar/UpperBar";
import SideBar from "./SideBar";
import UserInfoTable from "./UserInfoTable";
import { Divider, Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import UserSummary from "./SummaryTable/UserSummary";
import GroupsTable from "./MyGroups/GroupsTable";

const Profile = () => {
  const [view, setView] = useState("info");
  const [showComponent, setShowComponent] = useState();

  useEffect(() => {
    if (view === "info") {
      setShowComponent(<UserInfoTable />);
    } else if (view === "summary") {
      setShowComponent(<UserSummary />);
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
          <SideBar currentView={setView} />
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

export default Profile;
