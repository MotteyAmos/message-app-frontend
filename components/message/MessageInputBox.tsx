'use client'
import React,{useState} from "react";
import { Input } from "../ui/input";
import { Paperclip, SendHorizontal } from "lucide-react";
import { GrEmoji } from "react-icons/gr";
import { useMutation } from "@apollo/client/react";
import { CREATE_MESSAGE } from "@/lib/apolloClient/clientMutations";

export default function MessageInputBox() {
    const [createMessage, { data: _, loading }] = useMutation(CREATE_MESSAGE);
    const [userInput, setUserInput] = useState<string>();

    const handleInputChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setUserInput(e.target.value);
    }

    const send = async()=>{
        try {
            const loginUserId = localStorage.getItem("loginUserId");
            const chatRoomId = localStorage.getItem("chatRoomId");
            if(!userInput) return;
            await createMessage({
                variables:{ 
                    message:{
                        text:userInput,
                        senderId:loginUserId,
                        roomId:chatRoomId
                    }
                }
            });
            setUserInput("");
        } catch (error) {
            console.log("Error sending message:", error);
        }

  return (
    <div className="bg-accent z-40 flex  bottom-5 w-[90%] px-2 py-0 pb-2 rounded-md   min-h-20 max-h-132 items-center overflow-hidden ">
      {/* <Input type=''  placeholder=" " className=' bg-none flex-wrap flex '/> */}
      <textarea className=" flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 shadoow-none outline-none min-h-15 max-h-132" onChange={handleInputChange}></textarea>
      <div className="flex self-end gap-3 h-full  justify-center  " onClick={send}>
        <Paperclip size={20} />
        <GrEmoji size={20} />
        <SendHorizontal size={20} />
      </div>
    </div>
  );
}
