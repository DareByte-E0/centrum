import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';
import API_URL from '../../Config';
import './filter.css'

const Filter = lazy(() => import('./Filter'));
const FeedItem = lazy(() => import('./FeedItem'));
const SearchFeed = lazy(() => import('./SearchFeed'));
const SearchDialog = lazy(() => import('./SearchDialog'));


const Feed = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    video: true,
    audio: true,
    image: true,
    application: true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFeedItems = async (search = '') => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/files`, {
          params: {
            search: search,
          },
        });
        if (response.data && Array.isArray(response.data.files)) {
          setFeedItems(response.data.files);
        } else {
          console.error('Response data does not contain an array', response.data);
          setFeedItems([]);
        }
      } catch (error) {
        console.error('Error fetching feed items', error);
        setFeedItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedItems(searchQuery);
  }, [searchQuery]);

  const filteredItems = feedItems.filter(item => {
    const matchesFilter = filters[item.type];
    const matchesSearch = searchQuery === '' || item.originalName.toLowerCase().includes(searchQuery.toLowerCase())
    || item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSearch = (query) => {
    setSearchQuery(query.trim());
  };

  return (
    <Box sx={{ padding: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className='filter'>
            <Suspense fallback={<div className='load-post-splash'></div>}>
              <SearchFeed onSearch={handleSearch} />
              <Filter filters={filters} setFilters={setFilters} />
            </Suspense>
          </div>

          <div className='button-fixed'>
            <Suspense fallback={<div className='load-post-splash'></div>}>
              <SearchDialog  onSearch={handleSearch}/>
            </Suspense>
          </div>
          {filteredItems.length > 0 ? (
            <Box>
              {filteredItems.map((item, index) => (
                <Suspense fallback={<div className='load-post-splash'></div>}>
                   <FeedItem item={item} />
                </Suspense>
               
              ))}
            </Box>
          ) : (
            <Typography variant="body1">No feed items available.</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Feed;
