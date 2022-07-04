import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Tab, Tabs, Typography, AppBar, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import DepartmentPage from '../pages/DepartmentPage';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import MyCartPage from '../pages/MyCartPage';
import MyOrdersPage from '../pages/MyOrdersPage';
import LoginScreen from './LoginScreen';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Navbar = (props) => {

  const sxDefault = {
    color: props.cardColor === 'white' ? 'black' : 'white',
  }

  const [opened, setOpened] = useState(1);
  const loggedInTabs = [
    <Tab label='Log Out' 
      sx={sxDefault}
      {...a11yProps(0)} 
    />,
    <Tab label='Clothing' 
      sx={sxDefault}
      {...a11yProps(1)} 
    />, 
    <Tab label='Furniture' sx={sxDefault} {...a11yProps(2)} />,
    <Tab label='Electronics' sx={sxDefault} {...a11yProps(3)} />,
    <Tab label='Applicances' sx={sxDefault} {...a11yProps(4)} />,
    <Tab label='Outdoors' sx={sxDefault} {...a11yProps(5)} />,
    <Tab label='My Cart' sx={sxDefault} {...a11yProps(6)} />,
    <Tab label='My Orders' sx={sxDefault} {...a11yProps(7)} />
  ];

  const loggedOutTabs = [
    <Tab label='Log In' sx={sxDefault} {...a11yProps(0)} />,
    <Tab label='Clothing' sx={sxDefault} {...a11yProps(1)} />, 
    <Tab label='Furniture' sx={sxDefault} {...a11yProps(2)} />,
    <Tab label='Electronics' sx={sxDefault} {...a11yProps(3)} />,
    <Tab label='Applicances' sx={sxDefault} {...a11yProps(4)} />,
    <Tab label='Outdoors' sx={sxDefault} {...a11yProps(5)} />
  ];

  const handleChange = (event, num) => {
    setOpened(num);
  };

  return (
    <div style={{
      position: 'fixed',
      left: '5vw',
    }}>
      <Box>
        <div>
          <h2>Kevin's General Store</h2>
        </div>
        <Tabs value={opened} onChange={handleChange}>
        {!props.loggedIn ?
          loggedOutTabs
          :
          loggedInTabs         
        }
        </Tabs>
        <TabPanel value={opened} index={0}>
          <LoginScreen inwards={!props.loggedIn} />
        </TabPanel>
        <TabPanel value={opened} index={1}>
          <DepartmentPage 
            productsRef={
              props.firestore.collection('departments')
              .doc('clothing')
              .collection('products')
            }
            cartRef={
              props.loggedIn ? 
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('cart')
              : null
            }
            loggedIn={props.loggedIn}
            department={'Clothing'}
            cardColor={props.cardColor}
          />
        </TabPanel>
        <TabPanel value={opened} index={2}>
          <DepartmentPage 
            productsRef={
              props.firestore.collection('departments')
              .doc('furniture')
              .collection('products')
            }
            cartRef={
              props.loggedIn ?
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('cart')
              : null
            }
            loggedIn={props.loggedIn}
            department={'Furniture'}
            cardColor={props.cardColor}
          />
        </TabPanel>
        <TabPanel value={opened} index={3}>
          <DepartmentPage 
            productsRef={
              props.firestore.collection('departments')
              .doc('electronics')
              .collection('products')
            }
            cartRef={
              props.loggedIn ?
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('cart')
              : null
            }
            loggedIn={props.loggedIn}
            department={'Electronics'}
            cardColor={props.cardColor}
          />
        </TabPanel>
        <TabPanel value={opened} index={4}>
          <DepartmentPage 
            productsRef={
              props.firestore.collection('departments')
              .doc('appliances')
              .collection('products')
            }
            cartRef={
              props.loggedIn ?
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('cart')
              : null
            }
            loggedIn={props.loggedIn}
            department={'Appliances'}
            cardColor={props.cardColor}
          />
        </TabPanel>
        <TabPanel value={opened} index={5}>
          <DepartmentPage 
            productsRef={
              props.firestore.collection('departments')
              .doc('outdoors')
              .collection('products')
            }
            cartRef={
              props.loggedIn ?
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('cart')
              : null
            }
            loggedIn={props.loggedIn}
            department={'Outdoors'}
            cardColor={props.cardColor}
          />
        </TabPanel>
        {props.loggedIn ?
        <>
        <TabPanel value={opened} index={6}>
          <MyCartPage 
            cartRef={
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('cart')
            } 
            user={props.user}
            cardColor={props.cardColor}
          />
        </TabPanel>
        <TabPanel value={opened} index={7}>
          <MyOrdersPage 
            ordersRef={
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('orders')
            } 
            user={props.user}
          />
        </TabPanel>
        </>
        : null }
      </Box>
    </div>
  )
}

export default Navbar