'use client'
import React from 'react'
import { db } from '../../../utils/db'
import { MockInterview, UserAnswers } from '../../../utils/schema'
import { eq } from 'drizzle-orm'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../../components/ui/collapsible'
import { Button } from '../../../components/ui/button'
import { ChevronsUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import LinearGradient from '../../components/magicui/linear-gradient'
import ShineBorder from '../../components/magicui/shine-border'


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
    <div> 
      <LinearGradient />
      { feedback.length > 0 ? <div> <div>
            <h1 className='text-5xl'>Congratulations!</h1>
            <p className='mt-[10px]'>Thank you for participating in the mock interview. Please provide your feedback below.</p>

        </div>
        <div className=' '>
        {
            feedback && feedback.map((item, index) => (
                <div className='m-[10px]' key={index}>
                    <Collapsible>
                        <CollapsibleTrigger className='flex w-full'>Q{index+1}. {item.question} <ChevronsUpDown /></CollapsibleTrigger>
                        
                        <CollapsibleContent  className='m-[20px] flex flex-col justify-between'>
                          <div><h2 className="m-[20px] "><strong style={{color:'red'}}>Rating:</strong>{item.rating}</h2></div>
                            <div ><h2 className="m-[20px] "><strong style={{color:'white'}}>Your Answer: </strong>{item.userAns}</h2></div>
                            <div className='m-[20px] '><h2><strong className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-pink-500">
      Ruva's feedback: 
    </strong>{item.feedback}</h2></div>
                            <div className='m-[20px]' ><h2 ><strong style={{color:'green'}}>Better answer:</strong>{item.correctAnswer}</h2></div>
                        </CollapsibleContent>
</Collapsible>

                </div>
            ))
        }
        </div> </div> : <div> <h1>No feedback available</h1></div>}
        <div className='flex justify-end w-full'>
        <Button className='mr-[10px]' onClick={() => router.replace('/')}>Go Home</Button>
        </div>
    </div>
  )
}

export default page