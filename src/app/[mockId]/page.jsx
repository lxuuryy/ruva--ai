'use client'
import { db } from '../../utils/db'
import { MockInterview } from '../../utils/schema'
import { eq } from 'drizzle-orm'
import React from 'react'
import Webcam from 'react-webcam'
import { Stars, Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {useRouter } from 'next/navigation'
import FlipWordsDemo from '../components/ui/FlipWordsDemo'
import InterviewCard3 from '../components/InterviewCard3'
import StarsBackground from '../components/ui/StarsBackground'


function page({params}) {
    React.useEffect(() => {
        console.log(params)
        getInterviewDetails()
    }, [])

    const router = useRouter()

    const [interviewDetails, setInterviewDetails] = React.useState()
    const [enableCamera, setEnableCamera] = React.useState(false)

    const goStart = () => {
        router.push(`/${params.mockId}/start`)
    }

    const getInterviewDetails = async () => {
      const result = await db.select().from(MockInterview)
      .where(eq(MockInterview.mockId, params.mockId))
      console.log(result)
      setInterviewDetails(result[0])
    }

    const showCamera = () => {
      setEnableCamera((prevValue) => !prevValue)
     }
  return (
    <div className=' w-full flex-col justify-center items-center  relative'>
      <div className='absolute inset-0 z-[999]'>
    <div className='moving flex relative left-[-20%] md:left-[-35%] justify-center items-center flex-col'>
    <FlipWordsDemo />
      <h1 className='font-normal mt-[50px] text-2xl'>Let's get started</h1>

    </div>
   <div className='items  '>
    <div className='flex justify-between items-center  z-[999]  '>
   {enableCamera ?  
   <div className=' z-30'>
    <div className='flex justify-center flex-col items-center w-full' ><Webcam
    className='w-[60%] h-[50%]   md:w-[100%] md:h-[100%] rounded-xl m-[20px] '
    onUserMedia={() => setEnableCamera(true)}
    onUserMediaError={() => setEnableCamera(false)}
    mirrored/></div>
    <div className='flex justify-between items-center m-[10px]'><Button variant='outline' onClick={showCamera}>Stop Camera</Button> <Button onClick={goStart}>Start</Button> </div>
    </div> : <div className='flex justify-between items-center  m-[10px] md:m-[0px] '><Button onClick={showCamera} > click to enable camera <Video onClick={showCamera} className='h-72' /></Button></div>}
   </div>
   
   <div className='details flex justify-center items-center flex-col text-center z-[999]'>
     
      <InterviewCard3 jobPosition={interviewDetails?.jobPosition} jobDesc={interviewDetails?.jobDesc}  jobExperience={interviewDetails?.jobExperience}/>
      </div>
      
   </div>
   </div>
   <div className='relative mt-[-100px] md:mt-[-150px] w-full h-full'> <StarsBackground /></div>
  
  </div>
  
  )
}

export default page