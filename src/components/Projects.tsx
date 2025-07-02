import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAllProjectItems, ProjectItem } from '../utils/imageUtils';
import { X, ZoomIn, ZoomOut, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // State for modal
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Get all project items from the utility
  const projectItems: ProjectItem[] = getAllProjectItems();

  // Function to open modal
  const openModal = (project: ProjectItem) => {
    setSelectedProject(project);
    setZoomLevel(1); // Reset zoom level when opening new item
    setIsPlaying(false);
    setIsMuted(false);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedProject(null);
    setZoomLevel(1);
    setIsPlaying(false);
    setIsMuted(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Zoom functions
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3)); // Max zoom 3x
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1)); // Min zoom 1x
  };

  // Video control functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section className="py-20 px-4 bg-white bg-opacity-80 rounded-xl shadow-lg" id="projects">
      <div className="max-w-full mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        {/* Staggered Grid Layout */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]"
        >
          {projectItems.map((project, index) => (
            <motion.div
              key={project.id}
              className={`group relative overflow-hidden rounded-lg shadow-lg cursor-pointer
                ${project.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openModal(project)}
            >
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={`Project ${project.id}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: "center center" }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Video indicator overlay */}
                {project.video && (
                  <div className="absolute top-4 right-4 bg-slate-600 text-white px-2 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-3 h-3 inline mr-1" />
                    Video
                  </div>
                )}
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.video ? 'Click to view video' : 'Click to view full image'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for fullscreen viewing */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Zoom controls (only for images) */}
            {!selectedProject.video && (
              <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
                <button 
                  onClick={zoomOut} 
                  disabled={zoomLevel <= 1}
                  className={`bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors ${zoomLevel <= 1 ? 'opacity-50 cursor-not-allowed' : 'text-white'}`}
                >
                  <ZoomOut className="w-6 h-6" />
                </button>
                <button 
                  onClick={zoomIn} 
                  disabled={zoomLevel >= 3}
                  className={`bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors ${zoomLevel >= 3 ? 'opacity-50 cursor-not-allowed' : 'text-white'}`}
                >
                  <ZoomIn className="w-6 h-6" />
                </button>
              </div>
            )}
            
            {/* Video controls (only for videos) */}
            {selectedProject.video && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                <button 
                  onClick={togglePlay}
                  className="bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors text-white"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button 
                  onClick={toggleMute}
                  className="bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors text-white"
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
              </div>
            )}
            
            {/* Content container */}
            <div className="overflow-auto w-full h-full flex items-center justify-center">
              {selectedProject.video ? (
                <video
                  ref={videoRef}
                  src={selectedProject.video}
                  className="max-w-full max-h-full object-contain"
                  onEnded={handleVideoEnded}
                  muted={isMuted}
                  loop
                />
              ) : (
                <img
                  src={selectedProject.image}
                  alt={`Project ${selectedProject.id} Fullscreen`}
                  className="max-w-none transition-transform duration-300"
                  style={{ 
                    transform: `scale(${zoomLevel})`,
                    cursor: zoomLevel > 1 ? 'move' : 'auto'
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;