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
    <main className="overflow-hidden w-full">
      <div className="w-full h-full fixed top-0 flex flex-col">
    <BackgroundGradientAnimationDemo />
    </div>
    <div className="relative mt-[50px] mb-[100px] w-full flex justify-center">
    <p className="text-[30px]">Welcome {user?.firstName}! </p>
    </div>
  <AddNewInterview />

    <div className="absolute">
      <InterviewList />
    </div>
    </main>
  );
}
