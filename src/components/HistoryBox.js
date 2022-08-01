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
        top: '40vh',
        height: '50vh',
        overflowY: 'scroll',
      }}
    >
      <Button
        onClick={() => props.onClose()}
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
          }}
        >
          <Typography
            color={getColor(props.themeSelect, 'text')}
          >
            {item.product}
          </Typography>
          <Typography
            color={getColor(props.themeSelect, 'text')}
          >
            {item.quantity}
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