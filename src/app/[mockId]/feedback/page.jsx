'use client'
import React from 'react'
import { db } from '../../../utils/db'
import { MockInterview, UserAnswers } from '../../../utils/schema'
import { eq } from 'drizzle-orm'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../components/ui/collapsible'
import { Button } from '../../../components/ui/button'
import { ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

function page({params}) {

    const [feedback, setFeedback] = React.useState([])

    const router = useRouter()

    const getFeedback = async () => {
        const result = await db.select().from(UserAnswers)
        .where(eq(UserAnswers.mockIdRef, params.mockId))
        .orderBy(UserAnswers.id)
        console.log(result)
        setFeedback(result)
        
    }

    React.useEffect(() => {
        console.log(params.mockId)
        getFeedback()
    }, [])


   
  return (
    <div> feedback page
      { feedback.length > 0 ? <div> <div>
            <h1>Congratulations!</h1>
            <p>Thank you for participating in the mock interview. Please provide your feedback below.</p>

        </div>
        <div className='max-w-[300px]'>
        {
            feedback && feedback.map((item, index) => (
                <div key={index}>
                    <Collapsible>
                        <CollapsibleTrigger className='flex'>{item.question} <ChevronsUpDown /></CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <div><h2 ><strong style={{color:'red'}}>Rating:</strong>{item.rating}</h2></div>
                            <div style={{color:'red'}}><h2><strong style={{color:'red'}}>Your Answer: </strong>{item.userAns}</h2></div>
                            <div><h2><strong style={{color:'white'}}>Ruva's feedback: </strong>{item.feedback}</h2></div>
                            <div className='bg-green-50' ><h2 style={{color:'green'}}><strong className='text-green-950'>Feedback:</strong>{item.correctAnswer}</h2></div>
                        </CollapsibleContent>
</Collapsible>

                </div>
            ))
        }
        </div> </div> : <div> <h1>No feedback available</h1></div>}
        <Button onClick={() => router.replace('/')}>Go Home</Button>
    </div>
  )
}

export default page