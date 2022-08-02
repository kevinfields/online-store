import { Avatar, Badge, Button, Card, Chip, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { NavigationType, useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import capitalizeFirst from '../functions/capitalizeFirst';
import getColor from '../functions/getColor';
import getOrderItem from '../functions/getOrderItem';
import { useNavigate } from 'react-router-dom';
import fixCost from '../functions/fixCost';

const SingleOrderPage = (props) => {

  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const loadOrder = async () => {

    let single;
    await props.ordersRef.doc(id).get().then(doc => {
      single = doc.data();
    });
    setOrder(single);
    setLoading(false);
  }

  useEffect(() => {
    loadOrder();
  }, []);

  const returnToOrders = () => {

    props.returnToOrders();
    navigate('/');
  }

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
          border: `1px solid ${getColor(props.themeSelect, 'border')}`,
          borderRadius: '5px',
          boxShadow: `1px 1px 3px 3px ${getColor(props.themeSelect, 'box_shadow')}`,
          overflowY: 'scroll',
        }}>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => returnToOrders()}
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
                  border: `1px solid ${getColor(props.themeSelect, 'border')}`,
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
                <ListItemIcon>
                  <Avatar
                    sx={{
                      bgcolor: getColor(props.themeSelect, 'card_background'),
                      color: getColor(props.themeSelect, 'text'),
                      width: '5vw',
                      marginLeft: '1vw',
                      fontSize: '10pt',
                    }}
                    variant="rounded"
                  >
                    {'$' + fixCost(getOrderItem(item, 'price'))}
                  </Avatar>
                </ListItemIcon>
              </ListItem>
            ))}
            <ListItem
              sx={{
                border: `1px solid ${getColor(props.themeSelect, 'border')}`,
                borderRadius: '5px',
                marginTop: '1vh',
              }}
            >
              <ListItemText primary={'Order Status: '} />
              <ListItemIcon>
                <Avatar 
                  sx={{
                    bgcolor: getColor(props.themeSelect, 'card_background'),
                    color: getColor(props.themeSelect, 'text'),
                    width: '5vw',
                    fontSize: '8pt',
                  }}
                  variant='rounded'
                >
                    {capitalizeFirst(order.orderStatus)}
                </Avatar>
              </ListItemIcon>
            </ListItem>
            <ListItem 
              sx={{
                border: `1px solid ${getColor(props.themeSelect, 'border')}`,
                borderRadius: '5px',
                marginTop: '1vh',
              }}
            >
              Total Cost: ${fixCost(order.totalCost)}
            </ListItem>
          </List>
        </div>
      }
    </div>
  )
}

export default SingleOrderPage