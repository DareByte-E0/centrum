import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import axios from 'axios';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Grid } from 'react-virtualized';
import API_URL from '../../Config';
import './filter.css'

const Filter = lazy(() => import('./Filter'));
const SearchFeed = lazy(() => import('./SearchFeed'));
const SearchDialog = lazy(() => import('./SearchDialog'));
const FeedItem = lazy(() => import('./FeedItem'));  // Use lazy loading for FeedItem

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
  const [hasMore, setHasMore] = useState(true); // To track if there are more items to load
  const [page, setPage] = useState(0); // To handle pagination

  useEffect(() => {
    const fetchFeedItems = async (search = '', page = 0) => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/files`, {
          params: {
            search: search,
            page: page, // Pass the current page
          },
        });
        if (response.data && Array.isArray(response.data.files)) {
          setFeedItems(prevItems => [...prevItems, ...response.data.files]);
          setHasMore(response.data.files.length > 0); // Update hasMore based on response
        } else {
          console.error('Response data does not contain an array', response.data);
          setFeedItems([]);
        }
      } catch (error) {
        console.error('Error fetching feed items', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedItems(searchQuery, page);
  }, [searchQuery, page]);

  const filteredItems = feedItems.filter(item => {
    const matchesFilter = filters[item.type];
    const matchesSearch = searchQuery === '' || item.originalName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSearch = (query) => {
    setSearchQuery(query.trim());
    setPage(0); // Reset page number when search query changes
    setFeedItems([]); // Clear feed items for new search
  };

  // Handle infinite scrolling
  const loadMoreItems = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [loading, hasMore]);

  // Function to render each cell in the grid
  const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
    const index = rowIndex * 3 + columnIndex; // Calculate the index based on column and row
    return (
      <div key={key} style={style}>
        {index < filteredItems.length && (
          <Suspense fallback={<div>Loading...</div>}>
            <FeedItem item={filteredItems[index]} />
          </Suspense>
        )}
      </div>
    );
  };

  return (
    <Box sx={{ padding: 4 }}>
      <div className='filter'>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchFeed onSearch={handleSearch} />
          <Filter filters={filters} setFilters={setFilters} />
        </Suspense>
      </div>

      <div className='button-fixed'>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchDialog onSearch={handleSearch} />
        </Suspense>
      </div>
      
      {loading && !hasMore ? (
        <Typography variant="body1">No more items to load.</Typography>
      ) : (
        <Grid
          columnCount={3} // Number of columns
          columnWidth={300} // Width of each column
          height={window.innerHeight - 100} // Height of the grid
          rowCount={Math.ceil(filteredItems.length / 3)} // Number of rows
          rowHeight={400} // Height of each row
          width={window.innerWidth} // Width of the grid
          onScroll={({ clientHeight, scrollHeight, scrollTop }) => {
            // Load more items when scrolled to the bottom
            if (scrollHeight - clientHeight === scrollTop) {
              loadMoreItems();
            }
          }}
          cellRenderer={cellRenderer}
        />
      )}
    </Box>
  );
};

export default Feed;
