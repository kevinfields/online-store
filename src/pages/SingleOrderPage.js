import { Avatar, Badge, Button, Card, Chip, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import getOrderItem from '../functions/getOrderItem';

const SingleOrderPage = (props) => {

  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);


  const loadOrder = async () => {

    let single;
    await props.ordersRef.doc(id).get().then(doc => {
      console.table(doc.data());
      single = doc.data();
    });
    setOrder(single);
    setLoading(false);
  }

  useEffect(() => {
    loadOrder();
  }, [])

  return (
    <div className='page'>
      {
        loading ? 
          <Loading />
        :
        <>
          <Button 
            href='/'
            variant='contained'
            color='secondary'
          >
            Go Back
          </Button>
          <h2>Order Details: </h2>
          <h5>Order ID: {id}</h5>
            
          <List
            sx={{
              width: '30vw',
            }}
          >
            {order.items.map(item => (
              <ListItem
                key={item}
              >
                <ListItemText 
                  primary={getOrderItem(item, 'title')} 
                />
                <ListItemIcon>
                  <Avatar 
                    sx={{
                      bgcolor: 'red',
                      width: '5vw',
                    }}
                    variant='rounded'
                  >
                    {'x' + getOrderItem(item, 'quantity')}
                  </Avatar>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </>
      }
    </div>
  )
}

export default SingleOrderPage