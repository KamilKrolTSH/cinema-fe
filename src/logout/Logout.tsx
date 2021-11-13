import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Logout.css";

import {
  useAuthentication,
  useUpdateAuthentication,
} from "../providers/AuthenticateProvider";
import { Button } from "@mui/material";

export function Logout() {
  const history = useHistory();

  const authentication = useAuthentication();
  const updateAuthentication = useUpdateAuthentication();

  const [logoutButtonVisible, setLogoutButtonVisible] = useState(false);

  useEffect(() => {
    console.log(authentication);
    setLogoutButtonVisible(!!authentication);
  }, [authentication]);

  const onLogoutButtonClick = () => {
    updateAuthentication(undefined);
    history.push("/home");
  };

  return (
    <div className="Logout">
      {logoutButtonVisible ? (
        <Button onClick={onLogoutButtonClick} variant="contained">
          Logout
        </Button>
      ) : null}
    </div>
  );
}
