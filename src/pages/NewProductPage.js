import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, {useState, useEffect} from 'react';
import getOrderItemTitle from '../functions/getOrderItemTitle';
import lowerFirst from '../functions/lowerFirst';
import '../styling/NewProductGrid.css';

const NewProductPage = (props) => {

  const [department, setDepartment] = useState('appliances');

  const [info, setInfo] = useState({
    title: '',
    description: '',
    stock: '',
    price: '',
    photoURL: '',
  });

  const colorDefault = props.cardColor === 'white' ? 'black' : 'yellow';


  useEffect(() => {

    if (info.title.length > 20) {
      setInfo({
        ...info,
        title: info.title.substring(0, 20)
      })
    }

    let titleArr = info.title.split('');
    if (titleArr.includes('|')) {
      titleArr[titleArr.indexOf('|')] = '';
      setInfo({
        ...info,
        title: titleArr.join('').filter(item => item !== ''),
      });
    };

    if (titleArr.includes('~')) {
      titleArr[titleArr.indexOf('~')] = '';
      setInfo({
        ...info,
        title: titleArr.join('').filter(item => item !== ''),
      });
    }

  }, [info.title])

  const uploadProduct = async () => {

    if (info.price === 0) {
      return;
    };

    if (info.title === '') {
      return;
    };

    if (info.description === '') {
      return;
    };

    if (info.stock === 0) {
      return;
    };

    if (info.photoURL === '') {
      return;
    };

    await props.productsRef.doc(department).collection('products').doc(getOrderItemTitle(info.title)).set({
      currentlyOrdered: 0,
      description: info.description,
      photoURL: info.photoURL,
      price: info.price,
      stock: info.stock,
      title: info.title,
    }).then(() => {
      props.switchTab(department);
    })
  }

  return (
    <div className='page'>
      <h1 
        style={{
          textAlign: 'center',
          color: colorDefault,
        }}
      >
          Add a New Product
      </h1>
      <Grid 
        container 
        spacing={1} 
        rowSpacing={1}
        columns={12}
        justifyContent='center'
        alignContent='center'
        sx={{
          position: 'fixed',
          width: '60vw',
          left: '20vw',
          border: '1px solid red',
          height: '60vh',
          top: '35vh',
          padding: '0.5vh',
        }}
      >
        <Grid item md={4}>
          <FormControl>
            <InputLabel>
              Department
            </InputLabel>
            <Select
              value={department}
              label="Department"
              onChange={(e) => setDepartment(e.target.value)}
              sx={{
                color: colorDefault,
              }}
            >
              <MenuItem value={'appliances'}>Appliances</MenuItem>
              <MenuItem value={'clothing'}>Clothing</MenuItem>
              <MenuItem value={'electronics'}>Electronics</MenuItem>
              <MenuItem value={'furniture'}>Furniture</MenuItem>
              <MenuItem value={'outdoors'}>Outdoors</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={4}>
          <TextField 
            label='Product Name' 
            value={info.title} 
            onChange={(e) => setInfo({
              ...info,
              title: e.target.value
            })}
          />
        </Grid>
        <Grid item md={4} className='OneByTwo'>
          <TextField 
            label='Product Description'
            multiline
            rows={5}
            value={info.description} 
            onChange={(e) => setInfo({
              ...info,
              description: e.target.value
            })}
          />
        </Grid>
        <Grid item md={4} className='OneByOne'>
          <TextField
            label='Price'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={info.price}
            onChange={(e) => setInfo({
              ...info,
              price: e.target.value,
            })}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item md={4} className='OneByOne'>
          <TextField
            label='Stock'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={info.stock}
            onChange={(e) => setInfo({
              ...info,
              stock: e.target.value,
            })}
            InputProps={{
              startAdornment: <InputAdornment position="start">#</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item md={12} className='ThreeByOne'>
          <TextField 
            label='Product Image URL' 
            value={info.photoURL} 
            onChange={(e) => setInfo({
              ...info,
              photoURL: e.target.value
            })}
          />
        </Grid>
      </Grid>
      <Button
        onClick={() => uploadProduct()}
      >
        Upload Product
      </Button>
    </div>
  )
}

export default NewProductPage