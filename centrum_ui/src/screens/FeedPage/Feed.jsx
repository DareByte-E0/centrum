import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';
import FeedItem from './FeedItem';
import API_URL from '../../Config';

const Feed = () => {
  const [feedItems, setFeedItems] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/files`);
        
        if (response.data && Array.isArray(response.data.files)) {
          console.log(response.data.files)
          setFeedItems(response.data.files);
        } else {
          console.error('Response data does not contain an array', response.data);
          setFeedItems([]); 
        }
      } catch (error) {
        console.error('Error fetching feed items', error);
        setFeedItems([]); // Set to an empty array in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchFeedItems();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      {/* <Typography variant="h4" gutterBottom sx={{ color: '#f7dc6f'}}>professor library</Typography> */}
      {loading ? (
        <CircularProgress />
      ) : (
        feedItems.length > 0 ? (
          feedItems.map((item, index) => (
            <FeedItem key={index} item={item} />
          ))
        ) : (
          <Typography variant="body1">No feed items available.</Typography>
        )
      )}
    </Box>
  );
};

export default Feed;
