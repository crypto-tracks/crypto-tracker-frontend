import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

import "./Button.css";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button
      cy-data="logout-button"
      variant="outline-primary"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
