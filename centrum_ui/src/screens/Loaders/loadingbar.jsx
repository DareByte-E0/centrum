
import React from 'react';
import './loadingbar.css';

const LoadingIndicator = ({ loading }) => {
  return (
    <div className="loading-bar" style={{ width: loading ? '100%' : '0' }} />
  );
};

export default LoadingIndicator;
