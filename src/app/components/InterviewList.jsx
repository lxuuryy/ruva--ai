'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '../../utils/db'
import { MockInterview } from '../../utils/schema'
import { eq, desc, orderBy } from 'drizzle-orm'
import { Inter } from 'next/font/google'
import InterviewCard from './InterviewCard'

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
    <div className='m-[40px]'>
        <h1 className='font-bold text-[70px] my-2'>Previous Interviews</h1>
        {
            interviews.length > 0 && interviews.map((item, index) => (
                <InterviewCard key={index} item={item} />
            ))
        }
        
    </div>
  )
}

export default InterviewList