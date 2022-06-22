import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, Button, Toolbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import StoreHeader from "../components/StoreHeader";

const HomePage = (props) => {
  return (
    <div>
      <Navbar
        firestore={props.firestore}
        user={props.user}
        auth={props.auth}
        loggedIn={props.loggedIn}
      />
      {props.darkMode ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.changeTheme()}
          className="theme-button"
        >
          <LightMode />
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.changeTheme()}
          className="theme-button"
        >
          <DarkMode />
        </Button>
      )}
    </div>
  );
};

export default HomePage;
