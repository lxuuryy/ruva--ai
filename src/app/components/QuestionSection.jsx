'use client'
import React from 'react'
import dynamic from 'next/dynamic'  
import { Button } from '../../components/ui/button'
import Link from 'next/link'
import { deductCredits } from '../util/action'
import { useClerk } from '@clerk/nextjs'
import { Volume2 } from 'lucide-react'
import useSpeechToText from 'react-hook-speech-to-text';

const RecordAnswer = dynamic(() => import('./RecordAnswer'), { ssr: false });
 

function QuestionSection({mockInterviewQuestion, params}) {
    const { error, interimResult, isRecording, results, setResults, startSpeechToText, stopSpeechToText } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
      });

    const {session} = useClerk()

    const minusCredits = async () => {
        const {success, error} = await deductCredits()

        if(success){
            console.log('success')
        } else {
            console.log(error)
        }

        session?.reload()
        
    }

    const [userAnswer, setUserAnswer] = React.useState('');

    const textToSpeach = (text) => {
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text)
            speech.lang = 'en-US'
            window.speechSynthesis.speak(speech)
    }
}

React.useEffect(() => {

}, [])

const nextQuestion = () => {
    setUserAnswer('')
    setResults([])
    setActiveQuestion(activeQuestion+1)
}

const prevQuestion = () => {
    setUserAnswer('')
    setActiveQuestion(activeQuestion-1)
}

    const [activeQuestion, setActiveQuestion] = React.useState(0)
  return (
    <div className='video--part'>
        
        <div className='questions m-4'>
            <div className='line'>
            {mockInterviewQuestion?.map((question, index) => (
            <div key={index} className=''>
                <Button className={`${activeQuestion === index && 'active--color'} `}>Question {index+1}</Button>
               
            </div>
            ))}
            
            
            </div>
            <div className='section'>
        {mockInterviewQuestion && mockInterviewQuestion[activeQuestion]?.question}
            </div>
            <Volume2 style={{cursor:'pointer'}} onClick={() => textToSpeach(mockInterviewQuestion[activeQuestion]?.question)}/>
        </div>
        <div>
<div className='players'>
        <RecordAnswer activeQuestion={activeQuestion} userAnswer={userAnswer} setUserAnswer={setUserAnswer} mockInterviewQuestion={mockInterviewQuestion}  params={params}
        />
        </div>
        <div className='new--buttons'>
        {activeQuestion >0 && <Button onClick={prevQuestion}>Prev Question</Button>}
        {activeQuestion != mockInterviewQuestion?.length - 1 && <Button onClick={nextQuestion}>Next Question</Button>}
        {activeQuestion == mockInterviewQuestion?.length-1 && 
        <Link href={`/${params}/feedback`}>
        <Button onClick={minusCredits}>End Interview</Button> </Link>}
        
        </div>
        </div>
    </div>
  )
}

export default QuestionSection