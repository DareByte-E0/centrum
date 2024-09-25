import React, { useState, lazy, Suspense } from 'react';
import { Box, Button, Typography, List, ListItem } from '@mui/material';
import ReactPlayer from 'react-player';
import { useDropzone } from 'react-dropzone';
import { IoCloseCircleOutline } from 'react-icons/io5';
import axios from 'axios';
import API_URL from '../../Config';
import './portal.css';

const FileUploadLoader = lazy(() => import('../Loaders/FileUploadLoader'));
const UploadSuccess = lazy(() => import('../SnackBar/UploadSuccess'));
const UploadFail = lazy(() => import('../SnackBar/UploadFail'));

const Portal = () => {
  const { getRootProps, getInputProps } = useDropzone();
  const [files, setFiles] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadFail, setUploadFail] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    const newFileData = newFiles.map(file => ({ file, title: '', description: '' }));
    setFiles([...files, ...newFiles]);
    setFileData([...fileData, ...newFileData]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    const updatedFileData = [...fileData];
    updatedFiles.splice(index, 1);
    updatedFileData.splice(index, 1);
    setFiles(updatedFiles);
    setFileData(updatedFileData);
  };

  const handleFileInfoChange = (index, key, value) => {
    const updatedFileData = [...fileData];
    updatedFileData[index] = { ...updatedFileData[index], [key]: value };
    setFileData(updatedFileData);
  };

  const handleDone = async () => {
    setIsLoading(true);

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
      formData.append(`title`, fileData[index].title);
      formData.append(`description`, fileData[index].description);
    });

    try {
      await axios.post(`${API_URL}/upload_files`, formData);
      setFiles([]);
      setFileData([]);
      setUploadSuccess(true);
    } catch (error) {
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
      <Suspense fallback={<div>Upload failed</div>}>
        <UploadFail open={uploadFail} onClose={() => setUploadFail(false)} />
      </Suspense>
      <Suspense fallback={<div>Upload success...</div>}>
        <UploadSuccess open={uploadSuccess} onClose={() => setUploadSuccess(false)} />
      </Suspense>
      
      {!isLoading && (
        <>
          <Box {...getRootProps()} sx={{ cursor: 'pointer', marginBottom: 2 }}>
            <input {...getInputProps({ onChange: handleFileChange })} />
            <Typography>Drag & drop files here, or click to select files</Typography>
          </Box>
          <Button variant="contained" onClick={() => document.querySelector('input[type="file"]').click()}>
            Choose Files
          </Button>
          <List className='content-list'>
            {fileData.map((data, index) => (
              <ListItem className='content-post' key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Typography>{data.file.name}</Typography>
                  {data.file.type.startsWith('video/') && <ReactPlayer url={URL.createObjectURL(data.file)} controls width="100%" />}
                  {data.file.type.startsWith('audio/') && <ReactPlayer url={URL.createObjectURL(data.file)} controls />}
                  <div className='contain-con-img'>
                    {data.file.type.startsWith('image/') && <img className='content-img' src={URL.createObjectURL(data.file)} alt={data.file.name} />}
                  </div>
                </div>
                <div className='content-form'>
                  <form action="">
                  <input
                    type='text'
                    placeholder='title'
                    value={data.title}
                    onChange={(e) => handleFileInfoChange(index, 'title', e.target.value)}
                  />
                  <textarea
                    placeholder='description'
                    value={data.description}
                    onChange={(e) => handleFileInfoChange(index, 'description', e.target.value)}
                  />
                
                  </form>
                </div>
                  
                <Button onClick={() => handleRemoveFile(index)} sx={{ p: 1 }}>
                  <IoCloseCircleOutline style={{ fontSize: 24 }} />
                </Button>
              </ListItem>
            ))}
          </List>
          {fileData.length > 0 && (
            <Button variant="contained" onClick={handleDone} sx={{ mt: 2 }}>
              Done
            </Button>
          )}
        </>
      )}

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
          <Suspense fallback={<div>Loading...</div>}>
            <FileUploadLoader />
          </Suspense>
        </Box>
      )}
    </Box>
  );
};

export default Portal;
