import React from 'react';
import { Box, Button, Typography, List, ListItem } from '@mui/material';
import ReactPlayer from 'react-player';
import { useDropzone } from 'react-dropzone';
import { IoCloseCircleOutline } from 'react-icons/io5'; // Import the remove icon

const FileUploadComponent = () => {
  const { getRootProps, getInputProps } = useDropzone();
  const [files, setFiles] = React.useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleDone = () => {
    // Implement logic for what happens when "Done" or "Submit" is clicked
    console.log("Files uploaded:", files);
    // Example: Call API to upload files, navigate to next step, etc.
  };

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
        <input {...getInputProps({ onChange: handleFileChange })} />
        <Typography>Drag & drop files here, or click to select files</Typography>
      </Box>
      <Button variant="contained" onClick={() => document.querySelector('input[type="file"]').click()}>
        Upload Files
      </Button>
      <List>
        {files.map((file, index) => (
          <ListItem key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <Typography>{file.name}</Typography>
              {file.type.startsWith('video/') && <ReactPlayer url={URL.createObjectURL(file)} controls />}
              {file.type.startsWith('audio/') && <ReactPlayer url={URL.createObjectURL(file)} controls />}
            </div>
            <Button onClick={() => handleRemoveFile(index)} sx={{ p: 1 }}>
              <IoCloseCircleOutline style={{ fontSize: 24 }} />
            </Button>
          </ListItem>
        ))}
      </List>
      {files.length > 0 && (
        <Button variant="contained" onClick={handleDone} sx={{ mt: 2 }}>
          Done
        </Button>
      )}
    </Box>
  );
};

export default FileUploadComponent;
