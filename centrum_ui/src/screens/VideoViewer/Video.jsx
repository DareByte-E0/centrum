import React from 'react';
import ReactPlayer from 'react-player';
import { styled } from '@mui/system';
import './video.css'

const Video = ({ fileUrl }) => {

    const StyledReactPlayer = styled(ReactPlayer)({
        cursor: 'pointer',
        '&:hover': {
          cursor: 'pointer',
        },
      });


    return(
        <div className='video-main'>
            <StyledReactPlayer url={`${fileUrl}`} controls width="100%" height="80vh" playing />
        </div>
    )
}

export default Video;