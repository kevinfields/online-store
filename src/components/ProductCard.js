import { AddShoppingCart, Check, Delete, Edit, Error } from '@mui/icons-material';
import { Button, Card, CardContent, CardHeader, CardMedia, Input } from '@mui/material';
import React, {useState} from 'react';



const ProductCard = (props) => {

  const [quantity, setQuantity] = useState(props.product.quantity ? props.product.quantity : 0);
  const [editing, setEditing] = useState(false);

  const addOne = () => {
    setQuantity(1);
    props.onAdd();
  }

  const editQuantity = () => {

    if (quantity <= 0) {
      props.onRemove();
      return;
    }

    props.onMultiply(quantity);
    setEditing(false);
  };

  


  return (
    <Card 
      raised={true} 
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
      <CardHeader 
        title={
          props.product.quantity && props.product.quantity > 1 ? 
          (props.product.title + ' x ' + props.product.quantity) 
          : props.quantity && props.quantity > 1 ?
          (props.product.title + ' x ' + props.quantity)
          : props.product.title
        } 
        sx={{
          textAlign: 'center'
        }}
      />
      <CardContent 
        children={`$${props.product.price * (props.product.quantity ? props.product.quantity : 1)}`} 
        sx={{
          textAlign: 'center'
        }}
      />
      <CardContent children={props.product.description} />
      {props.tag ? 
        <CardContent children={props.tag} />
      : null}
      <CardMedia
        sx={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          marginBottom: '2vh',
        }}
      >
        <img src={props.product.photoURL} alt={props.product.title} className='product-image'/>
      </CardMedia>
      {props.onAdd ?
        <>
        {props.product.stock > 0 ?
          <Button 
            variant={props.cardColor === 'white' ? 'contained' : 'outlined'}
            color='primary'
            size='large'
            endIcon={<AddShoppingCart />}
            sx={{
              marginLeft: '1vh',
              marginBottom: '1vh',
              zIndex: '0',
            }}
            onClick={props.loggedIn ? () => addOne() : null}
            href={!props.loggedIn ? 'login' : null}
          >
            Add to My Cart
          </Button>
        :
          <Button 
            variant='outlined'
            color='error'
            size='large'
            endIcon={<Error />}
            sx={{
              marginLeft: '1vh',
              marginBottom: '1vh',
            }}
            onClick={() => props.outOfStockAlert()}
          >
            Out of Stock
          </Button>  
        }
      </>
      : 
        <>
          {editing ? 
            <>
              <Input 
                type='number'
                value={quantity}
                sx={{
                  width: '5vw',
                  float: 'right',
                  marginRight: '1vh',
                  marginBottom: '1vh',
                  border: '1px solid black',
                  borderRadius: '5px',
                  paddingLeft: '0.5vh',
                  color: props.cardColor === 'white' ? '#002984' : 'white',
                }}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button 
                variant={props.cardColor === 'white' ? 'contained' : 'outlined'}
                color='success'
                endIcon={<Check />}
                sx={{
                  marginLeft: '5vw',
                  marginBottom: '1vh',
                }}
                onClick={() => editQuantity()}
              >
                Confirm Amount
              </Button>
            </>
          : <Button
              variant={props.cardColor === 'white' ? 'contained' : 'outlined'}
              color='secondary'
              size='smaller'
              endIcon={<Edit />}
              sx={{
                float: 'right',
                marginRight: '1vh',
                marginBottom: '1vh',
              }}
              onClick={() => setEditing(true)}
            >Edit Quantity</Button>
          }
          <Button
            variant={props.cardColor === 'white' ? 'contained' : 'outlined'}
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