import { motion } from 'framer-motion';

const skills = [
  { name: 'UI/UX', icon: '🎨' },
  { name: 'React', icon: '⚛️' },
  { name: 'Python', icon: '🐍' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Docker', icon: '🐳' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'HTML', icon: '🌐' },
  { name: 'CSS', icon: '🎨' },
  { name: 'Java', icon: '☕' }
];

export default function SkillsAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Top row - left to right */}
      <div className="absolute top-20 w-full">
        <motion.div
          className="flex space-x-8 whitespace-nowrap"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {skills.slice(0, 5).map((skill, index) => (
            <div key={index} className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-300 shadow-sm">
              <span className="text-2xl mr-2">{skill.icon}</span>
              <span className="text-gray-700 font-medium">{skill.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom row - right to left */}
      <div className="absolute bottom-20 w-full">
        <motion.div
          className="flex space-x-8 whitespace-nowrap"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {skills.slice(5).map((skill, index) => (
            <div key={index} className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-300 shadow-sm">
              <span className="text-2xl mr-2">{skill.icon}</span>
              <span className="text-gray-700 font-medium">{skill.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Middle floating elements */}
      {skills.slice(0, 3).map((skill, index) => (
        <motion.div
          key={`float-${index}`}
          className="absolute text-4xl"
          initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight / 2 }}
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [window.innerHeight / 2 - 100, window.innerHeight / 2 + 100]
          }}
          transition={{
            duration: 8 + index * 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        >
          {skill.icon}
        </motion.div>
      ))}
    </div>
  );
}