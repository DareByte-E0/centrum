import React from 'react';

const ItemDetailsModal = ({ item, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>&times;</span>
      <img src={item.thumbnail} alt={item.title} />
      <h2>{item.title}</h2>
      <p>Type: {item.type}</p>
      <p>Uploaded by: {item.author}</p>
      <p>{item.description}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  </div>
);

export default ItemDetailsModal;
