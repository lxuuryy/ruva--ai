"use client";
import { SignOutButton, UserButton, useClerk, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import {useRouter} from 'next/navigation';
import {Button} from "../../components/ui/button";
import {addFreeCredits} from '../util/action';
import {toast} from 'sonner'
import {Zap} from 'lucide-react'
import SubscriptionDialog from "./ui/SubscriptionDialog";



import React from 'react'

function Navbar() {

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };


    const router = useRouter();
    const {isSignedIn, user} = useUser();
    const {signOut, session} = useClerk();

    const credits = user?.publicMetadata?.credits as number;
    const newUser = typeof credits === 'undefined';
    const notNewUser = credits === 0  ;


   const redeemCredits = async () => {
    const { success, error} = await addFreeCredits();

    if(error){
        toast.error(error)
    } 

    toast.success('10 credits added to your account')
    session?.reload()
   }

  return (
    <div className="w-full relative z-10 flex justify-between">
         
          {
                isSignedIn ? (
                    <div className="w-full flex justify-between items-center">
                        <div>
                        <UserButton />
                        <SignOutButton />
                        </div>
                        <div className="m-2">
                        {isSignedIn && newUser && (<Button onClick={redeemCredits}> Redeem 10 credits </Button>)}
                        <div className="flex my-2 mx-2">
                            {isSignedIn && !newUser && (<Button className=" mx-2"> <Zap />  Credits: {credits} </Button>)}
                            {isSignedIn && notNewUser && (
                            <div>
                            <Button className=" mx-2" onClick={toggleDrawer}> Get more credits </Button>
                            <SubscriptionDialog open={isDrawerOpen} onOpenChange={setIsDrawerOpen} />
                            </div>)}
                        
                        
                        </div>
                        </div>
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