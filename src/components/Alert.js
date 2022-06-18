import React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const Alert = (props) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    props.onClose();
  }

  return (
    <Modal 
      open={props.open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.header}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.description}
        </Typography>
        {props.onAccept ? 
          <>
            <Button
              onClick={() => props.onAccept()}
            >
              Confirm
            </Button>
            <Button 
              onClick={() => props.onClose()}
            >
              Deny
            </Button>
          </>
        : null} 
      </Box>
    </Modal>
  )
}

export default Alert