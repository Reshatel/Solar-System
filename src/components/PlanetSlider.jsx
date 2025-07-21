import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import './PlanetSlider.css'
import 'swiper/css'
import 'swiper/css/navigation'
import PlanetSlide from './PlanetSlide'
import PlanetInfo from './PlanetInfo'


const planets = [
  { name: 'Earth', model: 'assets/earth.glb', scale: 0.9 },
  { name: 'Mars', model: 'assets/mars.glb', scale: 0.11 },
  { name: 'Jupiter', model: 'assets/jupiter.glb', scale: 0.019 },
  { name: 'Saturn', model: 'assets/saturn.glb', scale: 1.2, rotation: [0.3, 1.2, 0] },
  { name: 'Uranus', model: 'assets/uranus.glb', scale: 0.00199, rotation: [2, 1.2, 0] },
  { name: 'Neptune', model: 'assets/neptune.glb', scale: 0.14 },
  // { name: 'Sun', model: 'assets/sun.glb', scale: 0.2599 },
  { name: 'Mercury', model: 'assets/mercury.glb', scale: 0.1599 },
  { name: 'Venus', model: 'assets/venus.glb', scale: 0.009 },
]

export default function PlanetSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div style={{ position: 'relative', zIndex: 1, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        allowTouchMove={false}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        style={{ width: '100%', height: '100%' }}
      >
        {planets.map((planet, index) => {
          const isVisible =
            index === activeIndex ||
            index === (activeIndex + 1) % planets.length ||
            index === (activeIndex - 1 + planets.length) % planets.length

          return (
            <SwiperSlide key={planet.name}>
              <PlanetSlide
                isVisible={isVisible}
                isActive={index === activeIndex}
                modelPath={planet.model}
                scale={planet.scale}
                rotation={planet.rotation || [0, 0, 0]}
              />
              
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div className="planet-info-wrapper">
        <PlanetInfo planetName={planets[activeIndex].name} />
      </div>

    </div>
  )
}
