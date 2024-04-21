// MainLayout.js
import React from 'react';
import NavigationPane from './screens/NavPane';
import MainScreen from './screens/MainScreen';
import TopPane from './screens/TopPane';
import Footer from './screens/Footer';

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
