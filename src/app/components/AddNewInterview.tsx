'use client'
import React from 'react'

import Form from './Form'
import {useClerk, useUser} from '@clerk/nextjs'
import { useRouter } from 'next/navigation'; 
import { Plus } from "lucide-react"
import { Button } from '../../components/ui/button'

type Props = {} 

function AddNewInterview({}: Props) {

  const {isSignedIn, user} = useUser();
  const {signOut} = useClerk();

  const router = useRouter();

  React.useEffect(() => {

  
   
      if (isSignedIn === false) {
        router.push('/sign-in')
      }
   
  
    console.log(isSignedIn)
   

  }, [isSignedIn]);

    const [dialog, setDialog] = React.useState(false)
    const [jobPosition, setJobPosition] = React.useState('')
    const [jobDescription, setJobDescription] = React.useState('')
    const [experience, setExperience] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [jsonResponse, setJsonResponse] = React.useState('')

   const jobPositionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
         setJobPosition(e.target.value)
   }

    const jobDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setJobDescription(e.target.value)
    }

    const experienceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExperience(e.target.value)
    }
  return (
    <div className='relative md:mt-[100px] z-[999] w-full overflow-hidden '>
        <div className='md:m-[40px]'>
            <h1 className='m-2 font-bold text-[45px] md:text-[70px]'> Interviews</h1>

        
        <Button className=' z-[999] w-[200px] py-[10px] text-white m-2' onClick={() => setDialog((prev) => !prev)} >Add Interview <Plus /> </Button>
        <Form dialog={dialog} setDialog={setDialog} jsonResponse={jsonResponse} setJsonResponse={setJsonResponse} loading={loading} setLoading={setLoading} setExperience={setExperience} setJobDescription={setJobDescription} setJobPosition={setJobPosition}   jobDescription={jobDescription} jobPosition={jobPosition} experience={experience} 
        jobPositionHandler={jobPositionHandler} jobDescriptionHandler={jobDescriptionHandler} experienceHandler={experienceHandler} />
        </div>
    </div>
  )
}

export default AddNewInterview