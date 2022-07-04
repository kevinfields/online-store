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
  const background = document.getElementsByTagName("html")[0];
  const [user] = useAuthState(auth);
  const [themeSelect, setThemeSelect] = useState(0);
  const navigate = useNavigate();

  const loginUser = () => {
    navigate("/");
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: themeSelect === 0 ? "#002984" : '#4a51b5',
      },
      secondary: {
        main: themeSelect === 0 ? "#ab47bc" : '#ffaaff',
      },
      success: {
        main: themeSelect === 0 ? '#1b5e20' : '#6cff53',
      },
      error: {
        main: themeSelect === 0 ? '#8e0000' : '#ff6a51',
      }
    },
  });

  useEffect(() => {

    if (themeSelect === 0) {
      background.style.backgroundColor = '#edefc4';
      background.style.color = 'black';
    } else {
      background.style.backgroundColor = '#07004f';
      background.style.color = 'white';
    }
  }, [themeSelect])

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
                onThemeChange={(num) => setThemeSelect(num)}
                cardColor={themeSelect === 0 ? 'white' : '#2e1b5e'}
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
                      .collection('orders')
                    }
                    cardColor={themeSelect === 0 ? 'white' : '#2e1b5e'}
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
