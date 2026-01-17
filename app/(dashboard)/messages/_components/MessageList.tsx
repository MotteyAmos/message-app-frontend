'use client';
import { BsPinAngle } from "react-icons/bs";
import PersonCard from "@/components/message/PersonCard";
import {
  GET_ALL_CHATROOMS,
  GET_LOGGED_IN_USER,
} from "@/lib/apolloClient/clientQuerys";
import { IloginInUser } from "../../Users/@NotFriends/page";
import { useQuery } from "@apollo/client/react";
import { IChatRooms } from "@/lib/types/generalTyps";
import { chatRoomsVar } from "@/lib/apolloClient/apolloClient";



export default function ChatRooms() {
  const { data: loginUser } = useQuery(GET_LOGGED_IN_USER);
  const _loginUser = loginUser as IloginInUser;

  const { data, error, loading, refetch } = useQuery(GET_ALL_CHATROOMS, {
    variables: {
      userId: _loginUser?.loggedInUser?._id ,
    },
  });

  const messageList = data as IChatRooms;


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" border border-t-0 border-l-0 border-r-0 border-muted bg-accent basis-4/13 grow backdrop-blur-lg  ">
      <div className="flex items-center text-muted text-sm gap-1 p-2 ">
        <BsPinAngle className="rotate-280" size={24} />
        <span>Pinned Message</span>
      </div>
      <div className="overflow-y-auto h-full">
        {messageList?.chatRooms?.map((room, index) => {
            if(index === 0){
                chatRoomsVar(room?._id)
            }
          return (
            <div key={index}>
              <PersonCard username={room?.name} roomId={room?._id} />
            </div>
          );
        })}
       
      </div>
    </div>
  );
}
