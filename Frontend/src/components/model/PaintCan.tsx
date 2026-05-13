import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export const PaintCan = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Soft rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={meshRef} castShadow>
          {/* A simple Cylinder to represent a Paint Can */}
          <cylinderGeometry args={[1, 1, 2.5, 32]} />
          <meshStandardMaterial 
            color="#4f46e5" 
            roughness={0.1} 
            metalness={0.8} 
            emissive="#1e1b4b"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </>
  );
};