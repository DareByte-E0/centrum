// TopPane.js
import React from 'react';
import './style.css';
import SidebarNavBar from '../Navigation/SideNavbar';

const TopPane = () => {
  return (
    <div className="top-pane">
      <div className='top-pane-nav'>
        <SidebarNavBar />
      </div>
      {/* Profile icon */}
    </div>
  );
}

export default TopPane;
