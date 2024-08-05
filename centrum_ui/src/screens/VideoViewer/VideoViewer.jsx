import React from 'react';
import API_URL from '../../Config';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import Video from './Video';
import './video.css'

const VideoViewer = () => {
    const location = useLocation();
    const [loading, setLoading] = React.useState(true);
    const videoId = location.state?.videoId;
    const title = location.state?.title;
    const videoUrl = `${API_URL}/files/${videoId}`;
    console.log('hola')
    console.log(`it is me and you today ${videoUrl}`)
    console.log(videoId)
    console.log('i am the title', title)

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <div className="">
            <Video fileUrl={videoUrl} />
            <div className='vid-txt'>
                <h3>{title}</h3>
            </div>
        </div>
    );
}

export default VideoViewer;
