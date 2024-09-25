import React, { Suspense, lazy } from 'react';
import './style.css';
import { useLocation } from 'react-router-dom';


const DocumentViewer = lazy(() => import('../DocumentViewer/DocumentViewer'));
const VideoViewer = lazy(() => import('../VideoViewer/VideoViewer'));

const MainScreen = () => {
  const location = useLocation();
  const videoId = location.state?.videoId;
  const documentId = location.state?.documentId;

  return (
    <div className="main-screen">
      <Suspense fallback={<div>Loading...</div>}>
        {videoId ? (
          <VideoViewer videoId={videoId} />
        ) : documentId ? (
          <DocumentViewer documentId={documentId} />
        ) : (
          <div>No content to display</div>
        )}
      </Suspense>
    </div>
  );
}

export default MainScreen;
