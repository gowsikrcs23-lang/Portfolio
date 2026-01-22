import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import FloatingCube from './FloatingCube';

export default function Scene3D() {
  return (
    <div className="h-screen w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <FloatingCube />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}