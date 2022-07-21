import { Button, Card, CardContent, CardHeader, CardMedia, TextField } from '@mui/material';
import {Edit, Save, Undo} from '@mui/icons-material';
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  const navigate = useNavigate();

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

  const viewDepartmentPage = () => {

    props.openDepartmentPage();
    navigate('/');
  }

  const openSelector = () => {

    props.openSelector();
    navigate('/');
  }

  useEffect(() => {
    loadProductData();
  }, [])

  return (
    <div className='page'>
      {
        loading ? <Loading /> :
        <div>
          <div>
            <Button 
              onClick={() => viewDepartmentPage()}
              sx={{
                position: 'fixed',
                width: '10vw',
                left: '40vw',
                height: '10vh',
                top: '10vh',
              }}
              color='primary'
              variant='contained'
            >
              Show in Store.
            </Button>
            <Button
              onClick={() => openSelector()}
              sx={{
                position: 'fixed',
                width: '10vw',
                left: '55vw',
                height: '10vh',
                top: '10vh',
              }}
              color='primary'
              variant='contained'
            >
              Return to Product Selector
            </Button>
          </div>
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
              value={editableData.title}
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
                    borderColor: borderColor,
                  }
                },
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: borderColor,
                  }
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    borderColor: borderColor,
                  }
                },
              }}
            />
            <Button
              variant='contained'
              color='primary'
              size='small'
              onClick={() => saveDetail()}
            >
              <Save />
            </Button>
            <Button
              variant='contained'
              color='error'
              size='small'
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
                size='small'
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
              size='small'
            >
              <Save />
            </Button>
            <Button
              variant='contained'
              color='error'
              size='small'
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
                sx={{
                  height: '8vh',
                  overflowY: 'scroll',
                }}
              />
              <Button 
                variant='contained'
                size='small'
                onClick={() => setEditor({open: true, field: 'description'})}
                sx={{
                  height: '3vw',
                  marginTop: '2vh',
                  marginBottom: '2vh',
                  marginRight: '1vw',
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
          { editor.open && editor.field === 'photoURL' ?
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1vw',
              }}
            >
              <TextField
                value={editableData.photoURL}
                onChange={(e) => setEditableData({
                  ...editableData,
                  photoURL: e.target.value
                })}
                type='string'
                required={true}
                InputLabelProps={{ required: false, shrink: true, style: {color: textColor} }}
                sx={{
                  width: '10vw',
                  overflowX: 'scroll',
                  overflowY: 'hidden',
                  whiteSpace: 'no-wrap',
                  marginLeft: '1vw',
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
              size='small'
            >
              <Save />
            </Button>
            <Button
              variant='contained'
              color='error'
              size='small'
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
              children={productData.photoURL}
              sx={{
                width: '15vw',
                height: '7vh',
                overflowX: 'scroll',
                overflowY: 'hidden',
                whiteSpace: 'no-wrap',
                marginLeft: '1vw',
                marginTop: '-1vh',
                lineHeight: '8vh',
              }}
            />
              <Button 
                variant='contained'
                size='small'
                onClick={() => setEditor({open: true, field: 'photoURL'})}
                sx={{
                  height: '3vw',
                  marginTop: '2vh',
                  marginBottom: '2vh',
                  marginRight: '1vw',
                }}
              >
                <Edit />
              </Button>
            </div>
          }
          { editor.open && editor.field === 'price' ?
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1vw',
              }}
            >
              <TextField
                value={editableData.price}
                onChange={(e) => setEditableData({
                  ...editableData,
                  price: e.target.value
                })}
                type='number'
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
                size='small'
              >
                <Save />
              </Button>
              <Button
                variant='contained'
                color='error'
                size='small'
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
                children={`Price: $${productData.price}`}
              />
              <Button 
                variant='contained'
                size='small'
                onClick={() => setEditor({open: true, field: 'price'})}
                sx={{
                  height: '3vw',
                  marginTop: '2vh',
                  marginBottom: '2vh',
                }}
              >
                <Edit />
              </Button>
            </div>
          }
          { editor.open && editor.field === 'stock' ?
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1vw',
              }}
            >
              <TextField
                value={editableData.stock}
                onChange={(e) => setEditableData({
                  ...editableData,
                  stock: e.target.value
                })}
                type='number'
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
                size='small'
              >
                <Save />
              </Button>
              <Button
                variant='contained'
                color='error'
                size='small'
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
                children={`Stock: ${productData.stock}`}
              />
              <Button 
                variant='contained'
                size='small'
                onClick={() => setEditor({open: true, field: 'stock'})}
                sx={{
                  height: '3vw',
                  marginTop: '2vh',
                  marginBottom: '2vh',
                }}
              >
                <Edit />
              </Button>
            </div>
          }
        </Card>
        </div>
      }
    </div>
  )
}

export default ProductEditorPage