import React, { useEffect } from 'react';
import './customsearch.css'
import './App.css'

const CustomSearch = () => {
  useEffect(() => {
    // Function to add the Google CSE script
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://cse.google.com/cse.js?cx=82c195d4e8b174f5a';
      script.async = true;
      document.body.appendChild(script);
    };

    // Load the script when the component mounts
    loadScript();

    // Cleanup script when the component unmounts
    // return () => {
    //   const script = document.querySelector('script[src="https://cse.google.com/cse.js?cx=82c195d4e8b174f5a"]');
    //   if (script) {
    //     document.body.removeChild(script);
    //   }
    // };
  }, []);

  return (
    <div className="custom-search-container">
      <div class="gcse-searchbox"></div>
      <div class="gcse-searchresults"></div>
    </div>
  );
};

export default CustomSearch;
