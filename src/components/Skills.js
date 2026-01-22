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
    <section id="skills" className="py-12 md:py-20 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-8 md:mb-12"
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
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{skill.name}</h3>
              <p className="text-gray-300 text-sm">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}