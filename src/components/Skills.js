import { motion } from 'framer-motion';

const skills = [
  {
    name: "UI/UX Design",
    icon: "🎨",
    description: "Creating intuitive and beautiful user interfaces"
  },
  {
    name: "Photoshop",
    icon: "🖼️",
    description: "Professional image editing and graphic design"
  },
  {
    name: "React & JavaScript",
    icon: "⚛️",
    description: "Building dynamic and interactive web applications"
  },
  {
    name: "Python",
    icon: "🐍",
    description: "Backend development and data analysis"
  },
  {
    name: "Java",
    icon: "☕",
    description: "Object-oriented programming and enterprise applications"
  },
  {
    name: "C Programming",
    icon: "⚙️",
    description: "System programming and algorithm development"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-12 md:py-20 bg-white relative overflow-hidden">
      {/* Simple dots */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${i * 12}%`,
              top: `${i * 10}%`
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: 2 + i,
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
          My Skills
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-lg text-center group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)"
              }}
            >
              <motion.div 
                className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: [0, -10, 10, 0] }}
              >
                {skill.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">{skill.name}</h3>
              <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
