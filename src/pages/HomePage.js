import { DarkMode, LightMode, Schedule, ShoppingCart } from '@mui/icons-material';
import { AppBar, Button, Switch, Toolbar } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';


const HomePage = (props) => {
  

  const [openedTab, setOpenedTab] = useState(1);

  const changeTheme = (mode) => {
    props.onThemeChange(mode === 'light' ? 0 : 1);
  }

  const changeOpenedTab = (num) => {
    setOpenedTab(num)
  }

  return (
    <div>
      <Navbar 
        firestore={props.firestore} 
        user={props.user} 
        auth={props.auth} 
        loggedIn={props.loggedIn} 
        cardColor={props.cardColor} 
        openedTab={openedTab}
        changeOpenedTab={(num) => changeOpenedTab(num)}
      />
      {
        props.cardColor !== 'white' ?
      <Button
        onClick={() => changeTheme('light')}
        sx={{
          position: 'fixed',
          right: '15vw',
          top: '2.5vh',
        }}
      >
        <LightMode color='info' />
      </Button>
      :
      <Button
        onClick={() => changeTheme('dark')}
        sx={{
          position: 'fixed',
          right: '15vw',
          top: '2.5vh',
        }}
      >
        <DarkMode color='primary' />
      </Button>
      }
      { props.user ?
      <>
        <Button
          onClick={() => setOpenedTab(6)}
          sx={{
            position: 'fixed',
            right: '10vw',
            top: '2.5vh',
          }}
        >
          <ShoppingCart color='primary' />
        </Button>
        <Button
          onClick={() => setOpenedTab(7)}
          sx={{
            position: 'fixed',
            right: '5vw',
            top: '2.5vh',
          }}
        >
          <Schedule color='primary' />
        </Button>
      </>
      
       : null
      }
    </div>
  );
};

export default HomePage;
