import { Button } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';




const HomePage = (props) => {

  return (
    <div>
      <Navbar firestore={props.firestore} user={props.user} auth={props.auth}/>
    </div>
  )
}

export default HomePage