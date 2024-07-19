
import React from 'react';
import './style.css';
import WelcomeMessage from '../conditionals/Welcome';
import DocumentViewer from '../DocumentViewer/DocumentViewer';

const MainScreen = () => {
  return (
    <div className="main-screen">
      <DocumentViewer />
    </div>
  );
}

export default MainScreen;
