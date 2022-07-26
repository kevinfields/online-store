import { Button, Card, CardContent, CardHeader, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { KeyboardReturn } from '@mui/icons-material';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import getColor from '../functions/getColor';
import ALERT_USERS from '../reducers/ALERT_USERS';

const ReportRestockPage = (props) => {


  const [phase, setPhase] = useState('select');
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [restockValue, setRestockValue] = useState(0);

  const navigate = useNavigate();


  const textColor = getColor(props.themeSelect, 'text');
  const borderColor = getColor(props.themeSelect, 'border');
  const shadowColor = getColor(props.themeSelect, 'box_shadow');
  const cardColor = getColor(props.themeSelect, 'card_background');

  const loadOutOfStockProducts = async () => {

    let productsData = [];
    await props.outOfStockRef.get().then(snap => {
      snap.forEach(doc => {
        productsData.push({
          id: doc.id,
          department: doc.data().department,
        });
      })
    });
    setProducts(productsData);
  };

  const confirmAmount = async () => {


    //functions:
    //A: update stock in departments/:department/products/:product
    //B: delete out_of_stock/:product
    //C: for each userId in product's alertList:
    //  Ca: delete users/:userId/watchedItems/:product
    //  Cb: add message document to users/:userId/messages

    let tabArray = ['clothing', 'furniture', 'appliances', 'outdoors'];
    const tabSelect = tabArray.indexOf(product.department) + 2;

    let productRef = props.departmentsRef.doc(product.department).collection('products').doc(product.id);
   

    let data;
    await productRef.get().then(doc => {
      data = doc.data();
    });

    console.log(JSON.stringify(data));

    //A
    await productRef.set({
      ...data,
      stock: Number(data.stock) + Number(restockValue),
    });

    //B
    await props.outOfStockRef.doc(product.id).delete();
    
    //Ca / Cb
    await ALERT_USERS(productRef, props.usersRef);

    props.openPage(tabSelect);
  };

  useEffect(() => {
    loadOutOfStockProducts();
  }, []);

  useEffect(() => {
    if (product !== '') {
      setPhase('update-amount');
    }
  }, [product]);

  useEffect(() => {
    if (phase === 'select') {
      setProduct('');
    }
  }, [phase]);

  useEffect(() => {

    if (isNaN(restockValue)) {
      setRestockValue(0);
    };

    if (restockValue < 0) {
      setRestockValue(0);
    };

  }, [restockValue]);

  return (
    <div className='page'>
      <Card
        style={{
          width: '72vw',
          height: '56vh',
          position: 'fixed',
          left: '14vw',
          top: '22vh',
          backgroundColor: cardColor,
        }}
      >
        <CardHeader 
          title='Restock Report Form'
          style={{
            textAlign: 'center',
            color: textColor,
          }} 
        />
        { phase === 'select' ?
          <div>
            <CardContent
              style={{
                color: textColor,
                textAlign: 'center'
              }}
            >
              Choose an out-of-stock product by id.
            </CardContent>
            <Grid
              direction='row'
              columns='5'
              rowSpacing='5vh'
              columnSpacing='2vw'
              container={true}
              style={{
                width: '54vw',
                marginLeft: '9vw',
                border: `1px solid ${borderColor}`,
                boxShadow: `1px 1px ${shadowColor}`,
                borderRadius: '10px',
                justifyContent: 'space-around',
              }}
            >
              {products.map(product => (
                <Grid 
                  item
                >
                  <button
                    className={`styled-button-${props.themeSelect}`}
                    style={{
                      borderRadius: '7px',
                      width: '10vw',
                      height: '5vh',
                      margin: '1vh',
                    }}
                    onClick={() => setProduct(product)}
                  >
                    {product.id}
                  </button>
                </Grid>
              ))}
            </Grid>
          </div>
          : phase === 'update-amount' ?
          <div>
            <CardContent
              style={{
                color: textColor,
                textAlign: 'center',
              }}
            >
              Report restock of product: {product.id}
            </CardContent>
            <button
              onClick={() => setPhase('select')}
              className={`styled-button-${props.themeSelect}`}
              style={{
                borderRadius: '7px',
                width: '10vw',
                height: '5vh',
                marginLeft: '5vw',
                boxShadow: `1px 1px ${shadowColor}`,
                position: 'fixed',
                left: '10vw',
                top: '23vh',
                fontSize: '12pt',
                paddingTop: '1vh',
                paddingBottom: '1vh',
              }}
            >
              GO BACK
            </button>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '28vw',
                marginLeft: '22vw',
              }}
            >
              <Typography>New Number in Stock: </Typography>
              <TextField
                type='number'
                value={restockValue}
                onChange={(e) => setRestockValue(e.target.value)}
                sx={{
                  input: {
                    color: textColor,
                  },
                  border: `1px solid ${borderColor}`
                }}
              />
            </div>
            <button
              className={`styled-button-${props.themeSelect}`}
              style={{
                width: '20vw',
                height: '10vh',
              }}
              onClick={() => setPhase('confirm')}
            >
              CONFIRM
            </button>
          </div>
          : phase === 'confirm' ?
          <div>
            <CardContent>
              Are you sure that product "{product.id}" has a stock of {restockValue}?
            </CardContent>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <button
                onClick={() => confirmAmount()}
              >
                YES
              </button>
              <button
                onClick={() => setPhase('update-amount')}
              >
                NO
              </button>
            </div>
          </div>
          : 
          null
        }
      </Card>
    </div>
  )
}

export default ReportRestockPage;