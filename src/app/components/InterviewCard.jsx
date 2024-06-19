'use client'
import React from 'react'
import {Button} from '../../components/ui/button'
import Link from 'next/link'

function InterviewCard({item}) {
  return (
    <div className='relative'>
        <div className='description'>
            <h2>{item?.jobPosition}</h2>
            <p>{item?.jobDesc}</p>
            <p>{item?.jobExperience} years of experience</p>
            <div className='new--button'>
               <Link href={`/${item.mockId}/feedback`}>
            <Button>View Feedback</Button>
            </Link> 
            <Link href={`/${item.mockId}`}>
        <Button>Restart Interview</Button></Link>
        </div>
        </div>
       
    </div>
  )
}

export default InterviewCard