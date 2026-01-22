import { motion } from 'framer-motion';

const projects = [
  {
    title: "Recipe Radar Generator",
    description: "Multi-language recipe recommendation system with easy-to-use interface and smart ingredient detection",
    tech: ["React", "Firebase"],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop&auto=format"
  },
  {
    title: "Expense Tracker",
    description: "Full-stack expense management app with real-time analytics and budget tracking features",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop&auto=format"
  },
  {
    title: "Computer Lab Login Register",
    description: "Secure authentication system for computer lab management with user registration and session tracking",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop&auto=format"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-12 md:py-20 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          My Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-md cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-cyan-900 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}