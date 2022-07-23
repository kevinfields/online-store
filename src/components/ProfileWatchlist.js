import { Card } from '@material-ui/core';
import { Delete } from '@mui/icons-material';
import { Button, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import React, {useState} from 'react'
import getColor from '../functions/getColor'

const ProfileWatchlist = (props) => {

  const [removing, setRemoving] = useState(false);

  const removeItem = async (itemObj) => {

    const productPath = props.departmentsRef.doc(itemObj.data.department).collection('products').doc(itemObj.id);

    let objectRef;

    await productPath.get().then(doc => {
      objectRef = doc.data();
    });

    let watchlistCatcher = objectRef.watchlist ? objectRef.watchlist : [];

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
          <CardActionArea>
            { !removing ?
              <Button
                onClick={() => setRemoving(true)}
                variant='outlined'
                endIcon={<Delete />}
              >
                Remove from Watch List
              </Button>
              :
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Button
                  onClick={() => removeItem(item)}
                  variant='contained'
                  endIcon={<Delete />}
                >
                  YES
                </Button>
                <Button
                  onClick={() => setRemoving(false)}
                  variant='contained'
                  endIcon={<Delete />}
                >
                  NO
                </Button>
              </div>
            }
          </CardActionArea>
        </Card>
      ))}
    </div>
  )
}

export default ProfileWatchlist