import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Individual floor plate
const Floor = ({ y, size = 1.6, color = "#2DD4BF", opacity = 0.28 }) => (
  <mesh position={[0, y, 0]}>
    <boxGeometry args={[size, 0.14, size]} />
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={0.6}
      transparent
      opacity={opacity}
      metalness={0.4}
      roughness={0.3}
    />
  </mesh>
);

const Wireframe = ({ size = 1.62, height = 4.4 }) => (
  <lineSegments position={[0, height / 2 - 0.2, 0]}>
    <edgesGeometry args={[new THREE.BoxGeometry(size, height, size)]} />
    <lineBasicMaterial color="#00E5FF" transparent opacity={0.55} />
  </lineSegments>
);

const BuildingModel = () => {
  const group = useRef();
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.18;
    }
  });

  const floors = 9;
  return (
    <group ref={group} position={[0, -1.6, 0]}>
      {/* Base pad */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[2.6, 2.6, 0.14, 48]} />
        <meshStandardMaterial color="#0b1220" emissive="#0b1a2c" emissiveIntensity={0.4} />
      </mesh>
      {/* Floor plates */}
      {Array.from({ length: floors }).map((_, i) => {
        const y = 0.2 + i * 0.46;
        const t = i / (floors - 1);
        const size = 1.7 - t * 0.35;
        const color = i % 3 === 0 ? "#2DD4BF" : i % 3 === 1 ? "#3B82F6" : "#8B5CF6";
        return <Floor key={i} y={y} size={size} color={color} opacity={0.32} />;
      })}
      {/* Wireframe outer shell */}
      <Wireframe size={1.75} height={4.4} />
      {/* Top spire */}
      <mesh position={[0, 4.4, 0]}>
        <coneGeometry args={[0.18, 0.6, 16]} />
        <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1.2} />
      </mesh>
      {/* Point light inside */}
      <pointLight position={[0, 2, 0]} intensity={2.6} color="#2DD4BF" distance={6} />
      <pointLight position={[2, 3, 2]} intensity={1.4} color="#3B82F6" distance={8} />
      <pointLight position={[-2, 1, -2]} intensity={1.4} color="#8B5CF6" distance={8} />
    </group>
  );
};

const OrbitRing = ({ radius = 3, tilt = 0.4, color = "#2DD4BF", speed = 0.15 }) => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * speed;
  });
  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.008, 16, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

export default function Building3D() {
  return (
    <Canvas
      camera={{ position: [5.5, 3.6, 5.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 8, 4]} intensity={0.9} color="#a5f3fc" />
      <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.2}>
        <BuildingModel />
      </Float>
      <OrbitRing radius={3.1} tilt={0.35} color="#2DD4BF" speed={0.15} />
      <OrbitRing radius={3.6} tilt={-0.5} color="#3B82F6" speed={-0.1} />
      <OrbitRing radius={4.1} tilt={0.9} color="#8B5CF6" speed={0.08} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 3.5}
      />
    </Canvas>
  );
}
