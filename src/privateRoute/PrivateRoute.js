import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "../util/useLocalStorage";
import fetchApi from "../service/FetchService";
import { BASE_URL } from "../util/globalVars";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalStorage("", "jwt");
  const [valid, setValid] = useState(<></>);

  function checkValidation() {
    if (jwt) {
      fetchApi(BASE_URL + `/api/user/is-user`, "GET", jwt, null)
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
    checkValidation();
  }, []);

  return valid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
