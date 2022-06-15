import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';

const MyCartPage = (props) => {
  
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMyCart = async () => {

    let catcher = [];
    await props.cartRef.get().then(snap => {
      snap.forEach(doc => {
        catcher.push(doc);
      })
    })
    setCart(catcher);
    setLoading(false);
  }

  useEffect(() => {
    loadMyCart();
  }, [])

  const removeFromCart = async (item) => {
    await props.cartRef.doc(item).delete();
    setCart(cart.filter(product => product.id !== item));
  }

  return (
    <div>
      <h3>{props.user.displayName}'s Cart</h3>
      { loading ? 
        <Loading /> 
        : !loading && cart.length > 0 ?
        <>
          {cart.map(item => (
            <ProductCard product={item.data()} onRemove={() => removeFromCart(item.id)}/>
          ))}
        </>
        :
        <div>You have no items in your cart.</div>
      }
    </div>
  )
}

export default MyCartPage