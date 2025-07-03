
import React, { useRef, useEffect } from 'react';

import video from '../../img/video.mp4';
import './VideoComponent.css';

function VideoComponent() {

  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1;
    }
  }, []);


  return (
    <div className='video-wrapper'>
      <video className='background-video' 
      ref={videoRef}
      autoPlay loop muted >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoComponent;
