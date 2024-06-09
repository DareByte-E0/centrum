import React, { useEffect } from 'react';

const SearchResults = () => {
  useEffect(() => {
    // Add Google Programmable Search Engine script
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=82c195d4e8b174f5a';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h2>Search Results</h2>
      <div className="gcse-searchresults-only"></div>
    </div>
  );
};

export default SearchResults;
