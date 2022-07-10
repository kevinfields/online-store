import { Button, FormControl, MenuItem, Select, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import getColor from '../functions/getColor'

const EditProductPage = (props) => {


  const [department, setDepartment] = useState('Department');
  const [products, setProducts] = useState([]);
  const [loadedProducts, setLoadedProducts] = useState({
    appliances: [],
    electronics: [],
    outdoors: [],
    clothing: [],
    furniture: [],
  });
  const [selectedProduct, setSelectedProduct] = useState('');
  const navigate = useNavigate();

  const textColor = getColor(props.themeSelect, 'text');
  const borderColor = getColor(props.themeSelect, 'border');
  const shadowColor = getColor(props.themeSelect, 'box_shadow');
  const cardColor = getColor(props.themeSelect, 'card_background');


  const loadProducts = async (department) => {

    let catcher = [];
    await props.departmentsRef.doc(department).collection('products').get().then(snap => {
      snap.forEach(doc => {
        catcher.push(doc.id);
      })
    });

    setProducts(catcher);

    switch (department) {
      case 'appliances':
        setLoadedProducts({
          ...loadedProducts,
          appliances: catcher,
        });
        break;
      case 'electronics':
        setLoadedProducts({
          ...loadedProducts,
          electronics: catcher,
        });
        break;
      case 'clothing':
        setLoadedProducts({
          ...loadedProducts,
          appliances: catcher,
        });
        break;
      case 'furniture':
        setLoadedProducts({
          ...loadedProducts,
          furniture: catcher,
        })
        break;
      case 'outdoors':
        setLoadedProducts({
          ...loadedProducts,
          outdoors: catcher,
        });
        break;
      default:
        break;
    }
  }

  useEffect(() => {

    //call server and load products for newly selected department, 
    //unless it has already been done for that department

    switch (department) {
      case 'appliances':
        if (loadedProducts.appliances.length === 0) {
          loadProducts('appliances');
        } else {
          setProducts(loadedProducts.appliances);
        };
        break;
      case 'clothing':
        if (loadedProducts.clothing.length === 0) {
          loadProducts('clothing');
        } else {
          setProducts(loadedProducts.clothing);
        };
        break;
      case 'electronics':
        if (loadedProducts.electronics.length === 0) {
          loadProducts('electronics');
        } else {
          setProducts(loadedProducts.electronics);
        };
        break;
      case 'furniture':
        if (loadedProducts.furniture.length === 0) {
          loadProducts('furniture');
        } else {
          setProducts(loadedProducts.furniture);
        };
        break;
      case 'outdoors':
        if (loadedProducts.outdoors.length === 0) {
          loadProducts('outdoors');
        } else {
          setProducts(loadedProducts.outdoors);
        };
        break;
      default:
        break;
    }

  }, [department])

  const openProduct = (deparment, product) => {
    navigate(`/${department}/${product}`);
  }

  return (
    <div className='page'>
      <h2 
        style={{
          color: getColor(props.themeSelect, 'text'),
          textAlign: 'center',
        }}
      >
        Choose a product to edit:
      </h2>
      <FormControl sx={{
        position: 'fixed',
        width: '62vw',
        paddingLeft: '1vw',
        paddingRight: '1vw',
        height: '35vh',
        paddingTop: '3vh',
        left: '18vw',
        top: '29vh',
        border: borderColor,
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'start',
        justifyContent: 'space-between',
        gap: '2vw',
        color: textColor,
        boxShadow: `1px 1px 3px 3px ${shadowColor}`,
        backgroundColor: cardColor,
      }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '5vw',
          }}
        >
          <Typography color='primary'>Select a Department</Typography>
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
            <MenuItem value={'Department'} disabled>{'Department'}</MenuItem>
            <MenuItem value={'appliances'}>Appliances</MenuItem>
            <MenuItem value={'clothing'}>Clothing</MenuItem>
            <MenuItem value={'electronics'}>Electronics</MenuItem>
            <MenuItem value={'furniture'}>Furniture</MenuItem>
            <MenuItem value={'outdoors'}>Outdoors</MenuItem>
          </Select>
        </div>
        
        {
          department !== 'Department' ?
          <div
            style={{
              display: 'flex',
              flexDircetion: 'row',
              gap: '5vw',
            }}
          >
            <Typography color='primary'>Select a Product: </Typography>
            <Select 
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
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
              {products.map(item => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </div>
        : null }
        <Button
          onClick={() => openProduct(department, selectedProduct)}
          variant='contained'
        >
          Edit {selectedProduct}
        </Button>
      </FormControl>
    </div>
  )
}

export default EditProductPage