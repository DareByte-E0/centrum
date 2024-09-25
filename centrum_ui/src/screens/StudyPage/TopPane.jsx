// TopPane.js
import React, { lazy, Suspense } from 'react';
import './style.css';

const SidebarNavBar = lazy(() => import('../Navigation/SideNavbar'));
const TopPane = () => {
  return (
    <div className="top-pane">
      <div className='top-pane-nav'>
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarNavBar />
        </Suspense>
      </div>
      {/* Profile icon */}
    </div>
  );
}

export default TopPane;
