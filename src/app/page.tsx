'use client'
import Image from "next/image";
import { SignOutButton, UserButton, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "./components/Button";
import AddNewInterview from "./components/AddNewInterview";
import InterviewList from "./components/InterviewList";
import { BackgroundGradientAnimationDemo } from "./components/ui/BackgroundGradientAnimationDemo";
import Main from "./components/ui/Main";



export default function Home() {

  const router = useRouter();

  const {isSignedIn, user} = useUser();
  const {signOut} = useClerk();





  return (
    <main className="">
        <Main />
    </main>
  );
}
