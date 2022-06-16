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
      }}
    >
      <CardActionArea>
        <Chip 
          avatar={<Avatar>{props.index + 1}</Avatar>} 
          color='info'
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