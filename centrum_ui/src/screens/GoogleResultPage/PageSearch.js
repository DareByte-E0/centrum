import React, { useState, useEffect, useRef } from 'react';
import './pageform.css'
import { FaSearch } from 'react-icons/fa';



const PageSearch = () => {
  const defaultText = 'Enter your search';
  const [searchText, setSearchText] = useState(defaultText);
  const searchBoxRef = useRef(null);

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
        window.location.href = url; // Open results page in the same tab
    }
  };

  return (
    <div className='search-page-container'>
      <div className='cover'>
        
        <form className='search-form' method="get" action="." onSubmit={handleSubmit}>
        <input
          type="text"
          name="q"
          id="search"
          size="25"
          ref={searchBoxRef}
          placeholder={searchText}
          defaultValue=''
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type='submit'><FaSearch /></button>
      </form>
        

     
    
      </div>
    </div>
  );
};

export default PageSearch;
