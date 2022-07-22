import { Grid } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import Alert from '../components/Alert';
import getColor from '../functions/getColor';

const DepartmentPage = (props) => {

  const [products, setProducts] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [stockAlert, setStockAlert] = useState({
    product: '',
    available: '',
    open: false,
  });
  const [lowStockAlert, setLowStockAlert] = useState({
    product: '',
    open: false,
    max: 0,
  })
  const [loading, setLoading] = useState(true);

  const loadCartIds = async () => {

    let catcher = [];

    await props.cartRef.get().then(snap => {
      snap.forEach(doc => {
        catcher.push(doc.id);
      })
    })
    setCartIds(catcher);
  }

  const loadProducts = async () => {

    let catcher = [];
    await props.productsRef.get().then(snap => {
      snap.forEach(doc => {
        catcher.push(doc);
      })
    });
    setProducts(catcher);
    setLoading(false);
  }



  useEffect(() => {
    if (props.loggedIn) {
      loadCartIds();
      loadProducts();
    } else {
      loadProducts();
    }
  }, []);

  const addToCart = async (product, quantity) => {

    if (Number(quantity) > (Number(product.data().stock) - Number(product.data().currentlyOrdered))) {
      setLowStockAlert({
        open: true,
        product: product,
        max: product.data().stock - product.data().currentlyOrdered, 
      });
      return;
    }

    await props.cartRef.doc(product.id).set({
      ...product.data(),
      quantity: Number(quantity)
    });
    setCartIds(cartIds.concat(product.id));
    let catcher = [...products];
    catcher[products.indexOf(product)].quantity = Number(quantity);
    setProducts([...catcher]);
  }

  const removeFromCart = async (id) => {
    await props.cartRef.doc(id).delete();
    setCartIds(cartIds.filter(item => item !== id));

    let catcher = [...products];
    for (const sg of catcher) {
      if (sg.id === id) {
        sg.quantity = 0;
      }
    }
    setProducts([...catcher]);
  }

  const openAlert = (id, data) => {
    setStockAlert({
      product: data.title,
      department: props.department,
      open: true,
      id: id,
    })
  };

  const acceptOrderAll = async (alertObject) => {

    await addToCart(alertObject.product, alertObject.max);
    setLowStockAlert({
      product: {},
      open: false,
      max: 0,
    })
  }

  return (
    <div className='page'>
        <h1 style={{
          textAlign: 'center',
          color: getColor(props.themeSelect, 'text'),
        }}>
          {props.department}
        </h1>
        { loading ? <Loading /> : 
        <>
          { stockAlert.open ? 
            <Alert 
              open={stockAlert.open}
              onClose={() => setStockAlert({
                product: '',
                open: false,
              })}
              // will have to rewrite the onAccept to just call a seperate function
              // to add the user to the list of people to notify when the stock increases.
              onAccept={() => setStockAlert({
                product: '',
                open: false,
              })}
              header={`Sorry, ${stockAlert.product} is out of stock.`}
              description={'Would you like to be notified when it is back in stock?'}
            />
            : null
          }
          { lowStockAlert.open ?
            <Alert
              open={lowStockAlert.open}
              onClose={() => setLowStockAlert({
                product: {},
                open: false,
                max: 0,
              })}
              onAccept={() => acceptOrderAll(lowStockAlert)}
              header={`Sorry, ${lowStockAlert.product.data().title} has a stock of only ${lowStockAlert.product.data().stock - lowStockAlert.product.data().currentlyOrdered}.`}
              description={'Would you like to order the remaining stock?'}
            />
            : null  
          }
          <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 4, md: 4 }}>
            {products.map(product => (
              <Grid item xs={2} sm={4} md={4} key={product.id}>
                <ProductCard 
                  product={product.data()} 
                  onAdd={
                    !cartIds.includes(product.id) ? 
                    () => addToCart(product, 1) :
                    null
                  }
                  outOfStockAlert={() => openAlert(product.id, product.data())}
                  quantity={product.quantity ? product.quantity : 1}
                  loggedIn={props.loggedIn}
                  onMultiply={(quantity) => addToCart(product, quantity)}
                  onRemove={() => removeFromCart(product.id)}
                  cardColor={props.cardColor}
                  themeSelect={props.themeSelect}
                /> 
              </Grid>
            ))}
          </Grid>
        </>
        }
    </div>
  )
}

export default DepartmentPage