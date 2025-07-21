import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import PlanetSlide from './PlanetSlide'

export default function PlanetScene({ planet }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <directionalLight position={[20, 20, 5]} intensity={2} castShadow />
      <ambientLight intensity={0.07} />

      <Suspense fallback={null}>
        <PlanetSlide
          modelPath={planet.model}
          scale={planet.scale}
          rotation={planet.rotation || [0, 0, 0]}
        />
      </Suspense>
    </Canvas>
  )
}
