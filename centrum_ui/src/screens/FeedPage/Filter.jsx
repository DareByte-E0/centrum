import React from 'react';
import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const Filter = ({ filters, setFilters }) => {
  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSelectAll = (event) => {
    const newFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = event.target.checked;
      return acc;
    }, {});
    setFilters(newFilters);
  };

  const allSelected = Object.values(filters).every(Boolean);
  const noneSelected = Object.values(filters).every(value => !value);

  return (
    <FormControl component="fieldset" variant="standard">
      {/* <Typography variant="h6" gutterBottom>
        Filter by Type
      </Typography> */}
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={allSelected} indeterminate={!allSelected && !noneSelected} onChange={handleSelectAll} />}
          label="Select All"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.video} onChange={handleChange} name="video" />}
          label="Video"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.audio} onChange={handleChange} name="audio" />}
          label="Audio"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.image} onChange={handleChange} name="image" />}
          label="Image"
        />
        <FormControlLabel
          control={<Checkbox checked={filters.application} onChange={handleChange} name="application" />}
          label="Application"
        />
      </FormGroup>
    </FormControl>
  );
};

export default Filter;
