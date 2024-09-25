import React from 'react';
import './userprofile.css';
import { FaUser, FaEnvelope, FaUserFriends } from 'react-icons/fa';
import Circles from '../Brand/Circles';

const UserProfile = ({ user }) => {
  return (
    <div className='profile-page'>
        <div className='brand-circle'>
                <Circles />
            </div>
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-picture">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt={`${user.name}'s profile`} />
          ) : (
            <FaUser className="default-icon" />
          )}
        </div>
        <div className="user-info">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <div className="user-stats">
            <span>{user.followers} Followers</span>
            <span>{user.following} Following</span>
          </div>
          <div className="action-buttons">
            <button className="follow-button">Follow</button>
            <button className="message-button">
              <FaEnvelope /> Message
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default UserProfile;
