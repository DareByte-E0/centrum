// MainLayout.js
import React, { lazy, Suspense } from 'react';
import './style.css'
import './install.css'

const NavigationPane = lazy(() => import('./NavPane'));
const MainScreen = lazy(() => import('./MainScreen'));
const TopPane = lazy(() => import('./TopPane'));

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Suspense fallback={<div>Loading...</div>}>
        <TopPane />
        <div className="">
          <NavigationPane />
          <MainScreen />
        </div>
        <div className='footer-s'>
        </div>
      </Suspense>
    </div>
  );
}

export default MainLayout;
