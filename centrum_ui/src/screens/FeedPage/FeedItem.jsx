import React, { useState } from 'react';
import { FaThumbsUp, FaComment, FaUser  } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './feeditem.css';
import CommentModal from './CommentDialog';
import API_URL from '../../Config';


const FeedItem = ({ item, comments, setComments }) => {
  const navigate = useNavigate();
  let [textClick, setTextClick] = useState('card-desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleOpenDoc = (id) => {
    navigate('/study', { state: { documentId: id } });
  };

  const handleOpenVid = (id, name) => {
    navigate('/study', { state: { videoId: id, title: name } });
  };

  const textClickToggle = () => {
    if (textClick === 'card-desc') {
      return setTextClick('card-desc-rev')
    }
    setTextClick('card-desc')
  }

  const handleCommentSubmit = (newComment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [item._id]: [...(prevComments[item._id] || []), newComment],
    }));
  };


  return (
    <div className="card">
      <div className="card-content">
        <div>
          <FaUser />
        </div>

        <div>
        <FiMoreHorizontal size={24} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      <div className='write-up' onClick={textClickToggle}>
       <div className='card-title'> <h3>{item.title}</h3></div>

       <div className={textClick}>
          {item.description}
       </div>
      
      </div>

      {item.type === 'video' && (
        <div className="video-container">
          <video src={`${API_URL}/${item.path}`} controls width="100%"/>
          <button className="action-btn" onClick={() => handleOpenVid(item._id, item.title)}>
            Open Video
          </button>
        </div>
      )}

      {item.type === 'audio' && (
        <div className="audio-container">
          <audio src={`${API_URL}/${item.path}`} controls width="100%" />
        </div>
      )}

      {item.type === 'image' && (
        <div className="image-container">
          <img className="image-thumbnail" src={`${API_URL}/${item.thumbnailPath}`} alt={item.originalName} />
          {/* <div className="overlay">
            <h4>{item.originalName}</h4>
            <p>{item.type}</p>
          </div> */}
        </div>
      )}

      {item.type === 'application' && (
        <div className="doc-container">
          <img className="doc-thumbnail" src={`${API_URL}/${item.thumbnailPath}`} alt={item.originalName} />
          <div className="doc-details">
            {/* <p>{item.originalName}</p> */}
            <button className="action-btn" onClick={() => handleOpenDoc(item._id)}>
              Open Document
            </button>
          </div>
        </div>
      )}

      {/* Like and Comment Buttons */}
      <div className="card-actions">
        <button className="action-btn like-btn">
          <FaThumbsUp /> Like
        </button>
        <button className="action-btn comment-btn" onClick={() => setIsModalOpen(true)}>
          <FaComment /> Comment
        </button>
      </div>

      
      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        comments={comments[item._id] || []}
        onSubmit={handleCommentSubmit}
      />
    </div>
  );
};

export default FeedItem;
