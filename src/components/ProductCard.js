import { AddShoppingCart, Check, Delete, Edit } from '@mui/icons-material';
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Chip, Input } from '@mui/material';
import React, {useState} from 'react';



const ProductCard = (props) => {

  const [quantity, setQuantity] = useState(props.product.quantity ? props.product.quantity : 0);
  const [editing, setEditing] = useState(false);

  const addOne = () => {
    setQuantity(1);
    props.onAdd();
  }

  const editQuantity = () => {
    props.onMultiply(quantity);
    setEditing(false);
  };

  return (
    <Card variant='outlined' color='secondary' sx={{
      width: '25vw',
      margin: '5vh',
    }}>
      <CardHeader title={props.product.quantity ? (props.product.title + ' x ' + props.product.quantity) : props.product.title} />
      <CardContent children={`$${props.product.price * (props.product.quantity ? props.product.quantity : 1)}`} />
      <CardContent children={props.product.description} />
      {props.tag ? 
        <CardContent children={props.tag} />
      : null}
      <CardMedia
        sx={{
          marginLeft: '1vh',
        }}
      >
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
          onClick={() => addOne()}
        >
          Add to My Cart
        </Button>
      : 
        <>
          {editing ? 
            <>
              <Input 
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button 
                variant='outlined'
                color='success'
                size='small'
                endIcon={<Check />}
                onClick={() => editQuantity()}
              >
                Confirm Amount
              </Button>
            </>
          : <Button
              variant='outlined'
              color='secondary'
              size='small'
              endIcon={<Edit />}
              onClick={() => setEditing(true)}
            >Edit Quantity</Button>
          }
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
          </Button>
        </>
       }
    </Card>
  )
}

export default ProductCard