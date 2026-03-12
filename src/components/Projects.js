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
  },
  {
    title: "Food Delivery App UI/UX",
    description: "Modern food delivery application design with intuitive user interface and seamless ordering experience",
    tech: ["Figma", "UI/UX", "Prototyping"],
    image: "/image.png"
  },
  {
    title: "Online Grocery Shop",
    description: "Full-stack e-commerce platform for online grocery shopping with cart management and payment integration",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop&auto=format"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-12 md:py-20 bg-gray-50 relative overflow-hidden">
      {/* Simple shapes */}
      <div className="absolute inset-0 opacity-8">
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + i * 15}%`
            }}
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.h2 
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-8 md:mb-12"
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
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md cursor-pointer group relative"
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
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200"
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
