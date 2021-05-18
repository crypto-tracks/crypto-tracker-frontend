import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

import "./Button.css";

// this file came from Auth0 quickstart guide
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      cy-data="login-button"
      variant="outline-primary"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};

export default LoginButton;
