import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import './searchdialog.css';

const SearchDialog = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
    handleClose();
  };

  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="search-dialog">
      <Button variant="outlined" color="primary" onClick={handleClickOpen} startIcon={<FaSearch />}>
        Search
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search"
            type="text"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClear} color="primary">
            Clear
          </Button>
          <Button onClick={handleSearch} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
