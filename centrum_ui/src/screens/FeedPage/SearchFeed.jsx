
import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './searchfeed.css';

const SearchFeed = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="what's on your mind?"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="search-icons">
        <FaSearch className="search-icon" onClick={handleSearch} />
        {searchTerm && (
          <FaTimes className="clear-icon" onClick={handleClear} />
        )}
      </div>
    </div>
  );
};

export default SearchFeed;
