import React, { useState, useEffect } from "react";
import { getVideos, VideoItem } from "../utils/videoUtils";

const Hero: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  // Get videos from the utility function on component mount
  useEffect(() => {
    // This loads the videos with their metadata from your utility function
    const videoItems = getVideos();
    setVideos(videoItems);
  }, []);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.error("Video loading error:", e);
    setVideoError(true);
  };

  // Get the current video details
  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="relative h-[85vh] w-full overflow-hidden rounded-2xl">
      {/* Video Background */}
      <div className="absolute inset-0">
        {!videoError && videos.length > 0 ? (
          <video
            key={currentVideo?.path}
            autoPlay
            muted
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            playsInline
            className="w-full h-full object-cover rounded-2xl"
          >
            <source src={currentVideo?.path} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback background if video fails to load or no videos available
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700" />
        )}
        {/* Overlay with reduced blur and opacity */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] rounded-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        {currentVideo?.title ? (
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {currentVideo.title}
          </h1>
        ) : (
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Interior Architecture
          </h1>
        )}
        
        {currentVideo?.description ? (
          <p className="text-xl md:text-2xl text-center max-w-2xl mb-8 text-gray-200">
            {currentVideo.description}
          </p>
        ) : (
          <p className="text-xl md:text-2xl text-center max-w-2xl mb-8 text-gray-200">
            Transform your space into a masterpiece of design and functionality
          </p>
        )}

        {/* Video Progress Indicators */}
        {videos.length > 0 && (
          <div className="absolute bottom-6 flex gap-2">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentVideoIndex ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setCurrentVideoIndex(index)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;