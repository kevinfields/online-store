import { Button, Card, CardContent, CardHeader, Grid, MenuItem, Select } from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import getColor from '../functions/getColor'

const ReportRestockPage = (props) => {


  const [phase, setPhase] = useState('select');
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');

  const textColor = getColor(props.themeSelect, 'text');
  const borderColor = getColor(props.themeSelect, 'border');
  const shadowColor = getColor(props.themeSelect, 'box_shadow');
  const cardColor = getColor(props.themeSelect, 'card_background');

  const loadOutOfStockProducts = async () => {

    let productIds = [];
    await props.outOfStockRef.get().then(snap => {
      snap.forEach(doc => {
        productIds.push(doc.id);
      })
    });
    setProducts(productIds);
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
  }, [phase])

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
                    {product}
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
              Report restock of product: {product}
            </CardContent>
            <button
              onClick={() => setPhase('select')}
              className={`styled-button-${props.themeSelect}`}
              style={{
                borderRadius: '7px',
                width: 'fit-content',
                height: '3vh',
                marginLeft: '5vw',
                boxShadow: `1px 1px ${shadowColor}`
              }}
            >
              Go Back
            </button>
          </div>
          : phase === 'confirm' ?
          <div>
            <CardContent>
              Are you sure this product has this amount?
            </CardContent>
          </div>
          : 
          null
        }
      </Card>
    </div>
  )
}

export default ReportRestockPage;