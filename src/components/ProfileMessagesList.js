import { Button, CardActionArea, Typography } from '@material-ui/core';
import { Delete, KeyboardReturn } from '@mui/icons-material';
import { Card, CardContent, CardHeader } from '@mui/material';
import React, {useState} from 'react';
import getColor from '../functions/getColor';

const ProfileMessagesList = (props) => {

  const textColor = getColor(props.themeSelect, 'text');
  const cardColor = getColor(props.themeSelect, 'card_background');
  const borderColor = getColor(props.themeSelect, 'border');

  const primaryColor = getColor(props.themeSelect, 'primary');

  const [deleting, setDeleting] = useState({
    open: false,
    id: '',
  })

  const deleteMessage = async (mess) => {

    await props.userRef.collection('messages').doc(mess.id).delete();
    props.delete(mess.id);

  }

  return (
    <div
      style={{
        width: '15vw',
        height: '65vh',
        overflowY: 'scroll',
        position: 'fixed',
        left: '68.5vw',
        top: '30vh',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        border: `1px solid ${borderColor}`,
      }}
    >
      {props.messages.length > 0 ? props.messages.map(item => (
        <Card
          style={{
            color: textColor,
            border: `1px solid ${borderColor}`,
            borderRadius: '10px',
            backgroundColor: cardColor,
            flexShrink: 0,
          }}
          variant='contained'
        >
          <CardHeader title={item.data.title} />
          <CardContent>{item.data.text}</CardContent>
          { deleting.open && deleting.id === item.id ?
            <>
              <p
                style={{
                  marginLeft: '1vw',
                  color: textColor,
                }}
              >
                Are you sure?
              </p>
              <Button 
                onClick={() => deleteMessage(item)}
                color='secondary'
                variant='contained'
                style={{
                  margin: '0.5vw',
                }}
              >
                <Delete />
              </Button>
              <Button 
                onClick={() => setDeleting({
                  open: false,
                  id: '',
                })}
                color='primary'
                variant='contained'
                style={{
                  margin: '0.5vw',
                }}
              >
                <KeyboardReturn />
              </Button>
            </>
          :
            <>
              <Button
                endIcon={
                  <Delete 
                    color='error'
                  />
                }
                onClick={() => setDeleting({
                  open: true,
                  id: item.id,
                })}
                style={{
                  width: '50%',
                  left: '25%',
                  marginBottom: '0.5vh',
                }}
                color='secondary'
                variant='outlined'
              >
                Delete
              </Button>
            </>
          }
        </Card>
      ))
      :
        <Card
          variant='contained'
          sx={{
            color: textColor,
            borderColor: borderColor,
            backgroundColor: cardColor,
          }}
        >
          <CardHeader title='No Unread Messages' />
          <CardContent>You have no unread messages.</CardContent>
        </Card>
      }
    </div>
  )
}

export default ProfileMessagesList