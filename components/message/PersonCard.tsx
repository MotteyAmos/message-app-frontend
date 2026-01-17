import { chatRoomsVar } from "@/lib/apolloClient/apolloClient";
import Image from "next/image";
import React from "react";

interface props {
  username: string;
  roomId: string;
}
export default function PersonCard({ username, roomId }: props) {
  return (
    <div
      onClick={() => chatRoomsVar(roomId)}
      className="flex  justify-between  items-center p-5 hover:bg-[#153145] hover:border-y transition-all ease h-20 duration-300 backdrop-blur-lg cursor-pointer"
    >
      <div className="flex gap-2 ">
        <Image
          src={`/person1.webp`}
          alt="peron image"
          width={50}
          height={10}
          className="rounded-full"
        />
        <div className="">
          <p className="text-md">{username}</p>
          {/* <p className="text-sm text-[#1d78b9]">typing...</p> */}
        </div>
      </div>
      <div>06:14 PM</div>
    </div>
  );
}
