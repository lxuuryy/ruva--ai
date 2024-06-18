'use client'
import { db } from '../../utils/db'
import { MockInterview } from '../../utils/schema'
import { eq } from 'drizzle-orm'
import React from 'react'
import Webcam from 'react-webcam'
import { Video } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {useRouter } from 'next/navigation'


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
    <div className='h-[100vh] w-full flex-col justify-center items-center '>
    <div className='moving flex justify-center items-center'>
      <h1 className='font-bold text-2xl'>Let's get started</h1>

    </div>
   <div className='items'>
    <div>
   {enableCamera ?  
   <div>
    <div><Webcam
    style={{width: 300, height: 300}}
    onUserMedia={() => setEnableCamera(true)}
    onUserMediaError={() => setEnableCamera(false)}
    mirrored/></div>
    <div><Button onClick={showCamera}>Stop Camera</Button> <Button onClick={goStart}>Start</Button> </div>
    </div> : <div className='flex'><Button onClick={showCamera} > click to enable camera <Video onClick={showCamera} className='h-72' /></Button></div>}
   </div>
   
   <div className='details flex justify-center items-center flex-col text-center '>
      <h1>Mock Interview Details</h1>
      <div className='font-bold'>
        <p>Job Position: {interviewDetails?.jobPosition}</p>
        <p>Job Description: {interviewDetails?.jobDesc}</p>
        <p>Years of Experience: {interviewDetails?.jobExperience}</p>
      </div>
      </div>
   </div>
  </div>
  
  )
}

export default page