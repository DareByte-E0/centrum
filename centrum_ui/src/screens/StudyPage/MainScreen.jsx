
import React from 'react';
import './style.css';
import DocumentViewer from '../DocumentViewer/DocumentViewer';
import VideoViewer from '../VideoViewer/VideoViewer';
import { useLocation } from 'react-router-dom'

const MainScreen = () => {
  const location = useLocation();
  const videoId = location.state?.videoId;
  const documentId = location.state?.documentId;
  console.log(`first video id ${videoId}`)
  console.log(`first doc id ${documentId}`)

  
  return (
    <div className="main-screen">
    { videoId && (<VideoViewer />)}
    { documentId && (<DocumentViewer />)}
    </div>
  );
}

export default MainScreen;
