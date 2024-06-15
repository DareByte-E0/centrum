import React, { useState } from 'react';
import ShelveItem from './ShelveItem';
import ItemDetailsModal from './ItemDetailsModal';
import CollapsibleNavBar from '../Navigation/CollpasibleNabar';
import Footer from '../Navigation/Footer';
import Circles from '../Brand/Circles';
import './shelvepage.css'

const ShelvePage = () => {
  const [items, setItems] = useState([]); // Fetch items from API
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All'); // State for active filter

  // Filter items based on activeFilter state
  const filteredItems = items.filter(item => {
    if (activeFilter === 'All') {
      return true; // Show all items
    } else if (activeFilter === 'Videos') {
      return item.type === 'video';
    } else if (activeFilter === 'Images') {
      return item.type === 'image';
    } else if (activeFilter === 'Books') {
      return item.type === 'book';
    } 
    return true; // Default to show all if activeFilter doesn't match any specific case
  });

  // Function to handle filter button click
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className='shelve-page'>
      <CollapsibleNavBar />
      <div className='brand-circle'>
        <Circles />
      </div>
      <header>
        <h1>Professor Shelf</h1>
        <form>
          <input type="text" placeholder="Search the professor shelf..." />
          <button type='submit'>search</button>
        </form>
      </header>
      <nav>
        <button onClick={() => handleFilterClick('All')}>All...</button>
        <button onClick={() => handleFilterClick('Videos')}>Videos</button>
        <button onClick={() => handleFilterClick('Images')}>Images</button>
        <button onClick={() => handleFilterClick('Books')}>Books</button>
      </nav>
      <main>
        <div className="grid-view">
          {filteredItems.map(item => (
            <ShelveItem key={item.id} item={item} onSelect={setSelectedItem} />
          ))}
        </div>
      </main>
      {selectedItem && (
        <ItemDetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}


       <div className='footer-s'>
             <Footer />
            </div>
    </div>
  );
};

export default ShelvePage;
