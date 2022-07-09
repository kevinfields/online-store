import { Divider } from '@material-ui/core';
import { Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
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

  const pageRedirect = (num) => {
    props.openPage(num);
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
            width: '40vw',
            height: 'fit-content',
            position: 'fixed',
            left: '25vw',
            top: '25vh',
            margin: '5vh',
            backgroundColor: props.cardColor,
            color: props.cardColor === 'white' ? '#002984' : 'yellow',
            boxShadow: `2px 2px ${props.cardColor === 'white' ? "#002984" : '#000091'}`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardHeader 
            title={`Name: ${userData.name}`}
            sx={{
              textAlign: 'center'
            }}
          />
          <CardContent
            children={`Email: ${userData.email}`}
            sx={{
              textAlign: 'center',
            }}
          />
          <CardContent
            children={`Preferred Theme: ${props.cardColor === 'white' ? 'light' : 'dark'}`}
            sx={{
              textAlign: 'center',
            }}
          />
          <div
            style={{
              alignSelf: 'flex-end'
            }}
          >
            <CardActions>
              <Button
                size='small'
                variant='contained'
                onClick={() => pageRedirect(6)}
              >
                View My Cart
              </Button>
              <Button
                size='small'
                variant='contained'
                onClick={() => pageRedirect(7)}
              >
                View My Orders
              </Button>
            </CardActions>
          </div>
        </Card>
      }
    </div>
  )
}

export default ProfilePage