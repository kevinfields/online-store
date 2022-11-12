import { Button } from '@mui/material';
import React from 'react'
import '../styling/AccessibilityPanel.css';

const AccessibilityPanel = (props) => {
  return (
    <div className='accessibility-panel'>
      <h4 className='accessibility-header'>Accessibilty</h4>
      <div className='accessibility-row'>
        <Button 
          onClick={() => props.adjustTextSize(true)}
          className='accessibility-button'
          variant='contained'
          color='primary'
        >
          Bigger Text
        </Button>
        <Button 
          onClick={() => props.adjustTextSize(false)}
          className='accessibility-button'
          variant='contained'
          color='secondary'
        >
          Smaller Text
        </Button>
      </div>
      <div className='accessibility-row'>
        <Button
          onClick={() => props.adjustTextSpacing(true)}
          className='accessibility-button'
          variant='contained'
          color='primary'
        >
          Spread Out Text
        </Button>
        <Button
          onClick={() => props.adjustTextSpacing(false)}
          className='accessibility-button'
          variant='contained'
          color='secondary'
        >
          Bring Together Text
        </Button>
      </div>
      <Button
        variant='contained'
        color='error'
        className='close-accessibility-button'
        onClick={() => props.onClose()}
      >
          Close
      </Button>
    </div>
  )
}

export default AccessibilityPanel