import React from 'react';

const ShelveItem = ({ item, onSelect }) => (
  <div className="shelve-item" onClick={() => onSelect(item)}>
    <img src={item.thumbnail} alt={item.title} />
    <h2>{item.title}</h2>
    <p>{item.type}</p>
    <button>View</button>
  </div>
);

export default ShelveItem;
