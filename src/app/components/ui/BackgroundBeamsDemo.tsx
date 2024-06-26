"use client";
import React from "react";
import { BackgroundBeams } from "./background-beams";

export default function BackgroundBeamsDemo() {
  return (
    <div className="relative mt-[-600px] md:mt-[100px] 2xl:mt-[0px]">
  <div className=" bg-gradient-to-t z-[99] relative top-[10px] from-black h-[150px] w-full"></div>    <div className="h-[40rem]  w-full rounded-md bg-black relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Contact Us
        </h1>
        <p></p>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            We are always here to help you with any queries you have. Drop us a
            message and we will get back to you as soon as possible.
        </p>
        <input
          type="text"
          placeholder="hi@manuarora.in"
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
        />
      </div>
      <BackgroundBeams />
    </div>
    </div>
  );
}
