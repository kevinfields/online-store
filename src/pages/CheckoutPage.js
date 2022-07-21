import { Alert, Breadcrumbs, Button, Grid, Typography, } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import PlaceOrderCard from '../components/PlaceOrderCard';
import ProductCard from '../components/ProductCard';
import calculateRewards from '../functions/calculateRewards';
import '../styling/CheckoutPage.css';

const CheckoutPage = (props) => {

  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [orderID, setOrderID] = useState('');
  const [stockAlert, setStockAlert] = useState({
    open: false,
    product: '',
    available: 0,
  });

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

    let storesProductData;
    let productData;
    
    await props.cartRef.doc(item.id).get().then(doc => {
      productData = doc.data();
    })

    await props.departmentsRef
      .doc(productData.department)
      .collection('products')
      .doc(item.id)
      .get()
      .then(doc => {
        storesProductData = doc.data();
    });

    if (storesProductData.stock < Number(quantity)) {
      setStockAlert(true);
      return;
    }
    
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
      updateItemOrderCount(item.id, item.data().department, item.data().quantity);
      titleCatcher.push(`${item.data().title} | ${item.data().quantity} ~ ${item.data().quantity * item.data().price}`);
      counter += Number(item.data().quantity);
    })

    let rewards = 0;
    if (total >= 20) {
      rewards = calculateRewards(total);
    }

    await props.ordersRef.add({
      items: titleCatcher,
      orderPlaced: new Date(),
      orderStatus: 'submitted',
      totalCost: total,
      itemCount: Number(counter),
      rewardPoints: rewards,
    }).then(doc => {
      setOrderID(doc.id);
    })

    let userData;

    await props.userRef.get().then(doc => {
      userData = doc.data();
    });

    await props.userRef.set({
      ...userData,
      rewardPoints: Number(userData.rewardPoints) + Number(rewards),
    })

    setModal(true);
    setCartData([]);
  }

  const updateItemOrderCount = async (id, department, qty) => {

    const productRef = props.departmentsRef.doc(department).collection('products').doc(id);
    let itemData;

    await productRef.get().then(doc => {
      itemData = doc.data();
    });

    await productRef.set({
      ...itemData,
      currentlyOrdered: Number(itemData.currentlyOrdered) + Number(qty),
    })

  }

  useEffect(() => {
    loadCartData();
  }, []);

  useEffect(() => {
    
    let aggregator = 0;
    cartData.forEach(item => {
      let num = (item.data().price * item.data().quantity);
      num = Math.round(num * 100) / 100;
      aggregator += num;
    })
    setTotal(Math.round(aggregator * 100) / 100);
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
              cardColor={props.cardColor}
              themeSelect={props.themeSelect}
            />
          </Grid>
        ))}
        <Grid item xs={2} sm={4} md={4}>
          <PlaceOrderCard placeOrder={() => placeOrder()} cost={total} cardColor={props.cardColor} />
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
            variant='contained'
            color='primary'
            sx={{
              marginTop: '3vh',
            }}
          >
            View Order
          </Button>
          <Button
            href='/'
            variant='contained'
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
    {
      stockAlert.open ?
      <Alert
        open={stockAlert.open}
        onClose={() => setStockAlert({
          ...stockAlert,
          open: false,
        })}
        severity='error'
        sx={{
          width: '40vw',
          height: '20vh',
          position: 'fixed',
          left: '30vw',
          marginRight: '10vw',
          marginTop: '15vh',

        }}
      >
        <Typography>Sorry, there is not enough of that product in stock.</Typography>
      </Alert>
      :
      null
    }

    </div>
    
  )
}

export default CheckoutPage