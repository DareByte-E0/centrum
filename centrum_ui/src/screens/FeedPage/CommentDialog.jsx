// CommentModal.js
import React, { useState } from 'react';
import './commentdialog.css';
import { FaCheck, FaTimes, FaPaperPlane } from 'react-icons/fa';


const CommentModal = ({ isOpen, onClose, comments, onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        <div className='comment-x'>
            <div><h2>Comments</h2></div>
            <div>
                <button className="icon-btn" onClick={onClose}>
                    <FaTimes size={20} />
                </button>
            </div>
        </div>
        
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <div className="post-button-group">
          <button className="icon-btn" onClick={handleSubmit}>
          <FaPaperPlane size={20} />

          </button>
        </div>
        <div className="comments-list">
          {comments.map((c, index) => (
            <div key={index} className="comment">
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
