import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomSearch = () => {
  const defaultText = 'Ask the professor...';
  const [searchText, setSearchText] = useState(defaultText);
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const searchBox = searchBoxRef.current;

    // Set default text after load
    searchBox.value = defaultText;

    // onFocus behaviour
    searchBox.onfocus = () => {
      if (searchBox.value === defaultText) {
        searchBox.value = '';
      }
    };

    // onBlur behaviour
    searchBox.onblur = () => {
      if (searchBox.value === '') {
        searchBox.value = defaultText;
      }
    };
  }, [defaultText]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Redirect to your results page with the query as a parameter
    const query = searchBoxRef.current.value;
    if (query.trim()) {
      const url = `/result?q=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div>
      <form method="get" action="/result" onSubmit={handleSubmit}>
      <input
        type="text"
        name="q"
        id="search"
        size="25"
        ref={searchBoxRef}
        defaultValue={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <input type="submit" value="Search" />
    </form>
    </div>
  );
};

export default CustomSearch;
