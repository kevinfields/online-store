import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';

const DepartmentPage = (props) => {

  const [products, setProducts] = useState([]);
  const [cartIds, setCartIds] = useState([]);
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
    loadCartIds();
    loadProducts();
  }, []);

  const addToCart = async (product, quantity) => {


    await props.cartRef.doc(product.id).set({
      ...product.data(),
      quantity: Number(quantity)
    });
    setCartIds(cartIds.concat(product.id));
  }

  const removeFromCart = async (id) => {
    await props.cartRef.doc(id).delete();
    setCartIds(cartIds.filter(item => item !== id));
  }

  return (
    <div className='page'>
        <h1 style={{
          textAlign: 'center',
        }}>{props.department}</h1>
        { loading ? <Loading /> : 
        <>
          <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 4, md: 4 }}>
            {products.map(product => (
              <Grid item xs={2} sm={4} md={4}>
                <ProductCard 
                  product={product.data()} 
                  onAdd={
                    !cartIds.includes(product.id) ? 
                    () => addToCart(product, 1) :
                    null
                  }
                  onMultiply={(quantity) => addToCart(product, quantity)}
                  onRemove={() => removeFromCart(product.id)}/> 
              </Grid>
            ))}
          </Grid>
        </>
        }
    </div>
  )
}

export default DepartmentPage