import React, { useRef, useEffect, useState } from 'react';
import video from '../../img/video.mp4';
import './VideoComponent.css';

function VideoComponent() {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Set playback rate for smooth playback
      videoElement.playbackRate = 0.8;
      
      // Handle video load
      const handleLoadedData = () => {
        setIsLoaded(true);
      };
      
      // Handle video error
      const handleError = (e) => {
        console.error('Video failed to load:', e);
      };
      
      // Add event listeners
      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('error', handleError);
      
      // Ensure video plays
      const playVideo = async () => {
        try {
          await videoElement.play();
        } catch (error) {
          console.log('Video autoplay failed:', error);
        }
      };
      
      playVideo();
      
      // Cleanup
      return () => {
        if (videoElement) {
          videoElement.removeEventListener('loadeddata', handleLoadedData);
          videoElement.removeEventListener('error', handleError);
        }
      };
    }
  }, []);

  return (
    <div className="video-bg">
      <video 
        className={`background-video ${isLoaded ? 'loaded' : ''}`}
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        preload="metadata"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoComponent;