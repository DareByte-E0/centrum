// LoadingScreen.js
import React from 'react';
import './loadingscreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
        <div className='loaders'>
            <div className="load-circle bold-pink"></div>
            <div className="load-circle calming-blue"></div>
            <div className="load-circle warm-orange"></div>
            <div className="load-circle soft-green"></div>
            <div className="load-circle bright-yellow"></div>
            <div className="load-circle rich-purple"></div>
            <div className="load-circle blue-green"></div>
        </div>
        <div className='bytes'>
            <div className="brand">from Bytes</div>
        </div>
    </div>
  );
};

export default LoadingScreen;
