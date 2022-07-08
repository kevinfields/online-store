import { Card } from '@mui/material';
import React, {useState, useEffect} from 'react';

const ProfilePage = (props) => {

  const textColor = props.cardColor === 'white' ? '#002984' : 'yellow';
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, [])

  const loadUserData = async () => {
    await props.userRef.get().then(doc => {
      setUserData(doc.data());
    }).then(() => {
      setLoading(false);
    })
  }

  const ordersRedirect = (num) => {
    props.openOrders(num);
  }

  return (
    <div className='page'>
      <h1
        style={{
          textAlign: 'center',
          color: textColor
        }}
      >
        My Profile
      </h1>
      { loading ? 
        <div>Loading ...</div>
        :
        <Card 
          raised={true} 
          variant='outlined' 
          color='secondary' 
          sx={{
            width: '50vw',
            height: '50vh',
            position: 'fixed',
            left: '25vw',
            top: '25vh',
            margin: '5vh',
            backgroundColor: props.cardColor,
            color: props.cardColor === 'white' ? '#002984' : 'yellow',
            boxShadow: `2px 2px ${props.cardColor === 'white' ? "#002984" : '#000091'}`,
          }}
        >
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Theme: {props.cardColor === 'white' ? 'light' : 'dark'}</p>
          <div onClick={() => ordersRedirect(6)}>View My Cart</div>
          <div onClick={() => ordersRedirect(7)}>View My Orders</div>
        </Card>
      }
    </div>
  )
}

export default ProfilePage