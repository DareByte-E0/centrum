
import React from 'react';
import './style.css';
import WelcomeMessage from './conditionals/Welcome';

const MainScreen = () => {
  return (
    <div className="main-screen">
      <WelcomeMessage />
    </div>
  );
}

export default MainScreen;
