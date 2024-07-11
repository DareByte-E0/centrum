import React from 'react';
import { Box, Button, Typography, List, ListItem } from '@mui/material';
import ReactPlayer from 'react-player';
import { useDropzone } from 'react-dropzone';
import { IoCloseCircleOutline } from 'react-icons/io5';
import axios from 'axios';
import API_URL from '../../Config';
import FileUploadLoader from '../Loaders/FileUploadLoader';
import UploadSuccess from '../SnackBar/UploadSuccess';
import UploadFail from '../SnackBar/UploadFail';

const Portal = () => {
  const { getRootProps, getInputProps } = useDropzone();
  const [files, setFiles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false); 
  const [uploadFail, setUploadFail] = React.useState(false);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleDone = async () => {
    setIsLoading(true);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const req = await axios.post(`${API_URL}/upload_files`, formData);
      setFiles([]);
      console.log(req);
      setUploadSuccess(true);
    } catch(error) {
      setUploadFail(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        border: '2px dashed #ccc',
        padding: 4,
        borderRadius: 2,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Upload Box */}
      <UploadFail open={uploadFail} onClose={() => setUploadFail(false)} />
      <UploadSuccess open={uploadSuccess} onClose={() => setUploadSuccess(false)} />
      
      {!isLoading && (
        <>
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
        </>
      )}

      {/* Loading Component */}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FileUploadLoader />
        </Box>
      )}
    </Box>
  );
};

export default Portal;
