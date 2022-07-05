import { CheckOutlined } from '@mui/icons-material'
import { Button, Card, CardContent, CardHeader} from '@mui/material'
import React from 'react'

const CheckoutCard = (props) => {
  return (
    <Card variant='outlined' color='secondary' sx={{
      width: '25vw',
      margin: '5vh',
      backgroundColor: props.cardColor,
      color: props.cardColor === 'white' ? 'black' : 'yellow',
    }}>
      <CardHeader title={'Purchase Information'} />
      <CardContent children={`$${props.price}`} />
      <CardContent children={`Total Items: ${props.count}`} />
      <Button 
        href='checkout' 
        variant='contained'
        color='primary'
        startIcon={<CheckOutlined />}
        sx={{
          float: 'right',
          marginRight: '1vw',
          marginBottom: '1vh',
        }}
      >
        Check Out
      </Button>
    </Card>
  )
}

export default CheckoutCard