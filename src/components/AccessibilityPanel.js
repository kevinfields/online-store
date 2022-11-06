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
        >
          Make Text Bigger
        </Button>
        <Button 
          onClick={() => props.adjustTextSize(false)}>
          Make Text Smaller
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