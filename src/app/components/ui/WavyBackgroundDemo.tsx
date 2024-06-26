"use client";
import React from "react";
import { WavyBackground } from "../ui/wavy-background";
import {Button} from '../../../components/ui/button'
import {useRouter} from 'next/navigation'
import { FlipWords } from "../ui/flip-words";

export function WavyBackgroundDemo() {

  const router = useRouter();

  const words = [
    "skills",
    "needs",
    "goals",
    "industry",
    
  ];
  

  return (
    <WavyBackground className="max-w-4xl mx-auto relative overflow-hidden flex flex-col  justify-center items-center">
        <div><p className="text-2xl md:text-4xl lg:text-xl text-white uppercase  inter-var text-center ">
        Designed to fit every use case
      </p>
      <p className="text-base md:text-6xl mt-8 pb-40 text-white font-normal inter-var text-center">
        Leverage the power of Ruva and excel in your interview
      </p>
      </div>
      
      <div> <Button onClick={()=> router.push(('/dashboard'))} variant='outline'>TRY NOW</Button>
      </div>
      <div className="flex w-full pb-[30px] mt-[150px] justify-center items-center text-4xl md:text-[42px]  text-center text-balance">
        <h1> We generate our questions to  your <span> <FlipWords className='relative left-[-5px]' words={words} /></span>  </h1>
      
      </div>
    </WavyBackground>
  );
}
