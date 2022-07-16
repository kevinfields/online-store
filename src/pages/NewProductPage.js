
import { Box } from '@material-ui/core';
import { Alert, Button, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, {useState, useEffect} from 'react';
import getColor from '../functions/getColor';
import getOrderItemTitle from '../functions/getOrderItemTitle';
import goodPhotoURL from '../functions/goodPhotoURL';
import lowerFirst from '../functions/lowerFirst';
import '../styling/NewProductGrid.css';

const NewProductPage = (props) => {

  const [department, setDepartment] = useState('Department');
  const [departmentError, setDepartmentError] = useState(false);
  

  const [info, setInfo] = useState({
    title: '',
    description: '',
    stock: '',
    price: '',
    photoURL: '',
  });

  

  const textColor = getColor(props.themeSelect, 'text');
  const borderColor = getColor(props.themeSelect, 'border')
  const adornmentColor = getColor(props.themeSelect, 'text');
  

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
        if (errorArray[i].field === field) {
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

    if (department === 'Department' || department === 'Please select a department.') {
      errors.push({mess: 'department error', field: 'department'});
      setDepartmentError(true);
      setDepartment('Please select a department.');
    } else {
      setDepartmentError(false);
    }

    if (Number(info.price) <= 0) {
      errors.push({mess: 'The price must be a number greater than 0.', field: 'price'});
    };

    if (info.title.length <= 1) {
      errors.push({mess: 'Title is too short.', field: 'title'});
    };

    if (info.description.length <= 1) {
      errors.push({mess: 'The description must be at least two characters.', field: 'description'});
    };

    if (Number(info.stock) < 0) {
      errors.push({mess: 'The stock cannot be lower than 0.', field: 'stock'})
    };

    // if (!goodPhotoURL(info.photoURL)) {
    //   errors.push({mess: 'Please use a valid photo URL (.jpg, .jpeg, .png, .gif)', field: 'photoURL'})
    // };

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
          color: textColor,
        }}
      >
          Add a New Product
      </h1>
      <FormControl sx={{
        position: 'fixed',
        width: '62vw',
        paddingLeft: '1vw',
        paddingRight: '1vw',
        height: '55vh',
        paddingTop: '3vh',
        left: '18vw',
        top: '29vh',
        border: getColor(props.themeSelect, "border"),
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'start',
        justifyContent: 'space-between',
        gap: '2vw',
        color: textColor,
        boxShadow: `1px 1px 3px 3px ${getColor(props.themeSelect, 'box_shadow')}`,
        backgroundColor: getColor(props.themeSelect, 'card_background')
      }}>
        <Select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required={true}
          InputLabelProps={{ required: false, shrink: true, style: {color: textColor} }}
          sx={{
            width: '27vw',
            height: '8vh',
            color: textColor,
            border: `1px solid ${borderColor}`,
            "& .MuiSvgIcon-root": {
                fill: textColor
            },
            
          }}
        >
          <MenuItem 
            value={departmentError ? 'Please select a department.' : 'Department'} 
            disabled
          >
            {departmentError ? 'Please select a department.' : 'Department'}
          </MenuItem>
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
          InputLabelProps={{ required: false, shrink: true, style: {color: textColor} }}
          sx={{
            width: '27vw',
            height: '8vh',
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
          color='primary'
        />
        <TextField
          label='Stock'
          value={Number(info.stock)}
          type='number'
          required={true}
          InputLabelProps={{ required: false, style: {color: textColor} }}
          onChange={(e) => setInfo({
            ...info,
            stock: e.target.value,
          })}
          InputProps={{
            startAdornment: 
              <InputAdornment sx={{}} position="start">
                <div style={{color: adornmentColor}}>Qty</div>
              </InputAdornment>
          }}
          sx={{
            width: '16vw',
            height: '8vh',
            marginBottom: 'none',
            input: {
              color: textColor,
            },
            borderColor: borderColor,
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
        <TextField
          label='Price'
          type='number'
          required={true}
          InputLabelProps={{ required: false, style: {color: textColor} }}
          value={Number(info.price)}
          onChange={(e) => setInfo({
            ...info,
            price: Number(e.target.value),
          })}
          InputProps={{
            startAdornment: 
              <InputAdornment sx={{color: textColor}} position="start">
                <div style={{color: adornmentColor}}>$</div>
              </InputAdornment>
          }} 
          sx={{
            width: '16vw',
            height: '8vh',
            marginBottom: 'none',
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
        <TextField 
          label='Product Description'
          multiline
          rows={5} 
          required={true}
          InputLabelProps={{ required: false, shrink: true, style: {color: textColor} }}
          onChange={(e) => setInfo({
            ...info,
            description: e.target.value
          })}
          value={info.description}
          type='string'
          sx={{
            width: '20vw',
            height: '20vh',
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
          inputProps={{style: {color: textColor}}}
        />
        <TextField 
          label='Product Image URL' 
          value={info.photoURL.length > 0 ? info.photoURL : ''} 
          required={true}
          InputLabelProps={{ required: false, shrink: true, style: {color: textColor}  }}
          onChange={(e) => setInfo({
            ...info,
            photoURL: e.target.value
          })}
          sx={{
            width: '34vw',
            height: '8vh',
            marginTop: '-11.1vh',
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
        <img 
          src={info.photoURL} 
          alt={'Not Available'} 
          style={{
            width: '20vh',
            height: '20vh',
            border: `1px solid ${borderColor}`,
            position: 'fixed',
            left: '20vw',
            top: '66vh',
          }}
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