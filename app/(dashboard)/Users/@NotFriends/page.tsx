"use client";
import {
  GET_LOGGED_IN_USER,
  GET_NOT_FRIENDS,
} from "@/lib/apolloClient/clientQuerys";
import NotFriendCard from "./_components/FriendCard";
import { useQuery } from "@apollo/client/react";
import { INotfriends } from "@/lib/types/generalTyps";

export interface IloginInUser {
  loggedInUser: {
    _id: string;
    username: string;
  };
}
export default function Page(){
  const { data: loginUser } = useQuery(GET_LOGGED_IN_USER);
  const _loginUser = loginUser as IloginInUser;
const loginUserId = localStorage.getItem("loginUserId")

  const { data, loading, refetch } = useQuery(GET_NOT_FRIENDS, {
    variables: {
      userId: _loginUser?.loggedInUser?._id  || loginUserId,
    },
  });

  const notFriendsData = data as INotfriends;

  


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border top-21  z-200 right-0 flex-1/2  h-[calc(100%-5.4rem)]  overflow-y-auto">
      {notFriendsData?.notFriends?.map((data, index) => {
        return <div key={index}>
            <NotFriendCard username={data?.username} _id={data?._id} roomName={data?.username} profile={data?.profilepicture} refetch={refetch}/>
        </div>;
      })}
     
    </div>
  );
}
