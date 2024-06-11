// MainLayout.js
import React from 'react';
import NavigationPane from './NavPane';
import MainScreen from './MainScreen';
import TopPane from './TopPane';
import Footer from '../Footer';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <TopPane />
      <div className="container">
        <NavigationPane />
        <MainScreen />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
