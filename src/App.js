import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
    typography: {
      fontFamily: 'Quicksand',
    },
    palette: {
      primary: {
        main: themeSelect === 0 ? "#002984" : '#4a51b5',
      },
      secondary: {
        main: themeSelect === 0 ? "#ab47bc" : '#ffaaff',
      },
      success: {
        main: themeSelect === 0 ? '#1b5e20' : '#4caf50',
      },
      error: {
        main: themeSelect === 0 ? '#8e0000' : '#ff6a51',
      },
      info: {
        main: themeSelect === 0 ? '#fbc02d' : '#fdd835',
      }
    },
  });

  useEffect(() => {

    if (themeSelect === 0) {
      background.style.backgroundColor = '#e0f7fa';
      background.style.color = 'black';
    } else {
      background.style.backgroundColor = '#07004f';
      background.style.color = 'white';
    }
  }, [themeSelect]);

  const checkUserTheme = async () => {

    const userRef = firestore.collection('users').doc(user.uid);

    let data;
    await userRef.get().then(doc => {
      data = doc.data();
    })
    if (data.theme === 'light') {
      setThemeSelect(0);
    } else {
      setThemeSelect(1);
    }
  };

  useEffect(() => {
    if (user) {
      checkUserTheme();
    }
  }, [user])

  const userThemeChanger = async (num) => {

    const userRef = firestore.collection('users').doc(user.uid);
    
    setThemeSelect(num);
    let data;
    await userRef.get().then(doc => {
      data = doc.data();
    })
    await userRef.set({
      ...data,
      theme: num === 1 ? 'dark' : 'light'
    })
  }

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
                onThemeChange={user ? (num) => userThemeChanger(num) : (num) => setThemeSelect(num)}
                checked={!user ? false : themeSelect === 0 ? false : true}
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
                    cardColor={themeSelect === 0 ? 'white' : '#2e1b5e'}
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
