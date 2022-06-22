import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, black } from "@mui/material/colors";
import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import LogoutPage from "./pages/LogoutPage.js";
import CheckoutPage from "./pages/CheckoutPage.js";
import SingleOrderPage from "./pages/SingleOrderPage.js";

firebase.initializeApp({
  apiKey: "AIzaSyCV-bMBng0nyBqgo7V_dnKh832PQoSf9Gs",
  authDomain: "online-store-992a2.firebaseapp.com",
  projectId: "online-store-992a2",
  storageBucket: "online-store-992a2.appspot.com",
  messagingSenderId: "424236533894",
  appId: "1:424236533894:web:300368820c52ca183ce907",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const background = document.getElementsByTagName("html");
  const [user] = useAuthState(auth);
  const [allow, setAllow] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const loginUser = () => {
    setAllow(true);
    navigate("/");
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: !darkMode ? "#2196f3" : "#3f51b5",
      },
      secondary: {
        main: !darkMode ? "#ab47bc" : "#773183",
      },
      success: {
        main: !darkMode ? "#00e676" : "#4caf50",
      },
      error: {
        main: !darkMode ? "#f44336" : "#ff4569",
      },
    },
  });

  useEffect(() => {
    const tag = document.getElementsByTagName("html")[0];
    if (darkMode) {
      tag.style.backgroundColor = "#2c387e";
      tag.style.color = "yellow";
    } else {
      tag.style.backgroundColor = "#FFFFFF";
      tag.style.color = "black";
    }
  }, [darkMode]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <HomePage
                firestore={firestore}
                user={user ? user : null}
                auth={auth}
                loggedIn={user ? true : false}
                darkMode={darkMode}
                changeTheme={() => setDarkMode(!darkMode)}
              />
            }
          />
          {!user ? (
            <Route
              path="/login"
              element={
                <LoginPage
                  auth={auth}
                  usersRef={firestore.collection("users")}
                  onLogin={() => loginUser()}
                />
              }
            />
          ) : (
            <>
              <Route path="/logout" element={<LogoutPage auth={auth} />} />
              <Route
                path="/checkout"
                element={
                  <CheckoutPage
                    cartRef={firestore
                      .collection("users")
                      .doc(user.uid)
                      .collection("cart")}
                    ordersRef={firestore
                      .collection("users")
                      .doc(user.uid)
                      .collection("orders")}
                  />
                }
              />
              <Route
                path="/order/:id"
                element={
                  <SingleOrderPage
                    ordersRef={firestore
                      .collection("users")
                      .doc(user.uid)
                      .collection("orders")}
                  />
                }
              />
            </>
          )}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
