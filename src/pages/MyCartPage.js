import { Button, Card, Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import { CheckOutlined, Delete } from '@mui/icons-material';
import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import CheckoutCard from '../components/CheckoutCard';
import Alert from '../components/Alert';

const MyCartPage = (props) => {
  
  const [cart, setCart] = useState([]);
  const [cost, setCost] = useState(0);
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadMyCart = async () => {

    let catcher = [];
    let aggregator = 0;
    let counter = 0;

    await props.cartRef.get().then(snap => {
      snap.forEach(doc => {
        catcher.push(doc);
        let num = Number(doc.data().quantity * doc.data().price);
        num = Math.round((num + Number.EPSILON) * 100) / 100
        aggregator += num;
        counter += Number(doc.data().quantity);
      })
    })

    setCart(catcher);
    setCost(Math.round(aggregator * 100) / 100);
    setCount(counter);
    setLoading(false);
  }

  useEffect(() => {
    loadMyCart();
  }, [])

  const removeFromCart = async (item) => {
    await props.cartRef.doc(item.id).delete();
    setCart(cart.filter(product => product.id !== item.id));
    setCost(cost - (item.data().price * item.data().quantity));
  }

  const clearCart = async () => {

    for (const item of cart) {
      await props.cartRef.doc(item.id).delete();
    }
    setCart([]);
    setModal(false);
  }

  const multiplyItem = async (item, quantity) => {

    await props.cartRef.doc(item.id).set({
      ...item.data(),
      quantity: Number(quantity),
    });
    loadMyCart();
  }

  useEffect(() => {
    
  }, [cost])

  return (
    <div className='page'>
      <h1 style={{
        textAlign: 'center',
      }}>My Cart</h1>
      
      { loading ? 
        <Loading /> 
        : !loading && cart.length > 0 ?
        <>
          <Button 
            href='checkout' 
            variant='contained' 
            color='primary' 
            startIcon={<CheckOutlined />}
            sx={{
              float: 'right',
              marginRight: '5vw',
              marginTop: '-7vh',
            }}
          >
            Check Out
          </Button>
          <Button
            variant='outlined'
            color='error'
            startIcon={<Delete />}
            sx={{
              float: 'right',
              marginTop: '1vh',
              marginRight: '5vw',
            }}
            onClick={() => setModal(true)}
          >
            Clear My Cart
          </Button>
          <Box sx={{
            float: 'right',
            position: 'relative',
            right: '10vw',
            bottom: '8vh',
          }}>Total: ${cost}</Box>
          <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 3, md: 3 }}>
            {cart.map(item => (
              <Grid item xs={2} sm={4} md={4} key={item.id}>
                <ProductCard 
                  product={item.data()}
                  onMultiply={(quantity) => multiplyItem(item, quantity)}
                  onRemove={() => removeFromCart(item)}
                />
              </Grid>
            ))}
            <Grid item xs={4} sm={4} md={4}>
              <CheckoutCard price={cost} count={count} />
            </Grid>
          </Grid> 
        </>
        :
        <div style={{
          textAlign: 'center',
        }}>You have no items in your cart.</div>
      }
      { modal ?
        <Alert 
          open={modal}
          onClose={() => setModal(false)}
          header={'Are you sure you want to clear your cart?'}
          description={'This cannot be undone'}
          onAccept={() => clearCart()}
        />
      : null}
    </div>
  )
}

export default MyCartPage