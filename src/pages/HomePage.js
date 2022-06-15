import { AppBar, Button, Toolbar } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import StoreHeader from '../components/StoreHeader';




const HomePage = (props) => {

  return (
    <div>
      <Navbar firestore={props.firestore} user={props.user} auth={props.auth} />
    </div>
  )
}

export default HomePage