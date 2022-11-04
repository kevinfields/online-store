import { Button } from '@mui/material';
import React from 'react'
import '../styling/AccessibilityPanel.css';

const AccessibilityPanel = (props) => {
  return (
    <div className='accessibility-panel'>
      <h4 className='accessibility-header'>Accessibilty</h4>
      <Button 
        onClick={() => props.adjustTextSize(true)}
      >
        Make Text Bigger
      </Button>
      <Button 
        onClick={() => props.adjustTextSize(false)}>
        Make Text Smaller
      </Button>
      <Button
        variant='contained'
        className='close-accessibility-button'
        onClick={() => props.onClose()}
      >
          Close
      </Button>
    </div>
  )
}

export default AccessibilityPanel