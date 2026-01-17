"use client";
import React from "react";
import MessageContainer from "./_components/MessageContainer";
import ChatRooms from "./_components/MessageList";
import { useState } from "react";

export default function Page() {

  return (
    <div className="flex border  w-full h-full ">
      
        <ChatRooms />
      
     
        <MessageContainer  />
   
    </div>
  );
}
