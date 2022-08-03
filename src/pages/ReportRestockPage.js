import {Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import {OutlinedInput } from '@mui/material';
import React, {useState, useEffect} from 'react';
import getColor from '../functions/getColor';
import getFont from '../functions/getFont';
import ALERT_USERS from '../reducers/ALERT_USERS';

const ReportRestockPage = (props) => {


  const [phase, setPhase] = useState('select');
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [restockValue, setRestockValue] = useState(0);

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

    let tabArray = ['clothing', 'furniture', 'electronics', 'appliances', 'outdoors'];
    const tabSelect = tabArray.indexOf(product.department) + 1;

    const productRef = props.departmentsRef.doc(product.department).collection('products').doc(product.id);
   
    let data;
    await productRef.get().then(doc => {
      data = doc.data();
    });

    console.log(JSON.stringify(product))
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

  const productEditor = (product) => {
    console.log(JSON.stringify(product));
    setProduct(product);
  }

  useEffect(() => {
    loadOutOfStockProducts();
  }, []);

  useEffect(() => {
    if (product !== null) {
      setPhase('update-amount');
    }
  }, [product]);

  useEffect(() => {
    if (phase === 'select') {
      setProduct(null);
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
          boxShadow: `1px 1px 3px 3px ${shadowColor}`
        }}
      >
        <CardHeader 
          title='Restock Report Form'
          style={{
            textAlign: 'center',
            color: textColor,
            fontFamily: getFont(props.themeSelect),
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
              {products.length > 0 ? products.map(product => (
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
                    onClick={() => productEditor(product)}
                  >
                    {product.id}
                  </button>
                </Grid>
              ))
              : 
                <Grid
                  item
                >
                  <Typography
                    sx={{
                      width: '10vw',
                      height: '5vh',
                      margin: '1vh',
                    }}
                  >
                    All Products are in stock.
                  </Typography>
                </Grid>
              }
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
              <Typography
                style={{
                  color: textColor,
                  marginTop: '2.5vh',
                }}
              >
                New Number in Stock: 
              </Typography>
              <OutlinedInput
                type='number'
                value={restockValue}
                autoFocus={true}
                onChange={(e) => setRestockValue(e.target.value)}
                InputLabelProps={{ required: false, shrink: true, style: {color: textColor} }}
                variant='outined'
                color='primary'
                sx={{
                  input: {
                    color: textColor,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderColor: borderColor
                    }
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: borderColor
                    }
                  },
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& > fieldset": {
                      borderColor: borderColor
                    }
                  },
                }}
              />
            </div>
            <button
              className={`styled-button-${props.themeSelect}`}
              style={{
                width: '20vw',
                height: '10vh',
                position: 'fixed',
                left: '40vw',
                bottom: '35vh',
                borderRadius: '5px',
                boxShadow: `1px 1px 3px 3px ${shadowColor}`,
              }}
              onClick={() => setPhase('confirm')}
            >
              CONFIRM
            </button>
          </div>
          : phase === 'confirm' ?
          <CardContent
            style={{
              border: `1px solid ${borderColor}`,
              boxShadow: `1px 1px 3px 3px ${shadowColor}`,
              borderRadius: '10px',
              position: 'fixed',
              bottom: '25vh',
              left: '34vw',
              width: '32vw',
              height: '40vh',
            }}
          >
            <Typography
              style={{
                textAlign: 'center',
                width: '30vw',
                position: 'fixed',
                left: '35vw',
                bottom: '50vh',
                color: textColor,
              }}
              variant='h4'
            >
              Are you sure that product "{product.id}" has a stock of {restockValue}?
            </Typography>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <button
                onClick={() => confirmAmount()}
                className={`styled-button-${props.themeSelect}`}
                style={{
                  position: 'fixed',
                  left: '38vw', 
                  width: '10vw',
                  height: '10vh',
                  bottom: '30vh',
                  borderRadius: '5px',
                }}
              >
                YES
              </button>
              <button
                onClick={() => setPhase('update-amount')}
                className={`styled-button-${props.themeSelect}`}
                style={{
                  position: 'fixed',
                  left: '54vw', 
                  width: '10vw',
                  height: '10vh',
                  bottom: '30vh',
                  borderRadius: '5px',
                }}
              >
                NO
              </button>
            </div>
          </CardContent>
          : 
          null
        }
      </Card>
    </div>
  )
}

export default ReportRestockPage;