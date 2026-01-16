"use client";
import React from "react";
import MessageContainer from "./_components/MessageContainer";
import ChatRooms from "./_components/MessageList";
import { useState } from "react";

export default function Page() {
  const [chatRoomId, setChatRoomId] = useState<string>("");

  return (
    <div className="flex border  w-full h-full ">
      
        <ChatRooms setChatRoomId={setChatRoomId} />
      
     
        <MessageContainer roomId={chatRoomId} />
   
    </div>
  );
}
