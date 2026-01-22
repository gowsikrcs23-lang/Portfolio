import { motion } from 'framer-motion';
import SkillsAnimation from './SkillsAnimation';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 z-0">
        {/* Animated code snippets */}
        <div className="absolute inset-0 opacity-30">
          {['function()', 'const x =', 'if (true)', 'return;', 'class App', '{ code }', 'async/await', 'npm install'].map((code, i) => (
            <motion.div
              key={i}
              className="absolute text-blue-600 font-mono text-sm"
              style={{
                left: '-100px',
                top: `${i * 80}px`
              }}
              animate={{
                x: [0, 1200]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear', delay: i * 2 }}
            >
              {code}
            </motion.div>
          ))}
        </div>
        
        {/* Computer icons */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 6 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-indigo-500 text-2xl"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 12}%`
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {['💻', '🖥️', '⌨️', '🖱️', '💾', '🔌'][i]}
            </motion.div>
          ))}
        </div>
        
        {/* 3D CSS Cubes */}
        <div className="absolute inset-0 opacity-15">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 25}%`,
                top: `${10 + i * 20}%`,
                transform: 'perspective(1000px)'
              }}
            >
              <motion.div
                className="w-8 h-8 relative"
                style={{
                  transformStyle: 'preserve-3d'
                }}
                animate={{
                  rotateX: [0, 360],
                  rotateY: [0, 360]
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                <div className="absolute w-8 h-8 bg-blue-400 opacity-70" style={{ transform: 'rotateY(0deg) translateZ(16px)' }}></div>
                <div className="absolute w-8 h-8 bg-purple-400 opacity-70" style={{ transform: 'rotateY(90deg) translateZ(16px)' }}></div>
                <div className="absolute w-8 h-8 bg-green-400 opacity-70" style={{ transform: 'rotateY(180deg) translateZ(16px)' }}></div>
                <div className="absolute w-8 h-8 bg-red-400 opacity-70" style={{ transform: 'rotateY(-90deg) translateZ(16px)' }}></div>
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 border border-indigo-400"
              style={{
                left: `${i * 12}%`,
                top: `${i * 10}%`
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
        
        {/* Neural network nodes */}
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full">
            {Array.from({ length: 20 }, (_, i) => {
              const x = (i % 5) * 25 + 10;
              const y = Math.floor(i / 5) * 25 + 10;
              return (
                <g key={i}>
                  <circle cx={`${x}%`} cy={`${y}%`} r="2" fill="#3b82f6" opacity="0.6">
                    <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
                  </circle>
                  {i < 15 && (
                    <line x1={`${x}%`} y1={`${y}%`} x2={`${(i + 5) % 5 * 25 + 10}%`} y2={`${Math.floor((i + 5) / 5) * 25 + 10}%`} stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        
        <SkillsAnimation />
      </div>
      
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between h-full pt-16 pb-8">
        <div className="relative z-10 text-center lg:text-left flex-1 lg:pl-8 mb-8 lg:mb-0 w-full">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800 drop-shadow-lg break-words"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Gowsik R
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-600 drop-shadow-md break-words"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Computer Science Student
          </motion.p>
          
          <motion.a 
            href="#projects"
            className="inline-block bg-cyan-600 hover:bg-cyan-700 px-6 md:px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl text-sm md:text-base"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View My Work
          </motion.a>
        </div>
        
        <motion.div 
          className="relative z-10 flex-1 flex justify-center lg:justify-center w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.img 
            src="/IMG_2142.JPG" 
            alt="Gowsik R" 
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover rounded-3xl shadow-2xl border-4 border-white max-w-full cursor-pointer"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              scale: [1, 1.05, 1], 
              rotate: [0, 2, -2, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              opacity: { duration: 1, delay: 0.8 },
              scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95, rotate: -2 }}
          />
        </motion.div>
      </div>
    </section>
  );
}