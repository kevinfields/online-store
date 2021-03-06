import { Grid } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import OrderCard from '../components/OrderCard';
import getColor from '../functions/getColor';


const MyOrdersPage = (props) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {

    let catcher = [];
    await props.ordersRef.orderBy('orderPlaced', 'desc').get().then(snap => {
      snap.forEach(doc => {
        catcher.push(doc);
      })
    })
    setOrders(catcher);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, [])

  return (
    <div className='page'>
      <h1 
        style={{
          textAlign: 'center',
          color: getColor(props.themeSelect, 'text')
        }}
      >
        My Orders
      </h1>
      { loading ? 
          <Loading />
      :
      
        orders.length > 0 ?
        <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 4, md: 4 }}>
          {
            orders.map(item => (
              <Grid item xs={2} sm={4} md={4} key={item.id}>
                <OrderCard 
                  order={item} 
                  id={item.id} 
                  index={orders.indexOf(item)} 
                  themeSelect={props.themeSelect}
                />
              </Grid>
            ))
          }
        </Grid>
      : 
        <p style={{
          textAlign: 'center',
          color: getColor(props.themeSelect, 'text')
        }}
        >
          You do not have any current orders.
        </p>
      }
    </div>
  )
}

export default MyOrdersPage