'use client'
import Image from "next/image";
import { SignOutButton, UserButton, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "./components/Button";
import AddNewInterview from "./components/AddNewInterview";
import InterviewList from "./components/InterviewList";
import { BackgroundGradientAnimationDemo } from "./components/ui/BackgroundGradientAnimationDemo";


export default function Home() {

  const router = useRouter();

  const {isSignedIn, user} = useUser();
  const {signOut} = useClerk();

  React.useEffect(() => {

    if(!isSignedIn){
      router.push('/sign-in')
    }
  
    if(isSignedIn){
      router.push('/')
    }

  }, []);



  return (
    <main className="h-[100vh] w-full">
      <div className="fixed top-0">
    <BackgroundGradientAnimationDemo />
    </div>
  <AddNewInterview />

    <div className="absolute">
      <InterviewList />
    </div>
    </main>
  );
}
