import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, List, ListItem } from '@mui/material';
import ReactPlayer from 'react-player';

const Portal = () => {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        border: '2px dashed #ccc',
        padding: 4,
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Box {...getRootProps()} sx={{ cursor: 'pointer', marginBottom: 2 }}>
        <input {...getInputProps()} />
        <Typography>Drag & drop files here, or click to select files</Typography>
      </Box>
      <Button variant="contained" onClick={() => document.querySelector('input[type="file"]').click()}>
        Upload Files
      </Button>
      <List>
        {files.map((file, index) => (
          <ListItem key={index}>
            <Typography>{file.name}</Typography>
            {file.type.startsWith('video/') && <ReactPlayer url={URL.createObjectURL(file)} controls />}
            {file.type.startsWith('audio/') && <ReactPlayer url={URL.createObjectURL(file)} controls />}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Portal;
