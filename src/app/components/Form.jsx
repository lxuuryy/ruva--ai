'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import { chatSession } from "../../utils/GeminiAIModal"

import { Loader2, LoaderCircle } from "lucide-react"
import {db} from '../../utils/db'
import  {MockInterview } from '../../utils/schema'
import { uuid } from 'uuidv4';
import { useUser } from "@clerk/nextjs"
import moment from 'moment'
import {useRouter} from 'next/navigation'
import PropagateLoader  from "react-spinners/PropagateLoader";

const override = {
  display: "flex",
 width: "100%",
  justifyContent: "center",
  alignItems: "center",
  borderColor: "red",
  marginLeft: "10px",
};


export default function DialogDemo({ dialog, setJsonResponse, jsonResponse, loading, setLoading, jobDescription, jobPosition, experience, setDialog,setExperience, setJobDescription, setJobPosition, jobDescriptionHandler, jobPositionHandler, experienceHandler} ) {


  let [color, setColor] = React.useState("white");
const router = useRouter()
  const {user} = useUser()
  const handleClick = () => {
    setDialog(false)
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault()
setLoading(true)
    if (!jobPosition || !jobDescription || !experience) {
      
      alert('Please fill in all the fields')
      return
    }
    e.preventDefault()

    const inputPrompt = 'Job Position:' +jobPosition+ ' Job Description: '+jobDescription+'Years of Experience:'+experience+', Base on the job information here, generate 5 interview questions and answers in JSON format, please provide questions and answers as filed in JSON'
    

    const result = await chatSession.sendMessage(inputPrompt)
    const mockJsonResponse = (result.response.text()).replace('```json','').replace('```','')

    console.log(JSON.parse(mockJsonResponse))
    setJsonResponse(mockJsonResponse)

    if(mockJsonResponse){
      const resp = await db.insert(MockInterview)
      .values({
        mockId: uuid(),
        jsonMockResp: mockJsonResponse,
        jobDesc: jobDescription,  // Ensure this matches your schema
        jobPosition: jobPosition,
        jobExperience: experience,
        createdAt: moment().format('DD-MM-YYYY'),
        createdBy: user?.primaryEmailAddress?.emailAddress,  
        
  
        }).returning({mockId:MockInterview.mockId})
        setDialog(false)
       
        console.log('inserted ID' , resp)

        if(resp){
          router.push(`/${resp[0]?.mockId}`)
        }
    }
   
     

      
    
    setLoading(false)
  }

  
  return (
     <Dialog open={dialog}>
      
        <DialogContent className="sm:max-w-[725px] z-[999] rounded-xl">
          <DialogHeader>
            <DialogTitle>Add your interview details</DialogTitle>
            <DialogDescription>
              Fill in all the details to get the full experience of the interview
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-xs md:text-sm">
                Job Position / Role
              </Label>
              <Input
                id="name"
                className="col-span-3"
                onChange={jobPositionHandler}
                value={jobPosition}
                required
                placeholder="e.g. Software Engineer, Data Analyst, etc."

              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stack" className="text-right md:text-sm">
                Job Description
              </Label>
              <Input
                id="stack"
                className="col-span-3"
                onChange={jobDescriptionHandler}
                value={jobDescription}
                required
                placeholder="e.g. Fullstack Developer, Frontend Developer, etc."
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right md:text-sm">
                Years of experience
              </Label>
              <Input
                id="experience"
                className="col-span-3"
                onChange={experienceHandler}
                value={experience}
                placeholder="e.g. 2 years, 5 years, etc."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleClick} variant="outline" className="my-2">
              Close
            </Button>
            <Button type="submit" className="my-2" disabled={loading} onClick={handleSubmit}>{loading ? <>  <Loader2 className="animate-spin"
      /> Ruva is in the works </>: 'Generate with Ruva'}</Button>
          </DialogFooter>
        </DialogContent>
     
    </Dialog>
  )
}
