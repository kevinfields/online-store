import { Avatar, Card, CardActionArea, CardContent, CardHeader, Chip } from '@mui/material'
import React from 'react'
import formatTime from '../functions/formatTime'

const OrderCard = (props) => {

  return (
    <Card 
      variant='outlined' 
      color='secondary' 
      sx={{
        width: '25vw',
        margin: '5vh',
        backgroundColor: props.cardColor,
        color: props.cardColor === 'white' ? '#002984' : 'yellow',
        boxShadow: `2px 2px ${props.cardColor === 'white' ? "#002984" : '#000091'}`
      }}
    >
      <CardActionArea href={`order/${props.id}`}>
        <Chip 
          avatar={<Avatar>{props.index + 1}</Avatar>} 
          color='success'
          sx={{
            float: 'right',
            marginRight: '1vh',
            marginTop: '1vh',
          }}/>
        <CardHeader title={`Order ID: ${props.order.id}`} />
        <CardContent children={`Total Cost: $${props.order.data().totalCost}`} />
        <CardContent children={`Number of Items: ${props.order.data().itemCount}`} />
        <CardContent children={`Order Status: ${props.order.data().orderStatus}`} />
        <CardContent children={`Ordered on ${formatTime(props.order.data().orderPlaced.seconds * 1000)}`} />
      </CardActionArea>
    </Card>
  )
}

export default OrderCard