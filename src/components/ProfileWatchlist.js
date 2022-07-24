import { Card } from '@material-ui/core';
import { Delete, KeyboardReturn } from '@mui/icons-material';
import { Button, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import React, {useState} from 'react'
import getColor from '../functions/getColor'

const ProfileWatchlist = (props) => {

  const [removing, setRemoving] = useState({
    open: false,
    productId: '',
  });

  const removeItem = async (itemObj) => {

    const productPath = props.departmentsRef.doc(itemObj.data.department).collection('products').doc(itemObj.id);

    let objectRef;

    await productPath.get().then(doc => {
      objectRef = doc.data();
    });

    let watchlistCatcher = objectRef.alertList ? objectRef.alertList : [];

    watchlistCatcher = watchlistCatcher.filter(user => user !== props.user.uid);

    await productPath.set({
      ...objectRef,
      alertList: watchlistCatcher,
    });

    await props.userRef.collection('watchedItems').doc(itemObj.id).delete();
    props.reloadWatchlist();
  }

  return (
    <div style={props.sx}>  
      {props.watchlist.map(item => (
        <Card
          style={{
            backgroundColor: getColor(props.themeSelect, 'card_background'),
            color: getColor(props.themeSelect, 'text'),
            marginRight: '1vw',
            flexShrink: 0,
          }}
        >
          <CardHeader title={item.data.title} />
          <CardMedia 
            component='img'
            src={item.data.photoURL}
            alt={item.id}
            sx={{
              maxWidth: '10vh',
              maxHeight: '10vh',
              marginLeft: '2.5vh',
            }}
          />
          <CardContent>{item.data.description}</CardContent>
          { removing.open && removing.productId === item.id ?
            <>
              <Typography 
                variant='h6'
                sx={{
                  textAlign: 'center',
                }}
              >
                Are you sure?
              </Typography>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: '1vh',
                }}
              >
                <Button
                  onClick={() => removeItem(item)}
                  variant='contained'
                  color={'primary'}
                  endIcon={<Delete />}
                >
                  YES
                </Button>
                <Button
                  onClick={() => setRemoving(false)}
                  variant='contained'
                  color={'error'}
                  endIcon={<KeyboardReturn />}
                >
                  NO
                </Button>
              </div> 
            </>
            :
            <Button
              onClick={() => setRemoving({
                open: true,
                productId: item.id,
              })}
              variant='outlined'
              style={{
                width: '50%',
                left: '25%',
                marginBottom: '0.5vh',
              }}
              color='secondary'
              endIcon={
                <Delete 
                  color='error'
                />
              }
            >
              Remove
            </Button> 
          }
        </Card>
      ))}
    </div>
  )
}

export default ProfileWatchlist