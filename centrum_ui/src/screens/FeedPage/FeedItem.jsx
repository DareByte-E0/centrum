import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaComment, FaUser  } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './feeditem.css';
import CommentModal from './CommentDialog';
import API_URL from '../../Config';
import axios from 'axios';


const FeedItem = ({ item, comments, setComments, likes, setLikes }) => {
  const navigate = useNavigate();
  let [textClick, setTextClick] = useState('card-desc');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [loadingComments, setLoadingComments] = useState(false);
  const [likeCount, setLikeCount] = useState(0);


  // Fetch initial comment count
  useEffect(() => {
    const fetchCommentCount = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-comment/${item._id}`);
            setCommentCount(response.data.total);
        } catch (error) {
            console.error("Error fetching comment count:", error);
        }
    };

    const fetchLikeCount = async () => {
      try {
          const response = await axios.get(`${API_URL}/get-like/${item._id}`);
          setLikeCount(response.data.total);
      } catch (error) {
          console.error("Error fetching like count:", error);
      }
  };

    fetchCommentCount();
    fetchLikeCount();
}, [item._id]);
  

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

  const handleCommentSubmit = async (newComment) => {
    try {
      const response = await axios.post(`${API_URL}/post-comment`, {
        text: newComment,
        fileId: item._id,
      });
      
      // Update comments state with the newly added comment
      setComments((prevComments) => ({
        ...prevComments,
        [item._id]: [...(prevComments[item._id] || []), response.data.comment],
      }));
      setCommentCount((prevCount) => prevCount + 1)
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  
  const handleLikeSubmit = async (newLike) => {
    try {
      const response = await axios.post(`${API_URL}/post-like`, {
        fileId: item._id,
      });
      
      // Update likes state with the newly added comment
      setLikes((prevLikes) => ({
        ...prevLikes,
        [item._id]: [...(prevLikes[item._id] || []), response.data.like],
      }));
      setLikeCount((prevCount) => prevCount + 1)
    } catch (error) {
      console.error("Error posting like:", error);
    }
  };


  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const response = await axios.get(`${API_URL}/get-comment/${item._id}`);
      setComments((prev) => ({
        ...prev,
        [item._id]: response.data.comments,
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false);
  }
  };



  const handleOpenModal = () => {
    fetchComments();
    setIsModalOpen(true);
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
          <video src={`${item.path}`} controls width="100%"/>
          <button className="action-btn" onClick={() => handleOpenVid(item._id, item.title)}>
            Open Video
          </button>
        </div>
      )}

      {item.type === 'audio' && (
        <div className="audio-container">
          <audio src={`${item.path}`} controls width="100%" />
        </div>
      )}

      {item.type === 'image' && (
        <div className="image-container">
          <img className="image-thumbnail" src={`${item.path}`} alt={item.originalName} />
          
        </div>
      )}

      {item.type === 'application' && (
        <div className="doc-container">
          <img className="doc-thumbnail" src={`${item.thumbnailPath}`} alt={item.originalName} />
          <div className="doc-details">
            
            <button className="action-btn" onClick={() => handleOpenDoc(item._id)}>
              Open Document
            </button>
          </div>
        </div>
      )}

      {/* Like and Comment Buttons */}
      <div className="card-actions">
        <button className="action-btn like-btn" onClick={handleLikeSubmit}>
          <FaThumbsUp /> {likeCount > 0 ? `${likeCount} Like(s)` :  `Like`}
        </button>
        <button className="action-btn comment-btn" onClick={handleOpenModal}>
          <FaComment /> {commentCount > 0 ? ` ${commentCount} Comment(s)` : ' Comment'}
        </button>
      </div>

      
      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        comments={comments[item._id] || []}
        onSubmit={handleCommentSubmit}
        loading={loadingComments}
      />
    </div>
  );
};

export default FeedItem;
