import { Breadcrumbs, Button, Grid, } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import '../styling/CheckoutPage.css';

const CheckoutPage = (props) => {

  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
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

  const removeFromCart = async (item) => {
    await props.cartRef.doc(item).delete();
    setCartData(cartData.filter(product => product.id !== item));
  }

  const placeOrder = async () => {
    alert('Your order has been sent.');

   for (const doc of cartData) {
     await props.cartRef.doc(doc.id).delete();
   }

    let titleCatcher = [];
    cartData.forEach(item => {
      titleCatcher.push(item.data().title);
    })
    await props.ordersRef.add({
      items: titleCatcher,
      orderPlaced: new Date(),
      orderStatus: 'submitted',
      totalCost: total,
    });
    navigate('/');
  }

  useEffect(() => {
    loadCartData();
  }, []);

  useEffect(() => {
    
    let aggregator = 0;
    cartData.forEach(item => {
      aggregator += item.data().price
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
          <Grid item xs={2} sm={4} md={4}>
            <ProductCard product={item.data()} onRemove={() => removeFromCart(item.id)}/>
          </Grid>
        ))}
      </Grid>
      : <p>Your cart is empty.</p>}
      <div className='total-price'>
        Cost: ${total}
      </div>
      <Button 
        onClick={() => placeOrder()}
        variant='contained'
        color='primary'
      >
        Place Order
      </Button>
    </div>
    </div>
    
  )
}

export default CheckoutPage