"use client";
import React from "react";
import FriendCard from "./_components/FriendCard";
import { useQuery, useReactiveVar } from "@apollo/client/react";
import { IloginInUser } from "../@NotFriends/page";
import {
  GET_FRIENDS,
  GET_LOGGED_IN_USER,
  GET_NOT_FRIENDS,
} from "@/lib/apolloClient/clientQuerys";
import { Ifriends, INotfriends } from "@/lib/types/generalTyps";
import { useEffect } from "react";
import { loginUserVar } from "@/lib/apolloClient/apolloClient";
import { friendsData } from "@/lib/apolloClient/apolloClient";

export default function Page() {
  const loginUserId = useReactiveVar(loginUserVar);
  const _data = useReactiveVar<Ifriends["friends"]>(friendsData);
  const { data, loading, refetch } = useQuery(GET_FRIENDS, {
    variables: {
      userId: loginUserId,
    },
  });

  const _friendsData = data as Ifriends;
  useEffect(() => {
    friendsData(_friendsData?.friends || []);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border   shrink-0   z-200 border-muted bg-accent backdrop-blur-lg   h-[calc(100%-5.4rem)]  overflow-y-auto ">
      {_data?.map((data, index) => {
        return (
          <div key={index}>
            <FriendCard
             
              data={data}
          
              refetch={refetch}
            />
          </div>
        );
      })}
    </div>
  );
}
