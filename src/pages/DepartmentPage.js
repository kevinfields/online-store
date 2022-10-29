import { FormControlLabel, FormGroup, Grid, MenuItem, Switch, TextField, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import Alert from '../components/Alert';
import getColor from '../functions/getColor';
import ADD_TO_CART from '../reducers/ADD_TO_CART';

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
  const [sort, setSort] = useState('alpha');
  const [filter, setFilter] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  const textColor = getColor(props.themeSelect, 'text');
  const borderColor = getColor(props.themeSelect, 'border');

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

    await ADD_TO_CART(product, quantity, props.cartRef);

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
      available: 0,
    })
  };

  const watchProduct = async (productId) => {

    let productData;

    await props.productsRef.doc(productId).get().then(doc => {
      productData = doc.data();
    })

    if (productData.alertList === undefined) {
      productData = {
        ...productData,
        alertList: [],
      }
    }

    await props.productsRef.doc(productId).set({
      ...productData,
      alertList: props.userId !== '' ? productData.alertList.concat(props.userId) : productData.alertList
    })
    await props.userRef.collection('watchedItems').doc(productId).set({
      ...productData
    });

    setStockAlert({
      open: false,
      product: '',
      max: 0,
    });
  };

  const sortSwitcher = (opt) => {

    setSort(opt);
    switch (opt) {
      case 'alpha':
        setProducts(products.sort((a, b) => a.data().title.localeCompare(b.data().title)));
        break;
      case 'price':
        setProducts(products.sort((a, b) => a.data().price - b.data().price));
        break;
      case 'reverse alpha':
        setProducts(products.sort((a, b) => b.data().title.localeCompare(a.data().title)));
        break;
      case 'reverse price':
        setProducts(products.sort((a, b) => b.data().price - a.data().price));
        break;
      default:
        break;
    };
  }

  useEffect(() => {

    if (filter.length > 20) {
      setFilter(filter.substring(0, 20));
    };

    if (filter !== '') {
      let successes = [];
      let failures = [];
      products.forEach(item => {
        let itemTitle = item.data().title.toLowerCase();
        let filterTest = filter.toLowerCase();
        if (itemTitle.split(filterTest).length > 1) {
          console.log(itemTitle + ' was a success');
          successes.push(item);
        } else {
          failures.push(item);
        }
      });
      let catcher = successes.concat(failures);
      setProducts(catcher);
    } 

  }, [filter]);

  useEffect(() => {

    if (inStockOnly) {
      setProducts(products.filter(item => item.data().stock - item.data().currentlyOrdered  > 0 ));
    } else {
      loadProducts();
    }
  }, [inStockOnly])

  return (
    <div className='page'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          gap: '5vw',
          marginTop: '3vh',
          marginBottom: '1vh',
          width: '72vw',
          justifyContent: 'space-evenly',
          marginLeft: '11vw',
        }}
      >
        <TextField
          value={sort}
          onChange={(e) => sortSwitcher(e.target.value)}
          select
          label='Sort By'
          color='primary'
          InputLabelProps={{shrink: true, style: {color: textColor}}}
          SelectProps={{
            style: {
              color: textColor,
            }
          }}
          sx={{
            width: '28vw',
            color: textColor,
            input: {
              color: 'red',
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
        >
          <MenuItem value='alpha'>Alphabetical</MenuItem>
          <MenuItem value='reverse alpha'>Reverse Alphabetical</MenuItem>
          <MenuItem value='price'>Price {"("}Low to High{")"}</MenuItem>
          <MenuItem value='reverse price'>Price {"("}High to Low{")"}</MenuItem>
        </TextField>
        <Typography
          variant='h3'
          color={getColor(props.themeSelect, 'text')}
          sx={{
            width: '20vw',
          }}
        >
          {props.department}
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={inStockOnly}
                onChange={() => setInStockOnly(!inStockOnly)}
                color='secondary'
              />
            }
            label={inStockOnly ? 'Showing Stocked' : 'Showing All'}
            labelPlacement={'start'}
            sx={{
              width: '10vw',
              fontSize: '8pt',
            }}
          >
          </FormControlLabel>
        </FormGroup>
        <TextField
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          InputLabelProps={{ required: false, style: {color: textColor} }}
          label='Search'
          sx={{
            width: '20vw',
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
              onAccept={() => watchProduct(stockAlert.id)}
              header={`Sorry, ${stockAlert.product} is out of stock.`}
              description={'Would you like to be notified when it is back in stock?'}
            />
            : null
          }
          { lowStockAlert.open ?
            <Alert
              open={lowStockAlert.open}
              onClose={() => setLowStockAlert({
                open: false,
                max: 0,
                product: '',
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