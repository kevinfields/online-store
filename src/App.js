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
import getColor from "./functions/getColor.js";
import getFont from "./functions/getFont.js";
import ProductEditorPage from "./pages/ProductEditorPage.js";
import { MODERATOR_LIST } from "./store/MODERATOR_LIST.js";
import SearchPage from "./pages/SearchPage.js";

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
  const [themeSelect, setThemeSelect] = useState('day');
  const [textSize, setTextSize] = useState(14);
  const [tab, setTab] = useState(1);
  
  const navigate = useNavigate();

  const loginUser = () => {
    navigate("/");
  };

  const theme = createTheme({
    typography: {
      fontFamily: getFont(themeSelect),
      fontSize: `${textSize}pt`,
    },
    palette: {
      primary: {
        main: getColor(themeSelect, 'primary'),
      },
      secondary: {
        main: getColor(themeSelect, 'secondary'),
      },
      success: {
        main: getColor(themeSelect, 'success'),
      },
      error: {
        main: getColor(themeSelect, 'error'),
      },
      info: {
        main: getColor(themeSelect, 'info'),
      }
    },
  });

  useEffect(() => {

    background.style.backgroundColor = getColor(themeSelect, 'full_background');
    background.style.color = getColor(themeSelect, 'text');

  }, [themeSelect]);

  const checkUserTheme = async () => {

    const userRef = firestore.collection('users').doc(user.uid);

    let data;
    await userRef.get().then(doc => {
      data = doc.data();
    })
    setThemeSelect(data.theme)
  };

  useEffect(() => {
    if (user) {
      checkUserTheme();
    }
  }, [user])

  const userThemeChanger = async (theme) => {

    const userRef = firestore.collection('users').doc(user.uid);
    
    setThemeSelect(theme);
    let data;
    await userRef.get().then(doc => {
      data = doc.data();
    })
    await userRef.set({
      ...data,
      theme: theme
    })
  };

  const adjustTextSize = (dir) => {

    if (dir) {
      if (textSize <= 17) {
        setTextSize(textSize + 1);
      }
    } else {
      if (textSize >= 6) {
        setTextSize(textSize - 1);
      }
    }
  };

  const adjustTextSpacing = (dir) => {
    console.log('do this later.');
  }



  return (
    <div className="App" style={{fontSize: `${textSize}pt`}}>
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
                onThemeChange={user ? (theme) => userThemeChanger(theme) : (theme) => setThemeSelect(theme)}
                theme={themeSelect}
                cardColor={getColor(themeSelect, 'card_background')}
                themeSelect={themeSelect}
                openedTab={tab}
                setLoginTab={() => setTab(0)}
                outOfStockRef={firestore.collection('out_of_stock')}
                adjustTextSize={(dir) => adjustTextSize(dir)}
                adjustTextSpacing={(dir) => adjustTextSpacing(dir)}
                textSize={textSize}
              />
            }
          />
          {!user ? (
            <>
            <Route
              path="/login"
              element={
                <LoginPage
                  auth={auth}
                  usersRef={firestore.collection("users")}
                  onLogin={() => loginUser()}
                  cardColor={getColor(themeSelect, 'card_background')}
                  themeSelect={themeSelect}
                  textSize={textSize}
                />
              }
            />
            <Route
              path='/search/:id'
              element={
                <SearchPage 
                  departmentsRef={firestore.collection('departments')}
                  themeSelect={themeSelect}
                  viewInStore={(dep) => setTab(dep)}
                  outOfStockRef={firestore.collection('out_of_stock')}
                  textSize={textSize}
                />
              }
            />
            </>
          ) : (
            <>
              <Route 
                path="/logout" 
                element={
                  <LogoutPage 
                    auth={auth} 
                    textSize={textSize}
                  />
                } 
              />
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
                    departmentsRef={firestore.collection('departments')}
                    outOfStockRef={firestore.collection('out_of_stock')}
                    userRef={firestore.collection('users').doc(user.uid)}
                    cardColor={getColor(themeSelect, 'card_background')}
                    themeSelect={themeSelect}
                    textSize={textSize}
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
                    cardColor={getColor(themeSelect, 'card_background')}
                    themeSelect={themeSelect}
                    returnToOrders={() => setTab(7)}
                    textSize={textSize}
                  />
                }
              />
              <Route
                path='/search/:id'
                element={
                  <SearchPage 
                    departmentsRef={firestore.collection('departments')}
                    userRef={firestore.collection('users').doc(user.uid)}
                    themeSelect={themeSelect}
                    viewInStore={(dep) => setTab(dep)}
                    outOfStockRef={firestore.collection('out_of_stock')}
                    textSize={textSize}
                  />
                }
              />
              { user && MODERATOR_LIST.includes(user.uid) ?
              <>
              <Route
                path='/appliances/:id'
                element={
                  <ProductEditorPage
                    productsRef={firestore.collection('departments').doc('appliances').collection('products')}
                    themeSelect={themeSelect}
                    openDepartmentPage={() => setTab(4)}
                    openSelector={() => setTab(10)}
                    outOfStockRef={firestore.collection('out_of_stock')}
                    textSize={textSize}
                  />
                }
              />
              <Route
                path='/clothing/:id'
                element={
                  <ProductEditorPage
                    productsRef={firestore.collection('departments').doc('clothing').collection('products')}
                    themeSelect={themeSelect}
                    openDepartmentPage={() => setTab(1)}
                    openSelector={() => setTab(10)}
                    outOfStockRef={firestore.collection('out_of_stock')}
                    textSize={textSize}
                  />
                }
              />
              <Route
                path='/electronics/:id'
                element={
                  <ProductEditorPage
                    productsRef={firestore.collection('departments').doc('electronics').collection('products')}
                    themeSelect={themeSelect}
                    openDepartmentPage={() => setTab(3)}
                    openSelector={() => setTab(10)}
                    outOfStockRef={firestore.collection('out_of_stock')}
                    textSize={textSize}
                  />
                }
              />
              <Route
                path='/furniture/:id'
                element={
                  <ProductEditorPage
                    productsRef={firestore.collection('departments').doc('furniture').collection('products')}
                    themeSelect={themeSelect}
                    openDepartmentPage={() => setTab(2)}
                    openSelector={() => setTab(10)}
                    outOfStockRef={firestore.collection('out_of_stock')}
                    textSize={textSize}
                  />
                }
              />
              <Route
                path='/outdoors/:id'
                element={
                  <ProductEditorPage
                    productsRef={firestore.collection('departments').doc('outdoors').collection('products')}
                    themeSelect={themeSelect}
                    openDepartmentPage={() => setTab(5)}
                    openSelector={() => setTab(10)}
                    outOfStockRef={firestore.collection('out_of_stock')}
                    textSize={textSize}
                  />
                }
              />
              <Route
                path='/search/:id'
                element={
                  <SearchPage 
                    departmentsRef={firestore.collection('departments')}
                    userRef={user ? firestore.collection('users').doc(user.uid) : null}
                    themeSelect={themeSelect}
                    viewInStore={(dep) => setTab(dep)}
                    outOfStockRef={firestore.collection('out_of_stock')}
                    textSize={textSize}
                  />
                }
              />
            </>
            : null }
            </>
          )}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
