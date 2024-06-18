
'use client'
import React from 'react'
import { db } from '../../../utils/db'
import { MockInterview } from '../../../utils/schema'
import { eq } from 'drizzle-orm'
import QuestionSection from '../../components/QuestionSection'

function page({params}) {
  const [interviewDetails, setInterviewDetails] = React.useState()

    React.useEffect(() => {
        console.log(params)
        getInterviewDetails()
        
    }, [])

   


    const getInterviewDetails = async () => {
        const resp = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.mockId))

        const jsonResp = JSON.parse(resp[0].jsonMockResp)
        console.log(jsonResp)
        setInterviewDetails(jsonResp)

    }

React.useEffect(() => {
    console.log(params)
    console.log(interviewDetails)
}, [interviewDetails])



  return (
    <div className='start'>start page

      <QuestionSection mockInterviewQuestion={interviewDetails} params={params.mockId} />  
    </div>
  )
}

export default page