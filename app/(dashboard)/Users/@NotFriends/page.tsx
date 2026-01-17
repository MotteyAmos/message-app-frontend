"use client";
import {
  GET_LOGGED_IN_USER,
  GET_NOT_FRIENDS,
} from "@/lib/apolloClient/clientQuerys";
import NotFriendCard from "./_components/FriendCard";
import { useQuery, useReactiveVar } from "@apollo/client/react";
import { INotfriends } from "@/lib/types/generalTyps";
import { loginUserVar, notFriendsData as _notFriendsData } from "@/lib/apolloClient/apolloClient";
import { useEffect } from "react";

export interface IloginInUser {
  loggedInUser: {
    _id: string;
    username: string;
  };
}
export default function Page(){

  const loginUserId = useReactiveVar(loginUserVar);
const _data = useReactiveVar<INotfriends["notFriends"]>(_notFriendsData);

  const { data, loading, refetch } = useQuery(GET_NOT_FRIENDS, {
    variables: {
      userId:  loginUserId,
    },
  });

  const notFriendsData = data as INotfriends;

  useEffect(() => {
    _notFriendsData(notFriendsData?.notFriends || []);
  }, [data]);

  


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border h-[calc(100%-5.4rem)]  overflow-y-auto">
      {_data?.map((data, index) => {
        return <div key={index}>
            <NotFriendCard data={data} refetch={refetch}/>
        </div>;
      })}
     
    </div>
  );
}
