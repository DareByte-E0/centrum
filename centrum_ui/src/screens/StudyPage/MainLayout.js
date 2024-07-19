// MainLayout.js
import React from 'react';
import NavigationPane from './NavPane';
import MainScreen from './MainScreen';
import TopPane from './TopPane';
import Footer from '../Navigation/Footer';
import './style.css'

const MainLayout = () => {
  return (
    <div className="main-layout">
      <TopPane />
      <div className="">
        <NavigationPane />
        <MainScreen />
      </div>
      <div className='footer-s'>
      <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
