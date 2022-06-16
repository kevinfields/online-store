import { Grid } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';

const SingleOrderPage = (props) => {

  const params = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);


  const loadOrder = async () => {

    let single;
    await props.ordersRef.doc(params.id).get().then(doc => {
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
        <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 3, md: 3 }}>
          
        </Grid>
      }
    </div>
  )
}

export default SingleOrderPage