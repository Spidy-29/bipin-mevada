import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAllProjectImages, ProjectImage } from '../utils/imageUtils';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Get all project images from the utility
  const projectImages: ProjectImage[] = getAllProjectImages();

  return (
    <section className="py-20 px-4 bg-white bg-opacity-80 rounded-xl shadow-lg" id="projects">
      <div className="max-w-full mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
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
                  {/* We'll add project details later */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;