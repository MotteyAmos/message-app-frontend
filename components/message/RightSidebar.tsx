import React from 'react'
import { BsPinAngle } from "react-icons/bs";
import PersonCard from './PersonCard';

export default function RightSidebar() {
  return (
    <div className='flex-4/12  border border-t-0 border-l-0 border-r-0 border-muted bg-accent backdrop-blur-lg  '>
        <div className='flex items-center text-muted text-sm gap-1 p-2 '>
            <BsPinAngle className='rotate-280' size={24} />
            <span>Pinned Message</span>
        </div>
        <div className='overflow-y-auto h-full'>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>
            <PersonCard/>



        </div>
    </div>
  )
}
