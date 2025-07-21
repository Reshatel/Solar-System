import React from 'react'
import PlanetSlider from './components/PlanetSlider'
import StarsBackground from './components/StarsBackground'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, position: 'relative' }}>
      <StarsBackground />
      <PlanetSlider />
    </div>
  )
}

export default App
