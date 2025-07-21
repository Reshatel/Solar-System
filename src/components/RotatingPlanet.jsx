import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export function RotatingPlanet({ modelPath, scale, initialRotation }) {
  const groupRef = useRef()
  const velocity = useRef({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })

  const { scene } = useGLTF(modelPath)

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(...initialRotation)
    }
  }, [scene])

  const handlePointerDown = (e) => {
    setIsDragging(true)
    setLastPos({ x: e.clientX, y: e.clientY })
  }

  const handlePointerUp = () => setIsDragging(false)

  const handlePointerMove = (e) => {
    if (!isDragging || !groupRef.current) return

    const deltaX = e.clientX - lastPos.x
    const deltaY = e.clientY - lastPos.y

    groupRef.current.rotation.y += deltaX * 0.005
    groupRef.current.rotation.x += deltaY * 0.005

    velocity.current = { x: deltaY * 0.005, y: deltaX * 0.005 }

    setLastPos({ x: e.clientX, y: e.clientY })
  }

  useFrame(() => {
    if (!groupRef.current) return

    // Після drag — інерція
    if (!isDragging && (Math.abs(velocity.current.x) > 0.0001 || Math.abs(velocity.current.y) > 0.0001)) {
      groupRef.current.rotation.y += velocity.current.y
      groupRef.current.rotation.x += velocity.current.x

      velocity.current.y *= 0.95
      velocity.current.x *= 0.95
    }

    // Автоматичне обертання по осі X (повільне)
    if (!isDragging && Math.abs(velocity.current.y) < 0.0001 && Math.abs(velocity.current.x) < 0.0001) {
      groupRef.current.rotation.y -= 0.002
    }
  })

  return (
    <group
      ref={groupRef}
      scale={scale}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <primitive object={scene} />
    </group>
  )
}
