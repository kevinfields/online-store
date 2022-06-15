import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import DepartmentPage from '../pages/DepartmentPage';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import MyCartPage from '../pages/MyCartPage';

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

  const [opened, setOpened] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, num) => {
    setOpened(num);
  };

  const loggedInTabArray = [ <Tab label='My Cart' {...a11yProps(3)} />, <Tab label='Log Out' {...a11yProps(4)} />,];

  return (
    <div>
      <Box>
        <Tabs value={opened} onChange={handleChange}>
          
          <Tab label='Clothing' {...a11yProps(0)} />
          <Tab label='Furniture' {...a11yProps(1)} />
          <Tab label='Electronics' {...a11yProps(2)} />
          { props.user === null ?
            <Tab label='Log In' {...a11yProps(3)} />
            :
            loggedInTabArray
          }
         
        </Tabs>
        {props.user !== null ?
        <>
        <TabPanel value={opened} index={0}>
          <DepartmentPage 
            productsRef={
              props.firestore.collection('departments')
              .doc('clothing')
              .collection('products')
            }
            cartRef={
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('cart')
            }
            department={'Clothing'}
          />
        </TabPanel>
        <TabPanel value={opened} index={1}>
          <DepartmentPage 
            productsRef={
              props.firestore.collection('departments')
              .doc('furniture')
              .collection('products')
            }
            cartRef={
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('cart')
            }
            department={'Furniture'}
          />
        </TabPanel>
        <TabPanel value={opened} index={2} href='electronics'>
          <DepartmentPage 
            productsRef={
              props.firestore.collection('departments')
              .doc('electronics')
              .collection('products')
            }
            cartRef={
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('cart')
            }
            department={'Electronics'}
          />
        </TabPanel>
        </>
        : null }
         <TabPanel value={opened} index={3}>
          { props.user !== null ?
            <MyCartPage cartRef={props.firestore.collection('users').doc(props.user.uid).collection('cart')} user={props.user}/>
          : null }
        </TabPanel>
        <TabPanel value={opened} index={4}>
          {props.user === null ?
            <Button href='login'>Log In</Button>
            :
            <Button href='logout'>Log Out</Button>
          }
        </TabPanel>
      </Box>
    </div>
  )
}

export default Navbar