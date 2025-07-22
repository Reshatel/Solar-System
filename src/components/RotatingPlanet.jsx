import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export function RotatingPlanet({ modelPath, scale, initialRotation }) {
  const groupRef = useRef()
  const velocity = useRef({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })

  const baseScale = useRef(scale) // Зберігаємо оригінальний масштаб
  const [zoomFactor, setZoomFactor] = useState(1)

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

  const handleWheel = (e) => {
    e.stopPropagation()
    const delta = e.deltaY * -0.001
    setZoomFactor((prev) => {
      const newZoom = Math.min(Math.max(prev + delta, 0.5), 5)
      return newZoom
    })
  }

  // Touch Zoom
  const lastDistance = useRef(null)

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (lastDistance.current !== null) {
        const delta = (distance - lastDistance.current) * 0.01
        setZoomFactor((prev) => {
          const newZoom = Math.min(Math.max(prev + delta, 0.5), 5)
          return newZoom
        })
      }

      lastDistance.current = distance
    }
  }

  const handleTouchEnd = () => {
    lastDistance.current = null
  }

  useFrame(() => {
    if (!groupRef.current) return

    if (!isDragging && (Math.abs(velocity.current.x) > 0.0001 || Math.abs(velocity.current.y) > 0.0001)) {
      groupRef.current.rotation.y += velocity.current.y
      groupRef.current.rotation.x += velocity.current.x

      velocity.current.y *= 0.95
      velocity.current.x *= 0.95
    }

    if (!isDragging && Math.abs(velocity.current.y) < 0.0001 && Math.abs(velocity.current.x) < 0.0001) {
      groupRef.current.rotation.y -= 0.002
    }
  })

  return (
    <group
      ref={groupRef}
      scale={[
        baseScale.current * zoomFactor,
        baseScale.current * zoomFactor,
        baseScale.current * zoomFactor
      ]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <primitive object={scene} />
    </group>
  )
}
