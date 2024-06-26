import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

  import React from 'react'
    import Link from 'next/link'
  
  function InterviewCard2({jobDesc, jobPosition, jobExperience}) {
    return (
      
        <Card className=" w-[250px] h-[200px] md:w-[350px] md:m-[20px] ">
        <CardHeader>
          <CardTitle  className="md:text-[20px] text-[16px] " >Job Position: {jobPosition}</CardTitle>
          
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full text-left gap-4">
              <div className="flex flex-col space-y-2.5 ">
                <Label className="md:text-[20px] " htmlFor="name">Job description: <strong> {jobDesc}</strong></Label>
                <Label className="md:text-[20px]"   htmlFor="name">Years of Experience: <strong>{jobExperience} </strong> </Label>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework"></Label>
               
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
        
        </CardFooter>
      </Card>
    
    )
  }
  
  export default InterviewCard2