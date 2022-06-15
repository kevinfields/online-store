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

  const [opened, setOpened] = useState(5);
  const loggedInTabs = [
    <Tab label='Log Out' {...a11yProps(0)} />,
    <Tab label='Clothing' {...a11yProps(1)} />, 
    <Tab label='Furniture' {...a11yProps(2)} />,
    <Tab label='Electronics' {...a11yProps(3)} />,
    <Tab label='Applicances' {...a11yProps(4)} />,
    <Tab label='My Cart' {...a11yProps(5)} />,
    <Tab label='My Orders' {...a11yProps(6)} />
  ]

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
        {props.user === null ?
          <Tab label='Log In' {...a11yProps(0)} />
          :
          loggedInTabs         
        }
        </Tabs>
        <TabPanel value={opened} index={0}>
          {props.user === null ?
            <div className='auth-button'> 
              <Button 
                variant='contained' 
                color='primary' 
                href='login'
              >
                Log In
              </Button>
            </div>
            :
            <div className='auth-button'> 
              <Button 
                variant='contained'
                color='error'
                href='logout'
              >
                Log Out
              </Button>
            </div>
          }
        </TabPanel>
        {props.user !== null ?
        <>
        <TabPanel value={opened} index={1}>
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
        <TabPanel value={opened} index={2}>
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
        <TabPanel value={opened} index={3}>
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
        <TabPanel value={opened} index={4}>
          <DepartmentPage 
            productsRef={
              props.firestore.collection('departments')
              .doc('appliances')
              .collection('products')
            }
            cartRef={
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('cart')
            }
            department={'Appliances'}
          />
        </TabPanel>
        <TabPanel value={opened} index={5}>
          <MyCartPage 
            cartRef={
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('cart')
            } 
            user={props.user}/>
        </TabPanel>
        <TabPanel value={opened} index={6}>
          <MyOrdersPage 
            ordersRef={
              props.firestore.collection('users')
              .doc(props.user.uid)
              .collection('orders')
            } 
            user={props.user}/>
        </TabPanel>
        </>
        : null }
      </Box>
    </div>
  )
}

export default Navbar