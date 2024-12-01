// Notification.js
import React  from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const Notification = ({ open, message, severity, onClose }) => {
  console.log(message, severity, " notification");
  
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // Close after 3 seconds
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position
    >
      <Alert onClose={onClose} variant='filled' severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
