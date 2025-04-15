import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAllProjectImages, ProjectImage } from '../utils/imageUtils';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // State for modal
  const [selectedProject, setSelectedProject] = useState<ProjectImage | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Get all project images from the utility
  const projectImages: ProjectImage[] = getAllProjectImages();

  // Function to open modal
  const openModal = (project: ProjectImage) => {
    setSelectedProject(project);
    setZoomLevel(1); // Reset zoom level when opening new image
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  // Function to close modal
  const closeModal = () => {
    setSelectedProject(null);
    setZoomLevel(1);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Zoom functions
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3)); // Max zoom 3x
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1)); // Min zoom 1x
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
          {projectImages.map((project, index) => (
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
                <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to view full image</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for fullscreen image viewing */}
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
            
            {/* Zoom controls */}
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
            
            {/* Image container with pan ability */}
            <div className="overflow-auto w-full h-full flex items-center justify-center">
              <img
                src={selectedProject.image}
                alt={`Project ${selectedProject.id} Fullscreen`}
                className="max-w-none transition-transform duration-300"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  cursor: zoomLevel > 1 ? 'move' : 'auto'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;