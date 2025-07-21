import React from 'react'
import './PlanetInfo.css'
import { motion, AnimatePresence } from 'framer-motion'

const planetDetails = {
  Earth: {
    description: 'Our home planet, rich with life and water.',
    temperature: 'Average Temp: 15°C',
  },
  Mars: {
    description: 'The Red Planet, a cold desert world.',
    temperature: 'Average Temp: -60°C',
  },
  Jupiter: {
    description: 'The largest planet in our solar system.',
    temperature: 'Average Temp: -145°C',
  },
  Saturn: {
    description: 'Famous for its rings made of ice and rock.',
    temperature: 'Average Temp: -178°C',
  },
  Uranus: {
    description: 'An icy giant with a unique tilt.',
    temperature: 'Average Temp: -224°C',
  },
  Neptune: {
    description: 'The farthest planet with strong winds.',
    temperature: 'Average Temp: -214°C',
  },
  Mercury: {
    description: 'The closest planet to the Sun.',
    temperature: 'Average Temp: 167°C',
  },
  Venus: {
    description: 'The hottest planet with thick clouds.',
    temperature: 'Average Temp: 464°C',
  },
}

export default function PlanetInfo({ planetName }) {
  const info = planetDetails[planetName]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={planetName}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="planet-info"
      >
        <h2 className="planet-name">{planetName}</h2>
        <p className="planet-description">{info?.description}</p>
        <p className="planet-temp">{info?.temperature}</p>
      </motion.div>
    </AnimatePresence>
  )
}
