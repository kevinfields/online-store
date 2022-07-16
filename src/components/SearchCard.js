import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader } from '@material-ui/core';
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
        maxHeight: '15vw',
        marginLeft: '2.5vw',
        marginRight: '2.5vw',
        marginTop: '2.5vh',
      }}
    >
    <Card>
      <CardHeader 
        title={props.item.product}
      />
      <CardContent children={`Department: ${props.item.department}`} />
      <CardContent children={`Score: ${props.item.score}`} />
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