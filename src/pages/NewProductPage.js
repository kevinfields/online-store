
import { Alert, Button, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, {useState, useEffect} from 'react';
import getOrderItemTitle from '../functions/getOrderItemTitle';
import goodPhotoURL from '../functions/goodPhotoURL';
import lowerFirst from '../functions/lowerFirst';
import '../styling/NewProductGrid.css';

const NewProductPage = (props) => {

  const [department, setDepartment] = useState('appliances');
  

  const [info, setInfo] = useState({
    title: '',
    description: '',
    stock: 0,
    price: 0,
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

    const checkError = (errorArray, field) => {

      for (let i=0; i<errorArray.length; i++) {
        console.log('field: ' + field);
        if (errorArray[i].field === field) {
          console.log(errorArray[i].field + '=' + field);
          console.log('item.mess: ' + errorArray[i].mess)
          console.log('returning ' + [errorArray[i].mess, 'failed'])
          return [errorArray[i].mess, 'failed'];
        }
      } 
      switch (field) {
        case 'title':
          return [info.title, 'passed'];
        case 'description':
          return [info.description, 'passed'];
        case 'photoURL':
          return [info.photoURL, 'passed'];
        case 'stock':
          return [info.stock, 'passed'];
        case 'price':
          return [info.price, 'passed'];
        default: 
          return ['typeError', 'passed'];
      }
    }


    let errors = [];

    if (Number(info.price) <= 0) {
      errors.push({mess: 'The price must be a number greater than 0.', field: 'price'});
      console.log('price failed')
    };

    if (info.title.length <= 1) {
      errors.push({mess: 'Title is too short.', field: 'title'});
      console.log('name failed')
    };

    if (info.description.length <= 1) {
      errors.push({mess: 'The description must be at least two characters.', field: 'description'});
      console.log('description failed')
    };

    if (Number(info.stock) < 0) {
      errors.push({mess: 'The stock cannot be lower than 0.', field: 'stock'})
      console.log('stock failed')
    };

    if (!goodPhotoURL(info.photoURL)) {
      errors.push({mess: 'Please use a valid photo URL (.jpg, .jpeg, .png, .gif)', field: 'photoURL'})
      console.log('url failed')
    };

    if (errors.length > 0) {

      let titleErrors = checkError(errors, 'title');
      let descriptionErrors = checkError(errors, 'description');
      let stockErrors = checkError(errors, 'stock');
      let priceErrors = checkError(errors, 'price');
      let photoURLErrors = checkError(errors, 'photoURL');

      const newInfo = {
        title: titleErrors[1] === 'passed' ? info.title : titleErrors[0],
        description: descriptionErrors[1] === 'passed' ? info.description : descriptionErrors[0],
        stock: stockErrors[1] === 'passed' ? info.stock : stockErrors[0],
        price: priceErrors[1] === 'passed' ? info.price : priceErrors[0],
        photoURL: photoURLErrors[1] === 'passed' ? info.photoURL : photoURLErrors[0],
      }
      
      setInfo(newInfo);
      return;
    }

    console.log('did not fail.');

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
      <FormControl sx={{
        position: 'fixed',
        width: '60vw',
        height: '68vh',
        left: '20vw',
        top: '29vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5vh',
      }}>
        <InputLabel id='department-input-label'>Department</InputLabel>
        <Select
          value={department}
          label="Department"
          onChange={(e) => setDepartment(e.target.value)}
          labelId='department-input-label'
          required={true}
          InputLabelProps={{ required: false }}
        >
          <MenuItem value={'appliances'}>Appliances</MenuItem>
          <MenuItem value={'clothing'}>Clothing</MenuItem>
          <MenuItem value={'electronics'}>Electronics</MenuItem>
          <MenuItem value={'furniture'}>Furniture</MenuItem>
          <MenuItem value={'outdoors'}>Outdoors</MenuItem>
        </Select>
        <TextField 
          id='title-input' 
          value={info.title} 
          type='string'
          onChange={(e) => setInfo({
            ...info,
            title: e.target.value
          })}
          label='Product Name'
          required={true}
          InputLabelProps={{ required: false, shrink: true }}
          // placeholder={placeholders.title}
        />
        <TextField
          label='Stock'
          value={Number(info.stock)}
          type='number'
          required={true}
          InputLabelProps={{ required: false }}
          onChange={(e) => setInfo({
            ...info,
            stock: e.target.value,
          })}
          InputProps={{
            startAdornment: <InputAdornment position="start">Qty</InputAdornment>,
          }}
        />
        <TextField
          label='Price'
          type='number'
          required={true}
          InputLabelProps={{ required: false }}
          value={Number(info.price)}
          onChange={(e) => setInfo({
            ...info,
            price: Number(e.target.value),
          })}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }} 
          // placeholder={placeholders.price}
        />
        <TextField 
          label='Product Description'
          multiline
          rows={5} 
          required={true}
          InputLabelProps={{ required: false, shrink: true }}
          onChange={(e) => setInfo({
            ...info,
            description: e.target.value
          })}
          value={info.description}
          type='string'
          // placeholder={placeholders.description}
        />
        <TextField 
          label='Product Image URL' 
          value={info.photoURL.length > 0 ? info.photoURL : null} 
          required={true}
          InputLabelProps={{ required: false, shrink: true }}
          onChange={(e) => setInfo({
            ...info,
            photoURL: e.target.value
          })}
          // placeholder={placeholders.photoURL}
        />
      </FormControl>
      <Button
        onClick={() => uploadProduct()}
        sx={{
          position: 'fixed',
          left: '65vw',
          top: '21vh',
        }}
        variant='contained'
      >
        Upload Product
      </Button>
    </div>
  )
}

export default NewProductPage