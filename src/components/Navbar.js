import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DepartmentPage from "../pages/DepartmentPage";
import MyCartPage from "../pages/MyCartPage";
import MyOrdersPage from "../pages/MyOrdersPage";
import LoginScreen from "./LoginScreen";
import NewProductPage from "../pages/NewProductPage";
import ProfilePage from "../pages/ProfilePage";
import getColor from "../functions/getColor";
import ChooseEditProductPage from "../pages/ChooseEditProductPage";
import { MODERATOR_LIST } from "../store/MODERATOR_LIST";
import ReportRestockPage from "../pages/ReportRestockPage";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Navbar = (props) => {
  const sxDefault = {
    color: getColor(props.themeSelect, "text"),
    padding: "0.5vw",
  };

  const [opened, setOpened] = useState(props.openedTab);

  useEffect(() => {
    setOpened(props.openedTab);
  }, [props.openedTab]);

  const moderatorTabs = [
    <Tab label="Log Out" sx={sxDefault} {...a11yProps(0)} />,
    <Tab label="Clothing" sx={sxDefault} {...a11yProps(1)} />,
    <Tab label="Furniture" sx={sxDefault} {...a11yProps(2)} />,
    <Tab label="Electronics" sx={sxDefault} {...a11yProps(3)} />,
    <Tab label="Appliances" sx={sxDefault} {...a11yProps(4)} />,
    <Tab label="Outdoors" sx={sxDefault} {...a11yProps(5)} />,
    <Tab label="My Cart" sx={sxDefault} {...a11yProps(6)} />,
    <Tab label="My Orders" sx={sxDefault} {...a11yProps(7)} />,
    <Tab label="My Profile" sx={sxDefault} {...a11yProps(8)} />,
    <Tab label="New Product" sx={sxDefault} {...a11yProps(9)} />,
    <Tab label="Edit Product" sx={sxDefault} {...a11yProps(10)} />,
    <Tab label="Report Restock" sx={sxDefault} {...a11yProps(11)} />,
  ];

  const loggedInTabs = [
    <Tab label="Log Out" sx={sxDefault} {...a11yProps(0)} />,
    <Tab label="Clothing" sx={sxDefault} {...a11yProps(1)} />,
    <Tab label="Furniture" sx={sxDefault} {...a11yProps(2)} />,
    <Tab label="Electronics" sx={sxDefault} {...a11yProps(3)} />,
    <Tab label="Appliances" sx={sxDefault} {...a11yProps(4)} />,
    <Tab label="Outdoors" sx={sxDefault} {...a11yProps(5)} />,
    <Tab label="My Cart" sx={sxDefault} {...a11yProps(6)} />,
    <Tab label="My Orders" sx={sxDefault} {...a11yProps(7)} />,
    <Tab label="My Profile" sx={sxDefault} {...a11yProps(8)} />,
  ];

  const loggedOutTabs = [
    <Tab label="Log In" sx={sxDefault} {...a11yProps(0)} />,
    <Tab label="Clothing" sx={sxDefault} {...a11yProps(1)} />,
    <Tab label="Furniture" sx={sxDefault} {...a11yProps(2)} />,
    <Tab label="Electronics" sx={sxDefault} {...a11yProps(3)} />,
    <Tab label="Appliances" sx={sxDefault} {...a11yProps(4)} />,
    <Tab label="Outdoors" sx={sxDefault} {...a11yProps(5)} />,
  ];

  const handleChange = (event, num) => {
    setOpened(Number(num));

    if (props.openedTab !== num) {
      props.changeOpenedTab(num);
    }
  };

  const switchTab = (department) => {
    let departmentsArray = [
      "clothing",
      "furniture",
      "electronics",
      "appliances",
      "outdoors",
    ];
    setOpened(departmentsArray.indexOf(department) + 1);
  };

  return (
    <div
      style={{
        position: "fixed",
        left: "5vw",
      }}
    >
      <Box>
        <div>
          <h2
            style={{
              color: getColor(props.themeSelect, "text"),
            }}
          >
            Kevin's General Store
          </h2>
        </div>
        <Tabs
          value={opened}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          sx={{
            marginTop: "-1vh",
          }}
        >
          {!props.loggedIn
            ? loggedOutTabs
            : props.loggedIn && !MODERATOR_LIST.includes(props.user.uid)
            ? loggedInTabs
            : moderatorTabs}
        </Tabs>
        <TabPanel value={opened} index={0}>
          <LoginScreen inwards={!props.loggedIn} />
        </TabPanel>
        <TabPanel value={opened} index={1}>
          <DepartmentPage
            productsRef={props.firestore
              .collection("departments")
              .doc("clothing")
              .collection("products")}
            cartRef={
              props.loggedIn
                ? props.firestore
                    .collection("users")
                    .doc(props.user.uid)
                    .collection("cart")
                : null
            }
            outOfStockRef={props.firestore.collection("out_of_stock")}
            loggedIn={props.loggedIn}
            department={"Clothing"}
            cardColor={props.cardColor}
            themeSelect={props.themeSelect}
            userId={props.loggedIn ? props.user.uid : ""}
            userRef={
              props.loggedIn
                ? props.firestore.collection("users").doc(props.user.uid)
                : null
            }
          />
        </TabPanel>
        <TabPanel value={opened} index={2}>
          <DepartmentPage
            productsRef={props.firestore
              .collection("departments")
              .doc("furniture")
              .collection("products")}
            cartRef={
              props.loggedIn
                ? props.firestore
                    .collection("users")
                    .doc(props.user.uid)
                    .collection("cart")
                : null
            }
            loggedIn={props.loggedIn}
            department={"Furniture"}
            outOfStockRef={props.firestore.collection("out_of_stock")}
            cardColor={props.cardColor}
            themeSelect={props.themeSelect}
            userId={props.loggedIn ? props.user.uid : ""}
            userRef={
              props.loggedIn
                ? props.firestore.collection("users").doc(props.user.uid)
                : null
            }
          />
        </TabPanel>
        <TabPanel value={opened} index={3}>
          <DepartmentPage
            productsRef={props.firestore
              .collection("departments")
              .doc("electronics")
              .collection("products")}
            cartRef={
              props.loggedIn
                ? props.firestore
                    .collection("users")
                    .doc(props.user.uid)
                    .collection("cart")
                : null
            }
            loggedIn={props.loggedIn}
            department={"Electronics"}
            outOfStockRef={props.firestore.collection("out_of_stock")}
            cardColor={props.cardColor}
            themeSelect={props.themeSelect}
            userId={props.loggedIn ? props.user.uid : ""}
            userRef={
              props.loggedIn
                ? props.firestore.collection("users").doc(props.user.uid)
                : null
            }
          />
        </TabPanel>
        <TabPanel value={opened} index={4}>
          <DepartmentPage
            productsRef={props.firestore
              .collection("departments")
              .doc("appliances")
              .collection("products")}
            cartRef={
              props.loggedIn
                ? props.firestore
                    .collection("users")
                    .doc(props.user.uid)
                    .collection("cart")
                : null
            }
            loggedIn={props.loggedIn}
            department={"Appliances"}
            outOfStockRef={props.firestore.collection("out_of_stock")}
            cardColor={props.cardColor}
            themeSelect={props.themeSelect}
            userId={props.loggedIn ? props.user.uid : ""}
            userRef={
              props.loggedIn
                ? props.firestore.collection("users").doc(props.user.uid)
                : null
            }
          />
        </TabPanel>
        <TabPanel value={opened} index={5}>
          <DepartmentPage
            productsRef={props.firestore
              .collection("departments")
              .doc("outdoors")
              .collection("products")}
            cartRef={
              props.loggedIn
                ? props.firestore
                    .collection("users")
                    .doc(props.user.uid)
                    .collection("cart")
                : null
            }
            loggedIn={props.loggedIn}
            department={"Outdoors"}
            outOfStockRef={props.firestore.collection("out_of_stock")}
            cardColor={props.cardColor}
            themeSelect={props.themeSelect}
            userId={props.loggedIn ? props.user.uid : ""}
            userRef={
              props.loggedIn
                ? props.firestore.collection("users").doc(props.user.uid)
                : null
            }
          />
        </TabPanel>
        {props.loggedIn ? (
          <>
            <TabPanel value={opened} index={6}>
              <MyCartPage
                cartRef={props.firestore
                  .collection("users")
                  .doc(props.user.uid)
                  .collection("cart")}
                departmentsRef={props.firestore.collection("departments")}
                user={props.user}
                cardColor={props.cardColor}
                outOfStockRef={props.firestore.collection("out_of_stock")}
                themeSelect={props.themeSelect}
                userRef={
                  props.loggedIn
                    ? props.firestore.collection("users").doc(props.user.uid)
                    : null
                }
              />
            </TabPanel>
            <TabPanel value={opened} index={7}>
              <MyOrdersPage
                ordersRef={props.firestore
                  .collection("users")
                  .doc(props.user.uid)
                  .collection("orders")}
                user={props.user}
                cardColor={props.cardColor}
                outOfStockRef={props.firestore.collection("out_of_stock")}
                themeSelect={props.themeSelect}
                userRef={
                  props.loggedIn
                    ? props.firestore.collection("users").doc(props.user.uid)
                    : null
                }
              />
            </TabPanel>
            <TabPanel value={opened} index={8}>
              <ProfilePage
                user={props.user}
                cardColor={props.cardColor}
                userRef={
                  props.loggedIn
                    ? props.firestore.collection("users").doc(props.user.uid)
                    : null
                }
                openPage={(num, e) => handleChange(e, num)}
                themeSelect={props.themeSelect}
                departmentsRef={props.firestore.collection("departments")}
              />
            </TabPanel>
            <TabPanel value={opened} index={9}>
              <NewProductPage
                user={props.user}
                cardColor={props.cardColor}
                productsRef={props.firestore.collection("departments")}
                switchTab={(department) => switchTab(department)}
                themeSelect={props.themeSelect}
                outOfStockRef={props.firestore.collection("out_of_stock")}
                userRef={
                  props.loggedIn
                    ? props.firestore.collection("users").doc(props.user.uid)
                    : null
                }
              />
            </TabPanel>
            <TabPanel value={opened} index={10}>
              <ChooseEditProductPage
                user={props.user}
                themeSelect={props.themeSelect}
                outOfStockRef={props.firestore.collection("out_of_stock")}
                departmentsRef={props.firestore.collection("departments")}
                userRef={
                  props.loggedIn
                    ? props.firestore.collection("users").doc(props.user.uid)
                    : null
                }
              />
            </TabPanel>
            <TabPanel value={opened} index={11}>
              <ReportRestockPage
                user={props.user}
                themeSelect={props.themeSelect}
                departmentsRef={props.firestore.collection("departments")}
                usersRef={props.firestore.collection("users")}
                firestore={props.firestore}
                outOfStockRef={props.firestore.collection("out_of_stock")}
                openPage={(num, e) => handleChange(e, num)}
              />
            </TabPanel>
          </>
        ) : null}
      </Box>
    </div>
  );
};

export default Navbar;
