import { BellRing, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function Header() {
  return (
    <div className="sticky top-0 z-50    bg-background border-b border-accent flex justify-between pt-5 pb-5 px-10">
      <div className="flex items-center  font-semibold text-lg flex-1/10 ">
        <Image
          src="/logo.png"
          alt={"logo"}
          height={20}
          width={40}
          className="mr-2"
        />
        Global
      </div>
      <div className="flex-9/10 justify-end   flex md:justify-between items-center">
        <div className="hidden md:block">
          <p className="font-semibold">Messages</p>
          <p className="text-muted text-sm">Chats between parties</p>
        </div>
        <div className="flex gap-2  ">
          <div className="flex bg-accent border border-[#6f8199] items-center gap-2 p-1 justify-center rounded-md">
            <BellRing size={18} />
            <span className="bg-[#17334a] w-6 h-7  flex justify-center items-center rounded-sm">2</span>
          </div>
          <div className=" hidden md:flex border items-center border-[#6f8199] rounded-md  shadow bg-accent">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <p className="text-sm">Alisa Wilson</p>
                <p className="text-sm text-muted ">@alisa_w</p>
            </div>
            <div>
                <ChevronRight/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
