
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Input, TextField, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import ProfileMessagesList from '../components/ProfileMessagesList';
import ProfileWatchlist from '../components/ProfileWatchlist';
import getColor from '../functions/getColor';
import goodPhotoURL from '../functions/goodPhotoURL';
import ORDER_CONFIRMATION from '../reducers/ORDER_CONFIRMATION';

const ProfilePage = (props) => {

  const textColor = getColor(props.themeSelect, 'text');
  const [userData, setUserData] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editingImage, setEditingImage] = useState(false);
  const [newImageURL, setNewImageURL] = useState('');
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allowOrder, setAllowOrder] = useState(false);

  useEffect(() => {
    loadUserData();
    console.log(props.user.photoURL)
  }, [])

  const loadUserData = async () => {


    let watchlistCatcher = [];
    let messagesCatcher = [];

    await props.userRef.collection('watchedItems').get().then(snap => {
      snap.forEach(doc => {
        watchlistCatcher.push({
          id: doc.id,
          data: doc.data(),
        });
      })
    }).then(() => {
      setWatchlist(watchlistCatcher);
    });

    await props.userRef.collection('messages').get().then(snap => {
      snap.forEach(doc => {
        messagesCatcher.push({
          id: doc.id,
          data: doc.data(),
        })
      })
    }).then(() => {
      setMessages(messagesCatcher);
    })


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
    setEditingImage(false);
    loadUserData();
  };

  useEffect(() => {
    if (imgError && newImageURL !== '') {
      setImgError(false);
    }
  }, [newImageURL]);

  const deleteMessage = (id) => {
    let messagesCatcher = [...messages];
    messagesCatcher = messages.filter(item => item.id !== id);
    setMessages(messagesCatcher);
  };

  const orderConfirmation = async (type) => {

    if (!allowOrder) {
      return;
    }

    setAllowOrder(false);

    await ORDER_CONFIRMATION(props.userRef, type).then(() => {
      loadUserData();
      setAllowOrder(true);
    });
  }

  return (
    <div className='page'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          width: '80vw',
          gap: '20vw',
          marginLeft: '5vw',
        }}
      >
        <h3
          style={{
            color: textColor,
          }}
        >
          My Watch List
        </h3>
        <h3
          style={{
            marginLeft: '5vw',
            color: textColor
          }}
        >
          My Profile
        </h3>
        <h3
          style={{
            color: textColor,
          }}
        >
          My Messages
        </h3>
      </div>
      { loading ? 
        <Loading />
        :
        <div
          style={{
            display: 'flex',
            width: '90vw',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            gap: '0px',
            padding: '0px',
            margin: '0px',
          }}
        >
          <ProfileWatchlist 
            watchlist={watchlist}
            themeSelect={props.themeSelect}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5vh',
              width: '20vw',
              height: '65vh',
              overflowY: 'scroll',
              marginLeft: '5vw',
            }}
            departmentsRef={props.departmentsRef}
            user={props.user}
            userRef={props.userRef}
            reloadWatchlist={() => loadUserData()}
          />
          <Card 
            variant='outlined' 
            color='secondary' 
            sx={{
              width: '30vw',
              height: 'fit-content',
              position: 'fixed',
              left: '29vw',
              top: '25vh',
              margin: '5vh',
              boxShadow: `1px 1px 3px 3px ${getColor(props.themeSelect, 'box_shadow')}`,
              display: 'flex',
              flexDirection: 'column',
            }}
            style={{
              backgroundColor: getColor(props.themeSelect, 'card_background'),
              color: getColor(props.themeSelect, 'text'),
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
              children={`Preferred Theme: ${props.themeSelect}`}
            />
            <CardContent
              children={`Reward Points: ${userData.rewardPoints}`}
            />
            <CardMedia
              component='img'
              alt={props.user.displayName}
              image={userData.photoURL ? userData.photoURL : props.user.photoURL}
              sx={{
                width: '10vw',
                height: '10vw',
                alignSelf: 'flex-end',
                marginRight: '2.5vw',
                marginTop: '-16vh',
                marginBottom: '2vh',
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
                      '& .MuiInput-underline:before': { borderBottomColor: getColor(props.themeSelect, 'border') },
                      '& .MuiInput-underline:after': { borderBottomColor: getColor(props.themeSelect, 'border') },
                      marginLeft: '3vw',
                    }}
                    placeholder={imgError ? 'Please use a valid photo URL.' : ''}
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
          <ProfileMessagesList
            messages={messages}
            themeSelect={props.themeSelect}
            userRef={props.userRef}
            user={props.user}
            delete={(id) => deleteMessage(id)}
            allowOrder={allowOrder}
            orderConfirmation={(type) => orderConfirmation(type)}
          />
        </div>
      }
    </div>
  )
}

export default ProfilePage