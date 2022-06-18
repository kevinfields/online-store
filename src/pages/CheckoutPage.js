import { Alert, Breadcrumbs, Button, Grid, Typography, } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import PlaceOrderCard from '../components/PlaceOrderCard';
import ProductCard from '../components/ProductCard';
import '../styling/CheckoutPage.css';

const CheckoutPage = (props) => {

  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [orderID, setOrderID] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadCartData = async () => {
    let catcher = [];
    await props.cartRef.get().then(snap => {
      snap.forEach(doc => {
        catcher.push(doc);
      })
    })
    setCartData(catcher);
    setLoading(false);
  }

  const removeFromCart = async (id) => {
    await props.cartRef.doc(id).delete();
    setCartData(cartData.filter(product => product.id !== id));
  }

  const multiplyItem = async (item, quantity) => {

  
    await props.cartRef.doc(item.id).set({
      ...item.data(),
      quantity: quantity
    });
    loadCartData();
  }

  const placeOrder = async () => {
    

   for (const doc of cartData) {
     await props.cartRef.doc(doc.id).delete();
   }

    let titleCatcher = [];
    let counter = 0;

    cartData.forEach(item => {
      titleCatcher.push(`${item.data().title} | ${item.data().quantity}`);
      counter += Number(item.data().quantity);
    })

    await props.ordersRef.add({
      items: titleCatcher,
      orderPlaced: new Date(),
      orderStatus: 'submitted',
      totalCost: total,
      itemCount: Number(counter),
    }).then(doc => {
      setOrderID(doc.id);
    })
    setModal(true);
    setCartData([]);
  }

  useEffect(() => {
    loadCartData();
  }, []);

  useEffect(() => {
    
    let aggregator = 0;
    cartData.forEach(item => {
      aggregator += (item.data().price * item.data().quantity)
    });
    setTotal(aggregator);
  }, [cartData])

  return (
    <div>
      <div className='header'>Checkout</div>
      <Breadcrumbs aria-label='breadcrumb' separator='=>'>
        <Button 
          href='/'
          variant='contained'
          color='secondary'
          sx={{
          marginLeft: '10vw',
          marginTop: '5vh', 
          }}
        >
          Go Back
        </Button>
      </Breadcrumbs>
      <div className='page'>
      {loading ? 
      <Loading />
      : cartData.length > 0 ?
      <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 4, md: 4 }}>
        {cartData.map(item => (
          <Grid item xs={2} sm={4} md={4} key={item.id}>
            <ProductCard 
              product={item.data()} 
              onRemove={() => removeFromCart(item.id)}
              onMultiply={(quantity) => multiplyItem(item, quantity)}
            />
          </Grid>
        ))}
        <Grid item xs={2} sm={4} md={4}>
          <PlaceOrderCard placeOrder={() => placeOrder()} cost={total}/>
        </Grid>
      </Grid>
      : null
      }
    </div>
    {
      modal ? 
        <Alert 
          severity='success'
          open={modal}
          onClose={() => setModal(false)}
          sx={{
            width: '40vw',
            height: '20vh',
            position: 'fixed',
            left: '30vw',
            marginRight: '10vw',
            marginTop: '15vh',

          }}
        >
          <div
            style={{
              width: '30vw',
              fontSize: '18pt',
            }}>
            Your order has been sent!
          </div>
          <Button
            href={`/order/${orderID}`}
            variant='outlined'
            color='primary'
            sx={{
              marginTop: '3vh',
            }}
          >
            View Order
          </Button>
          <Button
            href='/'
            variant='outlined'
            color='secondary'
            sx={{
              marginTop: '3vh',
              marginLeft: '5vw',
            }}
          >
            Return to Home
          </Button>
          
        </Alert>
      :
        null
    }
    </div>
    
  )
}

export default CheckoutPage