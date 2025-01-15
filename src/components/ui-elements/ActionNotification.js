import {react as React} from 'react';
import { Snackbar, Button, Alert } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

const ActionNotification = ({ open, handleClose, message , severity}) => {




    console.log(message, severity,handleClose, " notification action sample");

    return (
        <>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      </>
    );
};

export default ActionNotification