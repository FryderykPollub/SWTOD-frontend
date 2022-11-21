import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../util/useLocalStorage";
import fetchApi from "../service/FetchService";
import { BASE_URL } from "../util/globalVars";
import AdminProfile from "../admin/AdminProfile";
import UserProfile from "../profile/UserProfile";

const ShowProfile = () => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [valid, setValid] = useState(<></>);

  function checkIfAdmin() {
    if (jwt) {
      fetchApi(BASE_URL + `/api/admin/is-admin`, "GET", jwt, null)
        .then((response) => {
          if (response.status === 200) setValid(true);
          else setValid(false);
        })
        .catch((e) => {
          setValid(false);
        });
    } else setValid(false);
  }

  useEffect(() => {
    checkIfAdmin();
  }, []);

  return valid ? <AdminProfile /> : <UserProfile />;
};

export default ShowProfile;
