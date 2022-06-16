import { AddShoppingCart, Delete } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, CardMedia } from '@mui/material';
import React from 'react';



const ProductCard = (props) => {
  return (
    <Card variant='outlined' color='secondary' sx={{
      width: '25vw',
      margin: '5vh',
    }}>
      <CardHeader title={props.product.title} />
      <CardContent children={`$${props.product.price}`} />
      <CardContent children={props.product.description} />
      <CardMedia>
        <img src={props.product.photoURL} alt={props.product.title} className='product-image'/>
      </CardMedia>
      {props.onAdd ?
        <Button 
          variant='contained'
          color='primary'
          size='large'
          endIcon={<AddShoppingCart />}
          sx={{
            marginLeft: '1vh',
            marginBottom: '1vh',
          }}
          onClick={() => props.onAdd()}
        >
          Add to My Cart
        </Button>
      : 
        <Button
          variant='contained'
          color='error'
          size='large'
          endIcon={<Delete />}
          sx={{
            float: 'right',
            marginRight: '1vh',
            marginBottom: '1vh',
          }}
          onClick={() => props.onRemove()}
        >
          Remove from My Cart
        </Button>}
    </Card>
  )
}

export default ProductCard