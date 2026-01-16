"use client"
import React from "react";
import FriendCard from "./_components/FriendCard";
import { useQuery } from "@apollo/client/react";
import { IloginInUser } from "../@NotFriends/page";
import { GET_FRIENDS, GET_LOGGED_IN_USER, GET_NOT_FRIENDS } from "@/lib/apolloClient/clientQuerys";
import { Ifriends, INotfriends } from "@/lib/types/generalTyps";
import { useEffect } from "react";


export default function Page() {
  const { data: loginUser } = useQuery(GET_LOGGED_IN_USER);
  const _loginUser = loginUser as IloginInUser;
    const loginUserId = localStorage.getItem("loginUserId")

  const { data, loading, refetch } = useQuery(GET_FRIENDS, {
    variables: {
      userId: _loginUser?.loggedInUser?._id || loginUserId,
    },
  });




  const friendsData = data as Ifriends;

  


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="border  flex-1/2  shrink-0 top-21  z-200 border-muted bg-accent backdrop-blur-lg   h-[calc(100%-5.4rem)]  overflow-y-auto ">
      {friendsData?.friends?.map((data, index) => {
              return <div key={index}>
                  <FriendCard  username={data?.username} _id={data?._id} profile={data?.profilepicture} refetch={refetch}/>
              </div>;
            })}
     

    </div>
  );
}
