import { Button, CardActionArea, Typography } from '@material-ui/core';
import { Delete, KeyboardReturn } from '@mui/icons-material';
import { Card, CardContent, CardHeader, getFormControlLabelUtilityClasses } from '@mui/material';
import React, {useState} from 'react';
import formatTime from '../functions/formatTime';
import getColor from '../functions/getColor';
import getFont from '../functions/getFont';
import DELETE_MESSAGE from '../reducers/DELETE_MESSAGE';

const ProfileMessagesList = (props) => {

  const [deleting, setDeleting] = useState({
    open: false,
    id: '',
  });

  const [deleteError, setDeleteError] = useState(false);

  const textColor = getColor(props.themeSelect, 'text');
  const cardColor = getColor(props.themeSelect, 'card_background');
  const borderColor = getColor(props.themeSelect, 'border');

  const deleteMessage = async (mess) => {

    await DELETE_MESSAGE(mess.id, props.userRef).then(() => {
      props.delete(mess.id);
    })
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
          <CardContent
            sx={{
              fontSize: '9pt',
            }}
          > 
            - {formatTime(item.data.time.seconds * 1000, 'timestamp')}
          </CardContent>
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
              <button
                className={`styled-button-${props.themeSelect}`}
                style={{
                  width: '10vw',
                  marginLeft: '2.5vw',
                  marginBottom: '1vh',
                  fontFamily: getFont(props.themeSelect),
                  borderRadius: '7px',
                }} 
                onClick={() => deleteMessage(item)}
              >
                <Delete />
              </button>
              <button
                className={`styled-button-${props.themeSelect}`} 
                style={{
                  width: '10vw',
                  marginLeft: '2.5vw',
                  marginBottom: '1vh',
                  fontFamily: getFont(props.themeSelect),
                  borderRadius: '7px',
                }}
                onClick={() => setDeleting({
                  open: false,
                  id: '',
                })}
              >
                <KeyboardReturn />
              </button>
            </>
          :
            <>
              <button
                className={`styled-button-${props.themeSelect}`}
                style={{
                  width: '10vw',
                  marginLeft: '2.5vw',
                  marginBottom: '1vh',
                  fontFamily: getFont(props.themeSelect),
                  borderRadius: '7px',
                }}
                onClick={() => setDeleting({
                  open: true,
                  id: item.id,
                })}
              >
                Delete
              </button>
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
          style={{
            backgroundColor: cardColor,
            border: `1px solid ${borderColor}`,
            color: textColor,
          }}
        >
          <CardHeader title='No Unread Messages' />
          <CardContent>You have no unread messages.</CardContent>
          <button
            className={`styled-button-${props.themeSelect}`}
            style={{
              width: '10vw',
              marginLeft: '2.5vw',
              marginBottom: '1vh',
              fontFamily: getFont(props.themeSelect),
              borderRadius: '7px',
              backgroundColor: cardColor,
            }}
            onClick={() => props.orderConfirmation('standard')}
          >
            Get Confirmation Message
          </button>
          <button
            className={`styled-button-${props.themeSelect}`}
            style={{
              width: '10vw',
              marginLeft: '2.5vw',
              marginBottom: '1vh',
              fontFamily: getFont(props.themeSelect),
              borderRadius: '7px',
              backgroundColor: cardColor,
            }}
            onClick={() => props.orderConfirmation('random')}
          >
            Get Random Message
          </button>
        </Card>
      }
    </div>
  )
}

export default ProfileMessagesList