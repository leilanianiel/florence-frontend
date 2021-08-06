import { Button } from "@material-ui/core";
import React from "react";
import "./LogIn.css";
const api = process.env.REACT_APP_API_ENDPOINT || window.location.origin;

function LogIn() {
  return (
    <div className="LogIn">
      <Button className="btn" variant="contained" color="primary" href={`${api}/login`}>
        Login
      </Button>
      <Button className="btn" variant="contained" color="secondary" href={`${api}/register`}>
        Register
      </Button>
    </div>
  );
}

export default LogIn;
