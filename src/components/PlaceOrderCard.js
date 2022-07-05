import { Button, Card } from '@mui/material'
import React from 'react'

const PlaceOrderCard = (props) => {

  return (
    <Card variant='outlined' color='secondary' sx={{
      width: '25vw',
      margin: '5vh',
      backgroundColor: props.cardColor,
      color: props.cardColor === 'white' ? 'black' : 'yellow',
    }}>
      <div className='total-price'>
        Total: ${props.cost}
      </div>
      <Button
        variant='contained'
        color='primary'
        onClick={() => props.placeOrder()}
        sx={{
          marginBottom: '1vh',
          marginLeft: '1vw',
        }}
      >
        Place Order
      </Button>
    </Card>
  )
}

export default PlaceOrderCard