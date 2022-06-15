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

  const addToCart = async (product) => {
    await props.cartRef.doc(product.id).set({
      ...product.data(),
    });
    setCartIds(cartIds.concat(product.id));
  }

  const removeFromCart = async (id) => {
    await props.cartRef.doc(id).delete();
    setCartIds(cartIds.filter(item => item !== id));
  }

  return (
    <div>
      <Container maxWidth='sm'>
        <h3>{props.department}</h3>
        { loading ? <Loading /> : 
        <>
          {products.map(product => (
            <ProductCard product={product.data()} 
            onAdd={
              !cartIds.includes(product.id) ? 
              () => addToCart(product) :
              null
            } 
            onRemove={() => removeFromCart(product.id)}/> 
          ))}
        </>
        }
      </Container>
    </div>
  )
}

export default DepartmentPage