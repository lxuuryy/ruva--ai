import React from "react";
import { FlipWords } from "./flip-words.tsx";

export default function FlipWordsDemo() {
  const words = ["generating", "creating", "designing", "building"];

  return (
    <div className="mt-[150px] flex justify-center items-center px-4">
      <div className="text-xl md:text-4xl w-full relative left-10 font-normal text-white">
        Ruva is
        <FlipWords duration={1500} words={words} /> <br />
        top notch questions for you
      </div>
    </div>
  );
}
