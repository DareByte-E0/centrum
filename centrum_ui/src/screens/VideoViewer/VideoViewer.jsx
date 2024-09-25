import React, { lazy, Suspense } from 'react';
import API_URL from '../../Config';
import { useLocation } from 'react-router-dom';
import './video.css'

const Video = lazy(() => import('./Video'));
const VideoViewer = () => {
    const location = useLocation();
    const videoId = location.state?.videoId;
    const title = location.state?.title;
    const videoUrl = `${API_URL}/files/${videoId}`;

    return (
        <div className="">
            <Suspense fallback={<div>Loading...</div>}>
                <Video fileUrl={videoUrl} />
            </Suspense>
            <div className='vid-txt'>
                <h3>{title}</h3>
            </div>
        </div>
    );
}

export default VideoViewer;
