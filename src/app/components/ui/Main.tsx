import React from 'react'
import { WavyBackgroundDemo } from './WavyBackgroundDemo'
import { MacbookScroll } from './macbook-scroll'
import BentoDemo from './BentoDemo'
import { FlipWords } from './flip-words'
import BackgroundBeamsDemo from './BackgroundBeamsDemo'

function Main() {
  const words = ['Hello', 'World', 'This', 'is', 'a', 'test']
  return (
    <div className='w-full '>
        <WavyBackgroundDemo />
        
        <div className=''>
        <BentoDemo />
        </div>
        <div className=''>
        <MacbookScroll />

        </div>
          <BackgroundBeamsDemo />
    </div>
  )
}

export default Main