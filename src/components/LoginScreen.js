import { Button, Card, CardHeader, CardMedia } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react'

const LoginScreen = (props) => {
  return (
    <Card 
      raised={true}
      sx={{
        width: '30vw',
        height: '30vw',
        position: 'fixed',
        left: '35vw',
      }}
    >
      <CardHeader 
        title={props.inwards ? 'Log In with a Google Account' : 'Log Out'}
        sx={{
          textAlign: 'center',
        }}
      />
      <CardMedia 
        children={
          <img
            src={'https://previews.123rf.com/images/rawpixel/rawpixel1510/rawpixel151014656/46685317-ad-advertisement-marketing-commercial-concept.jpg'}
            alt='ADVERTISEMENT HERE'
            style={{
              width: '25vw',
              height: '20vw',
              marginLeft: '2.5vw',
            }}
          />
        }
      />
      <Button
        variant='contained'
        color={props.inwards ? 'primary' : 'error'}
        endIcon={!props.inwards ? <LogoutIcon /> : null}
        startIcon={props.inwards ? <LoginIcon /> : null}
        href={props.inwards ? 'login' : 'logout'}
        sx={{
          width: '10vw',
          marginLeft: '10vw',
          marginTop: '2vh',
          marginBottom: '2vh',
        }}
      >
        LOG {props.inwards ? 'IN' : 'OUT'}
      </Button>
    </Card>

  )
}

export default LoginScreen;