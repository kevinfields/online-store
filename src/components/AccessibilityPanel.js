import React from 'react'

const AccessibilityPanel = (props) => {
  return (
    <div className='accessibility-panel'>
      <h4>Accessibilty</h4>
      <button onClick={() => props.adjustTextSize(true)}>Make Text Bigger</button>
      <button onClick={() => props.adjustTextSize(false)}>Make Text Smaller</button>
    </div>
  )
}

export default AccessibilityPanel