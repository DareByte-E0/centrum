import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import ReactPlayer from 'react-player';
import { styled } from '@mui/system';
import API_URL from '../../Config';

const FeedItem = ({ item }) => {

  const [isPlaying, setIsPlaying] = React.useState(false);

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
              objectFit: 'fill',
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
        <CardContent sx={{
          boxShadow: 3,
          borderRadius: 8,
          padding: 2,
          transition: 'box-shadow 0.3s ease-in-out', // Optional: Add transition for box-shadow
          '&:hover': {
            boxShadow: 9, // Optional: Increase box-shadow on hover
          },
        }}>
          <Typography variant="body1">{item.originalName}</Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default FeedItem;
