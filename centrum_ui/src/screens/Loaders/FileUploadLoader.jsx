import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const FileUploadLoader = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 2,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <CircularProgress color="primary" size={40} />
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default FileUploadLoader;
