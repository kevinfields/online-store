import { Button, Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import { Typography } from '@mui/material';
import React from 'react';
import getColor from '../functions/getColor';

const SearchCard = (props) => {

  const viewInStore = () => {
    switch (props.item.department) {
      case 'appliances':
        props.viewInStore(4);
        break;
      case 'clothing':
        props.viewInStore(1);
        break;
      case 'electronics':
        props.viewInStore(3);
        break;
      case 'furniture':
        props.viewInStore(2);
        break;
      case 'outdoors':
        props.viewInStore(5);
        break;
      default:
        break;
    }
  }

  return (
    <div 
      style={{
        color: getColor(props.themeSelect, 'text'),
        backgroundColor: getColor(props.themeSelect, 'card_background'),
        boxShadow: `1px 1px 3px 3px ${getColor(props.themeSelect, 'box_shadow')}`,
        width: '15vw',
        height: 'fit-content',
        marginLeft: '2.5vw',
        marginRight: '2.5vw',
        marginTop: '2.5vh',
        padding: '0px',
      }}
    >
      <Card>
        <CardHeader 
          title={props.item.product}
        />
        <CardContent children={`Department: ${props.item.department}`} />
        <CardContent>
          <Typography
            sx={{
              color: getColor(props.themeSelect, 'success')
            }}
          >
            {`Result Strength: ${props.item.score} / ${props.item.maxScore}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button 
            onClick={() => viewInStore(props.item.department)}
            variant='contained'
            color='secondary'
          >
            View In Store
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default SearchCard