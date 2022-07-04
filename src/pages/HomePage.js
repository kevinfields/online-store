import { DarkMode, LightMode } from '@mui/icons-material';
import { AppBar, Button, Switch, Toolbar } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import StoreHeader from '../components/StoreHeader';




const HomePage = (props) => {
  
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    props.onThemeChange(checked ? 0 : 1);
  }, [checked])

  return (
    <div>
      <Navbar firestore={props.firestore} user={props.user} auth={props.auth} loggedIn={props.loggedIn} cardColor={props.cardColor} />
      <Button
        onClick={() => setChecked(!checked)}
        sx={{
          color: checked ? 'primary' : 'white',
          position: 'fixed',
          right: '5vw',
          top: '2.5vh',
        }}
      >
        {
          checked ?
            <DarkMode />
          :
            <LightMode />
        }
      </Button>
    </div>
  );
};

export default HomePage;
