'use client'
import React from 'react'
import { BackgroundGradientAnimationDemo } from '../components/ui/BackgroundGradientAnimationDemo'
import { useUser } from '@clerk/nextjs'
import {useRouter } from 'next/navigation'
type Props = {}

function page({}: Props) {

  const {isSignedIn, user } = useUser();

  const router = useRouter();

  React.useEffect(() => {

    if(!isSignedIn){
      router.push('/sign-in')
    }
  
    if(isSignedIn){
      return
    }

  }, []);
  return (
    <div>
        <BackgroundGradientAnimationDemo />
    </div>
  )
}

export default page