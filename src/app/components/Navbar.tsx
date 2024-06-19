"use client";
import { SignOutButton, UserButton, useClerk, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import {useRouter} from 'next/navigation';



import React from 'react'

function Navbar() {


    const router = useRouter();
    const {isSignedIn, user} = useUser();
    const {signOut} = useClerk();

   

  return (
    <div className="w-full relative z-10">
         
          {
                isSignedIn ? (
                    <div>
                        <UserButton />
                        <SignOutButton />
                    </div>
                ) : (
                    <div>
                    <Link href="/sign-in">
                       
                        Sign in
                        
                    </Link>
                    </div>
                )
          }
    </div>
  )
}

export default Navbar