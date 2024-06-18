'use client'
import React from 'react'
import Button from './Button'
import Form from './Form'

type Props = {}

function AddNewInterview({}: Props) {

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
    <div className=''>
        <div className='m-[40px]'>
            <h1 className='my-2 font-bold text-[70px]'> Interviews</h1>

        <Button setDialog={setDialog} dialog={false} />
        <Form dialog={dialog} setDialog={setDialog} jsonResponse={jsonResponse} setJsonResponse={setJsonResponse} loading={loading} setLoading={setLoading} setExperience={setExperience} setJobDescription={setJobDescription} setJobPosition={setJobPosition}   jobDescription={jobDescription} jobPosition={jobPosition} experience={experience} 
        jobPositionHandler={jobPositionHandler} jobDescriptionHandler={jobDescriptionHandler} experienceHandler={experienceHandler} />
        </div>
    </div>
  )
}

export default AddNewInterview