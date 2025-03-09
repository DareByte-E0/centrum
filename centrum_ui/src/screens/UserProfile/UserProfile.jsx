import React from 'react';
import './userprofile.css';
import { FaUser, FaEnvelope, FaUserFriends, FaBook, FaAward, FaCalendarAlt } from 'react-icons/fa';
import Circles from '../Brand/Circles';

const UserProfile = ({ user }) => {
  return (
    <div className='profile-page'>
      {/* <div className='brand-circle'>
        <Circles />
      </div> */}
      <div className="user-profile">
        {/* Profile Header */}
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
              <div className="stat">
                <FaUserFriends className="stat-icon" />
                <span>{user.followers} Followers</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${(user.followers / 1000) * 100}%` }}></div>
                </div>
              </div>
              <div className="stat">
                <FaUserFriends className="stat-icon" />
                <span>{user.following} Following</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${(user.following / 500) * 100}%` }}></div>
                </div>
              </div>
            </div>
            <div className="action-buttons">
              <button className="follow-button">
                <FaUserFriends /> Follow
              </button>
              <button className="message-button">
                <FaEnvelope /> Message
              </button>
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="profile-section">
          <h3><FaBook /> Research Interests</h3>
          <div className="interests">
            {user.researchInterests.map((interest, index) => (
              <span key={index} className="interest-tag">{interest}</span>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h3><FaAward /> Achievements</h3>
          <div className="achievements">
            {user.achievements.map((achievement, index) => (
              <div key={index} className="achievement">
                <FaAward className="achievement-icon" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h3><FaCalendarAlt /> Recent Activity</h3>
          <div className="activity-timeline">
            {user.recentActivity.map((activity, index) => (
              <div key={index} className="activity">
                <span className="activity-date">{activity.date}</span>
                <span className="activity-description">{activity.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;