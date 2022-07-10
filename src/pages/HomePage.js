import { Computer, DarkMode, LightMode, Schedule, ShoppingCart, WbTwilightSharp } from '@mui/icons-material';
import { AppBar, Button, Switch, Toolbar } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import getColor from '../functions/getColor';


const HomePage = (props) => {
  

  const [openedTab, setOpenedTab] = useState(1);

  const changeTheme = (mode) => {
    props.onThemeChange(mode);
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
        themeSelect={props.themeSelect}
        openedTab={openedTab}
        changeOpenedTab={(num) => changeOpenedTab(num)}
      />
      <Button
        onClick={() => changeTheme('cyber')}
        sx={{
          position: 'fixed',
          right: '30vw',
          top: '2.5vh',
          border: props.themeSelect === 'cyber' ? `1px solid ${getColor(props.themeSelect, 'border')}` : 'none',
          boxShadow: props.themeSelect === 'cyber' ? `3px 3px ${getColor(props.themeSelect, 'box_shadow')}` : 'none'
        }}
      >
        <Computer color='info'/>
      </Button>
      <Button
        onClick={() => changeTheme('synth')}
        sx={{
          position: 'fixed',
          right: '25vw',
          top: '2.5vh',
          border: props.themeSelect === 'synth' ? `1px solid ${getColor(props.themeSelect, 'border')}` : 'none',
          boxShadow: props.themeSelect === 'synth' ? `2px 2px ${getColor(props.themeSelect, 'box_shadow')}` : 'none'
        }}>
          <WbTwilightSharp color='info' />
        </Button>
      <Button
        onClick={() => changeTheme('day')}
        sx={{
          position: 'fixed',
          right: '20vw',
          top: '2.5vh',
          border: props.themeSelect === 'day' ? `1px solid ${getColor(props.themeSelect, 'border')}` : 'none',
          boxShadow: props.themeSelect === 'day' ? `2px 2px ${getColor(props.themeSelect, 'box_shadow')}` : 'none'
        }}
      >
        <LightMode color='info' />
      </Button>
      <Button
        onClick={() => changeTheme('night')}
        sx={{
          position: 'fixed',
          right: '15vw',
          top: '2.5vh',
          border: props.themeSelect === 'night' ? `1px solid ${getColor(props.themeSelect, 'border')}` : 'none',
          boxShadow: props.themeSelect === 'night' ? `2px 2px ${getColor(props.themeSelect, 'box_shadow')}` : 'none'
        }}
      >
        <DarkMode color='info' />
      </Button>
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
