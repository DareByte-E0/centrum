import React, { useEffect } from 'react';
import './customsearch.css'
import PageSearch from './PageSearch';
import './webresults.css'
import CollapsibleNavBar from './screens/CollpasibleNabar';

const SearchResults = () => {
  useEffect(() => {
    // Add Google Programmable Search Engine script
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=82c195d4e8b174f5a';
    script.async = true;
    document.body.appendChild(script);

    const observerScript = document.createElement('script');
    observerScript.innerHTML = `
      document.addEventListener("DOMContentLoaded", function() {
        const targetNode = document.querySelector('.gsc-results-wrapper-visible');
        if (targetNode) {
          const observer = new MutationObserver((mutationsList, observer) => {
            for (let mutation of mutationsList) {
              if (mutation.type === 'childList') {
                document.querySelectorAll('.gsc-webResult').forEach((result) => {
                  result.classList.add('custom-result');
                });
              }
            }
          });

          observer.observe(targetNode, { childList: true, subtree: true });
        }
      });
    `;
    document.body.appendChild(observerScript);

    // Cleanup script when the component unmounts
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(observerScript);
    };
  }, []);

  return (
    <div>
      
       <PageSearch />
      <div className="gcse-searchresults-only">
      </div>
    </div>
  );
};

export default SearchResults;
