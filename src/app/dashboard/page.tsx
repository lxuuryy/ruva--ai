'use client'
import React from 'react'
import AddNewInterview  from '../components/AddNewInterview'
import {motion, useMotionTemplate, useMotionValue, animate} from 'framer-motion'
import {Stars } from '@react-three/drei';
import {Canvas} from '@react-three/fiber'
import InterviewList from '../components/InterviewList'
import StarsBackground2 from '../components/ui/StarsBackground2';

function page() {

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
    <motion.div >
    <div className='absolute'>
      
       </div>
       <div className='relative h-[100vh] bottom-0 md:mt-[-150px] w-full '>
       <StarsBackground2 />
       </div>
       
    </motion.div>
  )
}

export default page