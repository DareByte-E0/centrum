import React from 'react';
import API_URL from '../../Config';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import Video from './Video';

const VideoViewer = () => {
    const location = useLocation();
    const [loading, setLoading] = React.useState(true);
    const videoId = location.state?.videoId;
    const videoUrl = `${API_URL}/files/${videoId}`;
    console.log('hola')
    console.log(`it is me and you today ${videoUrl}`)
    console.log(videoId)

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <div className="">
            <Video fileUrl={videoUrl} />
        </div>
    );
}

export default VideoViewer;
