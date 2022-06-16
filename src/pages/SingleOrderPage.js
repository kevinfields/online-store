import { Avatar, Badge, Button, Card, Chip, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import capitalizeFirst from '../functions/capitalizeFirst';
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
        <div style={{
          width: '35vw',
          padding: '2.5vw',
          position: 'fixed',
          left: '32.5vw',
          height: '60vh',
          border: '1px solid black',
          borderRadius: '5px',
          overflowY: 'scroll',
        }}>
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
                sx={{
                  border: '1px solid black',
                  borderRadius: '5px',
                  marginTop: '1vh',
                }}
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
            <ListItem
              sx={{
                border: '1px solid black',
                borderRadius: '5px',
                marginTop: '1vh',
              }}
            >
              <ListItemText primary={'Order Status: '} />
              <ListItemIcon>
                <Avatar 
                  sx={{
                    bgcolor: 'red',
                    width: '5vw',
                    fontSize: '10pt',
                  }}
                  variant='rounded'
                >
                    {capitalizeFirst(order.orderStatus)}
                </Avatar>
              </ListItemIcon>
            </ListItem>
            <ListItem 
              sx={{
                border: '1px solid black',
                borderRadius: '5px',
                marginTop: '1vh',
              }}
            >
              Total Cost: ${order.totalCost}
            </ListItem>
          </List>
        </div>
      }
    </div>
  )
}

export default SingleOrderPage