import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function UploadFail({ open, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
    >
      <Alert
        onClose={onClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        Oops.. Upload failed!, Try again later.
      </Alert>
    </Snackbar>
  );
}
