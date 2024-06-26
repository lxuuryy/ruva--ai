'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '../../utils/db'
import { MockInterview } from '../../utils/schema'
import { eq, desc, orderBy } from 'drizzle-orm'
import { Inter } from 'next/font/google'
import InterviewCard from './InterviewCard'
import InterviewCard2 from './InterviewCard2'

function InterviewList() {

    const { user} = useUser()

    const [interviews, setInterviews] = React.useState([{}])

    React.useEffect(() => { 
       user && getInterviews()
    }, [user])

    const getInterviews = async () => {
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(MockInterview.id))
        console.log(result)
        setInterviews(result)
       
    
    }
  return (
    <div className=' z-[999]  md:m-[40px] relative overflow-hidden'>
        <h1 className='font-bold text-[45px] md:text-[70px] m-2 mt-[50px]'>Previous Interviews</h1>
      
<div className='w-full flex overflow-hidden flex-wrap  items-center'>
{
            interviews.length > 0 && interviews.map((item, index) => (
                <InterviewCard2 key={index} item={item} />
            ))
        }
        </div>
        
    </div>
  )
}

export default InterviewList