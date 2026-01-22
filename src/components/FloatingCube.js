import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';

const skills = [
  'UI/UX', 'Python', 'C', 'C++', 'Java', 'React', 
  'Node.js', 'Tailwind', 'CSS', 'HTML', 'Express', 'Git', 'Docker'
];

export default function Skills3D() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(index) * 0.5;

        return (
          <Text
            key={skill}
            position={[x, y, z]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {skill}
          </Text>
        );
      })}
    </group>
  );
}