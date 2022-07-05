import { DarkMode, LightMode } from '@mui/icons-material';
import { AppBar, Button, Switch, Toolbar } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import StoreHeader from '../components/StoreHeader';




const HomePage = (props) => {
  

  const [checked, setChecked] = useState(props.checked);


  const changeTheme = () => {
    props.onThemeChange(!checked ? 0 : 1);
    setChecked(!checked);
  }


  return (
    <div>
      <Navbar firestore={props.firestore} user={props.user} auth={props.auth} loggedIn={props.loggedIn} cardColor={props.cardColor} />
      <Button
        onClick={() => changeTheme()}
        sx={{
          color: checked ? 'primary' : 'white',
          position: 'fixed',
          right: '5vw',
          top: '2.5vh',
        }}
      >
        {
          checked ?
            <DarkMode color='primary' />
          :
            <LightMode color='info' />
        }
      </Button>
    </div>
  );
};

export default HomePage;
