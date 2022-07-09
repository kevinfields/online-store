
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Input, TextField, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import goodPhotoURL from '../functions/goodPhotoURL';

const ProfilePage = (props) => {

  const textColor = props.cardColor === 'white' ? '#002984' : 'yellow';
  const [userData, setUserData] = useState({});
  const [editingImage, setEditingImage] = useState(false);
  const [newImageURL, setNewImageURL] = useState('');
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
    console.log(props.user.photoURL)
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

  const changeImage = async () => {

    if (!goodPhotoURL(newImageURL)) {
      setNewImageURL('');
      setImgError(true);
      return;
    }

    let data;
    await props.userRef.get().then(doc => {
      data = doc.data();
    })

    await props.userRef.set({
      ...data,
      photoURL: newImageURL,
    });

    setLoading(true);
    loadUserData();
  }

  useEffect(() => {
    if (imgError && newImageURL !== '') {
      setImgError(false);
    }
  }, [newImageURL]);

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
            width: '35vw',
            height: 'fit-content',
            position: 'fixed',
            left: '32.5vw',
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
          />
          <CardContent
            children={`Preferred Theme: ${props.cardColor === 'white' ? 'light' : 'dark'}`}
          />
          <CardMedia
            component='img'
            alt={props.user.displayName}
            image={userData.photoURL ? userData.photoURL : props.user.photoURL}
            sx={{
              width: '10vw',
              height: '10vw',
              alignSelf: 'flex-end',
              marginRight: '5vw',
              marginTop: '-10vh',
            }}
          />
          {editingImage ?
            <div style={{display: 'flex', flexDirection: 'column'}}>
            <CardContent
              children={
              <>
                <Typography>
                  New Image URL: 
                </Typography>
                <TextField
                  type='string'
                  value={newImageURL}
                  variant='standard'
                  onChange={(e) => setNewImageURL(e.target.value)}
                  sx={{
                    height: '4vh',
                    width: '20vw',
                    input: {
                      color: textColor,
                    },
                    marginLeft: '3vw',
                  }}
                  placeholder={imgError ? 'Please use a valid photoURL.' : ''}
                />
              </>
              }
            />
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <Button
                  size='small'
                  variant='outlined'
                  onClick={() => changeImage()}
                  sx={{
                    width: '7vw',
                    marginLeft: '2vw',
                  }}
                >
                  Submit
                </Button>
                <Button
                  size='small'
                  variant='outlined'
                  color='error'
                  onClick={() => setEditingImage(false)}
                  sx={{
                    width: '7vw',
                    marginLeft: '2vw',
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
            : null
          }
          
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
            <Button
              size='small'
              variant='outlined'
              onClick={() => setEditingImage(!editingImage)}
            >
              Change Profile Picture
            </Button>
          </CardActions>
        </Card>
      }
    </div>
  )
}

export default ProfilePage