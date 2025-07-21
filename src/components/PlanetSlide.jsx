import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { RotatingPlanet } from './RotatingPlanet'

export default function PlanetSlide({ modelPath, scale, rotation, isActive, isVisible }) {
  if (!isVisible) return null 

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={modelPath}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          <directionalLight position={[20, 20, 5]} intensity={2} castShadow />
          <ambientLight intensity={0.032} />
          <Suspense fallback={null}>
            <RotatingPlanet
              modelPath={modelPath}
              scale={scale}
              initialRotation={rotation}
            />
          </Suspense>
        </Canvas>
      </motion.div>
    </AnimatePresence>
  )
}
