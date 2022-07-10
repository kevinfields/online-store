import { Button, Card, CardContent, CardHeader, CardMedia, TextField } from '@mui/material';
import {Edit, Save, Undo} from '@mui/icons-material';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import getColor from '../functions/getColor';
import capitalizeFirst from '../functions/lowerFirst';

const ProductEditorPage = (props) => {

  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState({
    open: false,
    field: '',
  })
  const [editableData, setEditableData] = useState({});

  const {id} = useParams();

  const textColor = getColor(props.themeSelect, 'text');
  const borderColor = getColor(props.themeSelect, 'border');

  const loadProductData = async () => {
    await props.productsRef.doc(id).get().then(doc => {
      setProductData(doc.data());
      setEditableData(doc.data());
      setLoading(false);
    })
  }

  const saveDetail = async () => {


    await props.productsRef.doc(id).set({
      ...editableData,
    });
    setEditor({
      field: '',
      open: false,
    })
    loadProductData();
  };

  const undoDetail = () => {
    
    setEditor({
      field: '',
      open: false,
    });
    setEditableData(productData);
  }

  useEffect(() => {
    loadProductData();
  }, [])

  return (
    <div className='page'>
      {
        loading ? <Loading /> :
        <Card 
          variant='outlined'
          sx={{
            width: '25vw',
            position: 'fixed',
            left: '37.5vw',
            margin: '5vh',
            backgroundColor: getColor(props.themeSelect, 'card_background'),
            color: getColor(props.themeSelect, 'text'),
            boxShadow: `1px 1px 3px 3px ${getColor(props.themeSelect, 'box_shadow')}`
          }}
        >
          { editor.open && editor.field === 'title' ?
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1vw',
              }}
            >
            <TextField
              value={productData.title}
              onChange={(e) => setEditableData({
                ...editableData,
                title: e.target.value
              })}
              type='string'
              required={true}
              InputLabelProps={{ required: false, shrink: true, style: {color: textColor} }}
              sx={{
                width: 'fit-content',
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
            />
            <Button
              variant='contained'
              color='primary'
              onClick={() => saveDetail()}
            >
              <Save />
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => undoDetail()}
            >
              <Undo />
            </Button>
            </div>
            :
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2vw',
              }}
            > 
              <CardHeader 
                title={productData.title} 
                sx={{textAlign: 'center'}} 
              />
              <Button 
                variant='contained'
                onClick={() => setEditor({open: true, field: 'title'})}
                sx={{
                  height: '3vw',
                  marginTop: '2vh',
                }}
              >
                <Edit />
              </Button>
            </div>
          }
          { editor.open && editor.field === 'description' ?
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1vw',
              }}
            >
            <TextField
              value={editableData.description}
              onChange={(e) => setEditableData({
                ...editableData,
                description: e.target.value
              })}
              type='string'
              required={true}
              InputLabelProps={{ required: false, shrink: true, style: {color: textColor} }}
              sx={{
                width: 'fit-content',
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
            />
            <Button
              variant='contained'
              color='primary'
              onClick={() => saveDetail()}
            >
              <Save />
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => undoDetail()}
            >
              <Undo />
            </Button>
            </div>
            :
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '2vw',
              }}
            > 
              <CardContent 
                children={productData.description}
              />
              <Button 
                variant='contained'
                onClick={() => setEditor({open: true, field: 'description'})}
                sx={{
                  height: '3vw',
                  marginTop: '2vh',
                }}
              >
                <Edit />
              </Button>
            </div>
          }
          <CardMedia
            sx={{
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              marginBottom: '2vh',
            }}
          >
            <img src={productData.photoURL} alt={productData.title} className='product-image'/>
          </CardMedia>
          <CardContent children={'Price: $' + productData.price} />
          <CardContent children={'Stock: ' + productData.stock} />
        </Card>
      }
    </div>
  )
}

export default ProductEditorPage