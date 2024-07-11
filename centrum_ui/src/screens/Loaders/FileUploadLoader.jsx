import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const FileUploadLoader = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        // backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backgroungColor: 'blue',
        padding: 2,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
     
      <Box sx={{ width: '100%' }}>
        <LinearProgress color="success" />
      </Box>
      
      <Typography variant="h6" color="black" sx={{ marginTop: 2 }} >
        Upload in progress...
      </Typography>
    </Box>
  );
};

export default FileUploadLoader;
