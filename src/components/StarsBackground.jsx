import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function CustomStars() {
  const starCount = 6000
  const positions = useRef(new Float32Array(starCount * 3))
  const opacities = useRef(new Float32Array(starCount))
  const geometryRef = useRef()
  const materialRef = useRef()
  const groupRef = useRef()

  // Ініціалізація позицій та опацитетів (лише кожна 10-та зірка буде миготлива)
  if (!positions.current.filled) {
    for (let i = 0; i < starCount; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 300
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 300
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 300
      opacities.current[i] = i % 10 === 0 ? 0.5 : 1
    }
    positions.current.filled = true
  }

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (materialRef.current) {
      materialRef.current.opacity = 0.5 + Math.sin(t * 0.02) * 0.05
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.00015
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            array={positions.current}
            itemSize={3}
            count={starCount}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          size={0.12}
          sizeAttenuation
          color="white"
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

export default function StarsBackground() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
      }}
      camera={{ position: [10, 0, 5], fov: 40 }}
    >
      <ambientLight intensity={0.05} />
      <CustomStars />
    </Canvas>
  )
}
