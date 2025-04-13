import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Lightbulb, Building2, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: '150+', label: 'Happy Clients' },
  { icon: Building2, value: '200+', label: 'Projects Completed' },
  { icon: Award, value: '15+', label: 'Design Awards' },
  { icon: Lightbulb, value: '20+', label: 'Years Experience' },
];

// const team = [
//   {
//     name: 'David Anderson',
//     role: 'Principal Architect',
//     image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
//   },
//   {
//     name: 'Lisa Zhang',
//     role: 'Interior Designer',
//     image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
//   },
//   {
//     name: 'James Wilson',
//     role: 'Project Manager',
//     image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
//   },
// ];

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4 bg-white bg-opacity-80 shadow-lg rounded-xl" id="about" ref={ref}>
      <div className="max-w-full mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">About Archiform</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Since 2003, we've been transforming spaces and creating exceptional interior experiences.
            Our passion for design excellence and attention to detail has earned us recognition
            as one of the leading interior architecture firms.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-gray-800" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative mb-4 overflow-hidden rounded-lg group">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
};

export default About;