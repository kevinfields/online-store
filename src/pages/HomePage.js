import { AccountCircle, BeachAccess, Close, Computer, ComputerTwoTone, DarkMode, LightMode, Schedule, Search, ShoppingCart, WbTwilightSharp } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccessibilityPanel from '../components/AccessibilityPanel';
import Navbar from '../components/Navbar';
import getColor from '../functions/getColor';


const HomePage = (props) => {
  

  const [openedTab, setOpenedTab] = useState(props.openedTab);
  const [searchBar, setSearchBar] = useState(false);
  const [accessPanel, setAccessPanel] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  const borderColor = getColor(props.themeSelect, props.themeSelect !== 'day' ? 'border' : 'text');
  const textColor = getColor(props.themeSelect, 'text');
  const backgroundColor = getColor(props.themeSelect, 'card_background');

  const changeTheme = (mode) => {
    props.onThemeChange(mode);
  }

  const changeOpenedTab = (num) => {
    setOpenedTab(num)
  }

  const openSearchBar = () => {
    setSearch('');
    setSearchBar(true);
    window.addEventListener('keydown', enterHandler);
  }

  const closeSearchBar = () => {
    setSearch('');
    setSearchBar(false);
    window.removeEventListener('keydown', enterHandler);
  }

  const submitSearch = () => {

    if (search === '') {
      return;
    }
    navigate(`/search/${search}`);
    setSearchBar(false);
    window.removeEventListener('keydown', enterHandler);
  }

  const enterHandler = (e) => {
    if (e.key === 'Enter') {
      submitSearch();
    }
  };



  return (
    <div style={{fontSize: `${props.textSize}pt`}}>
      <Navbar 
        firestore={props.firestore} 
        user={props.user} 
        auth={props.auth} 
        loggedIn={props.loggedIn} 
        cardColor={props.cardColor} 
        themeSelect={props.themeSelect}
        openedTab={openedTab}
        setLoginTab={() => changeOpenedTab(0)}
        changeOpenedTab={(num) => changeOpenedTab(num)}
        outOfStockRef={props.firestore.collection('out_of_stock')}
        textSize={props.textSize}
      />
      { !searchBar ?
        <Button
          onClick={() => openSearchBar()}
          sx={{
            position: 'fixed',
            right: '50vw',
            top: '2.5vh',
          }}
        >
          <Search color='info' />
        </Button>
      : 
        <>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type='string'
            required={true}
            InputLabelProps={{ required: false, shrink: true, style: {color: textColor}}}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Search 
                    sx={{
                      "&:hover": {
                        cursor: 'pointer'
                      }
                    }}
                    color='info'
                    onClick={() => submitSearch()}
                  />
                  <Close 
                    sx={{
                      "&:hover": {
                        cursor: 'pointer'
                      },
                      marginLeft: '1vw',
                    }}
                    color='error' 
                    onClick={() => closeSearchBar()} 
                  />
                </InputAdornment>
              )
            }}
            sx={{
              position: 'fixed',
              right: '50vw',
              top: '2.5vh',
              width: '22.5vw',
              zIndex: '1',
              backgroundColor: backgroundColor,
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
        </>
      }
      <Button
        onClick={() => changeTheme('cyber')}
        sx={{
          position: 'fixed',
          right: '45vw',
          top: '2.5vh',
          border: props.themeSelect === 'cyber' ? `1px solid ${getColor(props.themeSelect, 'border')}` : 'none',
          boxShadow: props.themeSelect === 'cyber' ? `3px 3px ${getColor(props.themeSelect, 'box_shadow')}` : 'none'
        }}
      >
        <Computer color='info'/>
      </Button>
      <Button
        onClick={() => changeTheme('synth')}
        sx={{
          position: 'fixed',
          right: '40vw',
          top: '2.5vh',
          border: props.themeSelect === 'synth' ? `1px solid ${getColor(props.themeSelect, 'border')}` : 'none',
          boxShadow: props.themeSelect === 'synth' ? `2px 2px ${getColor(props.themeSelect, 'box_shadow')}` : 'none'
        }}>
          <WbTwilightSharp color='info' />
        </Button>
      <Button
        onClick={() => changeTheme('day')}
        sx={{
          position: 'fixed',
          right: '35vw',
          top: '2.5vh',
          border: props.themeSelect === 'day' ? `1px solid ${getColor(props.themeSelect, 'border')}` : 'none',
          boxShadow: props.themeSelect === 'day' ? `2px 2px ${getColor(props.themeSelect, 'box_shadow')}` : 'none'
        }}
      >
        <LightMode color='info' />
      </Button>
      <Button
        onClick={() => changeTheme('night')}
        sx={{
          position: 'fixed',
          right: '30vw',
          top: '2.5vh',
          border: props.themeSelect === 'night' ? `1px solid ${getColor(props.themeSelect, 'border')}` : 'none',
          boxShadow: props.themeSelect === 'night' ? `2px 2px ${getColor(props.themeSelect, 'box_shadow')}` : 'none'
        }}
      >
        <DarkMode color='info' />
      </Button>
      <Button
        onClick={() => changeTheme('blue')}
        sx={{
          position: 'fixed',
          right: '25vw',
          top: '2.5vh',
          border: props.themeSelect === 'blue' ? `1px solid ${getColor(props.themeSelect, 'border')}` : 'none',
          boxShadow: props.themeSelect === 'blue' ? `2px 2px ${getColor(props.themeSelect, 'box_shadow')}` : 'none'
        }}
      >
        <ComputerTwoTone color='info' />
      </Button>
      <Button
        onClick={() => changeTheme('sunrise')}
        sx={{
          position: 'fixed',
          right: '20vw',
          top: '2.5vh',
          border: props.themeSelect === 'sunrise' ? `1px solid ${getColor(props.themeSelect, 'border')}` : 'none',
          boxShadow: props.themeSelect === 'sunrise' ? `2px 2px ${getColor(props.themeSelect, 'box_shadow')}` : 'none'
        }}
      >
        <BeachAccess color='info' />
      </Button>
      { props.user ?
      <>
        <Button
          onClick={() => setOpenedTab(6)}
          sx={{
            position: 'fixed',
            right: '15vw',
            top: '2.5vh',
          }}
        >
          <ShoppingCart color='primary' />
        </Button>
        <Button
          onClick={() => setOpenedTab(7)}
          sx={{
            position: 'fixed',
            right: '10vw',
            top: '2.5vh',
          }}
        >
          <Schedule color='primary' />
        </Button>
        <Button
          onClick={() => setOpenedTab(8)}
          sx={{
            position: 'fixed',
            right: '5vw',
            top: '2.5vh',
          }}
        >
          <AccountCircle color='primary' />
        </Button>
      </>
      
       : null
      }
      { accessPanel ?
        <AccessibilityPanel 
          adjustTextSize={(dir) => props.adjustTextSize(dir)}
          adjustTextSpacing={(dir) => props.adjustTextSpacing(dir)}
          onClose={() => setAccessPanel(false)}
        />
        :
        <Button
          onClick={() => setAccessPanel(true)}
          sx={{
            color: textColor,
            width: '8em',
            height: '5em',
            backgroundColor: backgroundColor,
            borderStyle: `1px solid ${borderColor}`,
            position: 'fixed',
            right: '5vw',
            top: '20vh',
          }}
        >
          Open Accessibility
        </Button>
      }
    </div>
  );
};

export default HomePage;
