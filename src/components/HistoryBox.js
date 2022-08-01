import { Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import fixCost from '../functions/fixCost';
import getColor from '../functions/getColor';

const HistoryBox = (props) => {

  return (
    <Card
      sx={{
        width: '50vw',
        position: 'fixed',
        left: '25vw',
        top: '30vh',
        height: '50vh',
        overflowY: 'scroll',
        backgroundColor: getColor(props.themeSelect, 'card_background'),
        border: `3px solid ${getColor(props.themeSelect, 'border')}`,
        boxShadow: `2px 2px 2px 2px ${getColor(props.themeSelect, 'box_shadow')}`,
      }}
    >
      <Button
        onClick={() => props.onClose()}
        variant='contained'
        // sx={{
        //   float: 'right',
        //   marginRight: '2vw',
        //   marginTop: '1vh',
        // }}
        sx={{
          position: 'fixed',
          left: '62.5vw',
          top: '32.5vh',
        }}
      >
        Go Back
      </Button>
      {props.history.map(item => (
        <CardContent
          sx={{
            border: `1px solid ${getColor(props.themeSelect, 'border')}`,
            backgroundColor: getColor(props.themeSelect, 'card_background'),
            borderRadius: '10px',
            boxShadow: getColor(props.themeSelect, 'box_shadow'),
            width: '50%',
            marginLeft: '10%',
            marginTop: '1vh',
            marginBottom: '1vh',
          }}
        >
          <Typography
            color={getColor(props.themeSelect, 'text')}
          >
            {item.product}  {"("}x{item.quantity}{")"}
          </Typography>
          <Typography
            color={getColor(props.themeSelect, 'text')}
          >
            $ {fixCost(item.price)}
          </Typography>
        </CardContent>
      ))}
    </Card>
  )
}

export default HistoryBox