'use client'
import React from 'react'

import {motion, useMotionTemplate, useMotionValue, animate} from 'framer-motion'
import {Stars } from '@react-three/drei';
import {Canvas} from '@react-three/fiber'
type Props = {}

function StarsBackground({}: Props) {

    const COLORS = ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#1D4ED8', '#1E40AF', '#1E3A8A'] // Different shades of blue
    const color = useMotionValue(COLORS[0])
    const backgroundImage = useMotionTemplate`radial-gradient(120% 120% at 50% 0%, black 50%, ${color})`

    React.useEffect(() => {

        animate(color, COLORS,{
            ease: 'easeInOut',
            duration: 10,
            repeat: Infinity,
            repeatType: 'mirror'
        })
    }, [])

    
  return (
    <motion.div
         style={{
        backgroundImage: backgroundImage
    }} 
    className='min-h-screen w-full relative '>
       <div className='absolute inset-0 '>
        <Canvas>
            <Stars radius={50} count={500} factor={4} fade speed={2} />
        </Canvas>
        
       </div>
    </motion.div>
  )
}

export default StarsBackground