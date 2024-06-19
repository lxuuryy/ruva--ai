import React from 'react'
import {Plus } from 'lucide-react'

function ShinyButton({setDialog}) {
  return (
    <div class="relative inline-flex  group my-[35px] mx-2">
        <div
            class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#E11D48] via-[#E11D48] to-[#E11D48] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
        </div>
        <a href="#" title="Get quote now" onClick={() => setDialog(true)}
            class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            role="button">Add new interview <Plus />
        </a>
    </div>
  )
}

export default ShinyButton