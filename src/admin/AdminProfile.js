import React from "react";
import { Box } from "@mui/system";
import UpperBar from "../naviBar/UpperBar";
import { Divider } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import fetchApi from "../service/FetchService";
import { useLocalStorage } from "../util/useLocalStorage";
import { BASE_URL } from "../util/globalVars";
import AdminSideBar from "./AdminSideBar";

const AdminProfile = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [userId, setUserId] = useState("");

  const [view, setView] = useState("info");
  const [showComponent, setShowComponent] = useState();

  function getUserId() {
    fetchApi(BASE_URL + "/user/me", "GET", jwt, null)
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        setUserId(body);
      });
  }

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    // console.log(view);
    if (view === "info") {
      setShowComponent(<></>);
    } else if (view === "users") {
      setShowComponent(<></>);
    } else if (view === "classes") {
      setShowComponent(<></>);
    } else if (view === "mailBox") {
      setShowComponent(<></>);
    } else if (view === "semesters") {
      setShowComponent(<></>);
    } else if (view === "groups") {
      setShowComponent(<></>);
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
        <Box
          sx={{
            width: "70%",
            ml: 3,
          }}
        >
          {showComponent}
        </Box>
      </Box>
    </>
  );
};

export default AdminProfile;
