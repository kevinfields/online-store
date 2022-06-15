import { Card, CardContent, CardHeader } from '@mui/material'
import React from 'react'
import formatTime from '../functions/formatTime'

const OrderCard = (props) => {

  return (
    <Card variant='outlined' color='secondary' sx={{
      width: '25vw',
      margin: '5vh',
    }}>
      <CardHeader title={`Order Number: ${props.order.id}`} />
      <CardContent children={`Total Cost: $${props.order.data().totalCost}`} />
      <CardContent children={`Number of Items: ${props.order.data().items.length}`} />
      <CardContent children={`Order Status: ${props.order.data().orderStatus}`} />
      <CardContent children={`Ordered on ${formatTime(props.order.data().orderPlaced.seconds * 1000)}`} />
    </Card>
  )
}

export default OrderCard