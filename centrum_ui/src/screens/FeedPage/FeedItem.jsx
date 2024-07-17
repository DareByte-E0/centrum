import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box, Button } from '@mui/material';
import ReactPlayer from 'react-player';
import { styled } from '@mui/system';
import API_URL from '../../Config';
import { useNavigate } from 'react-router-dom';

const FeedItem = ({ item }) => {

  const [isPlaying, setIsPlaying] = React.useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    window.location.href = `${API_URL}/${encodeURIComponent(item.path)}`;
  };


  const StyledReactPlayer = styled(ReactPlayer)({
    cursor: 'pointer',
    '&:hover': {
      cursor: 'pointer',
    },
  });

  const handleThumbnailClick = () => {
    setIsPlaying(true);
  };

  return (
    <Card sx={{ 
      marginBottom: 2, 
      borderRadius: 5, 
      position: 'relative',
      bgcolor: '#3f5979',
      color: '#FFFFFF', 
      overflow: 'hidden', '&:hover .overlay': { opacity: 1 } }}>
      <CardContent sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant="h5" gutterBottom>{item.originalName.split('.')[0]}</Typography>
        <Typography variant="body2" color="textSecondary">{item.type}</Typography>
      </CardContent>


      {item.type === 'video' && (
          <StyledReactPlayer url={`${API_URL}/${item.path}`} controls width="100%" playing />
        )
      }


      {item.type === 'audio' && (
        <ReactPlayer url={item.path} controls width="100%" height="50px" />
      )}


      {item.type === 'image' && (
        <>
          <CardMedia
            component="img"
            image={`${API_URL}/${item.thumbnailPath}`}
            alt={item.originalName}
            sx={{ maxHeight: 300, 
              height: 'auto', 
              padding: 1.2, 
              objectFit: 'none',
              borderRadius: 8, 
              transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'scale(1.05)' } }}
          />
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          >
            <Typography variant="h5">{item.originalName}</Typography>
            <Typography variant="body2">{item.type}</Typography>
          </Box>
        </>
      )}


      {item.type === 'application' && (
        <Card sx={{
          boxShadow: 3,
          borderRadius: 2,
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: 9,
          },
          maxWidth: 345,
          margin: 'auto',
        }}>
          <CardMedia
            component="img"
            image={`${API_URL}/${item.thumbnailPath}`}
            alt={item.originalName}
            sx={{
              height: 200,
              objectFit: 'none',
              borderRadius: '8px 8px 0 0',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <CardContent sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
          }}>
            <Typography variant="body1" sx={{ 
              fontWeight: 'bold', 
              textAlign: 'center',
              marginBottom: 1,
            }}>
              {item.originalName}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOpen}>
            Open Document
          </Button>
          </CardContent>
        </Card>
      )}
      
      
    </Card>
  );
};

export default FeedItem;
