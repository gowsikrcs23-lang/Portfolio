import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-12 md:py-20 bg-gray-50 relative overflow-hidden">
      {/* Simple floating dots */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 4 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`
            }}
            animate={{
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 md:mb-8">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-left">
              <p className="text-gray-600 text-base md:text-lg mb-6">
                I'm Gowsik R, a passionate Computer Science student with a love for creating 
                innovative solutions and beautiful user experiences. Currently pursuing 
                my degree while building projects that make a difference.
              </p>
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div className="bg-white p-4 md:p-8 rounded-lg border border-gray-200 shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">Education</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 mb-1 text-sm md:text-base">Bachelor of Computer Science</p>
                    <p className="text-blue-600 font-medium text-sm md:text-base">Bannari Amman Institute of Technology • 2023-2027</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1 text-sm md:text-base">Diploma in Computer Science Engineering</p>
                    <p className="text-blue-600 font-medium text-sm md:text-base">Nachimuthu Polytechnic College, Pollachi • 2021-2024</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 md:p-8 rounded-lg border border-gray-200 shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">Internship</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 mb-1 text-sm md:text-base">Full Stack Developer Intern</p>
                    <p className="text-blue-600 font-medium text-xs md:text-sm">Litz Tech Solutions, Coimbatore • Sep 2023</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1 text-sm md:text-base">Mobile Developer Intern</p>
                    <p className="text-blue-600 font-medium text-xs md:text-sm">Litz Tech Solutions, Coimbatore • Sep 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
