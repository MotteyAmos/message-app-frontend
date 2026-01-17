"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ADD_A_FRIEND } from "@/lib/apolloClient/clientMutations";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client/react";
import { GET_FRIENDS, GET_LOGGED_IN_USER } from "@/lib/apolloClient/clientQuerys";
import { IloginInUser } from "../page";
import { Spinner } from "@/components/ui/spinner";
import { toastError, toastSuccess } from "@/lib/utils";
import { friendsData, loginUserVar } from "@/lib/apolloClient/apolloClient";
import { Ifriends } from "@/lib/types/generalTyps";

interface IProps {
 data: {
    _id: string;
    username: string;
    profilepicture: string;
};
 
  refetch: () => void;
}

export default function NotFriendCard({ data, refetch }: IProps) {
 const loginUserId = useReactiveVar(loginUserVar);
 const friends = useReactiveVar<Ifriends["friends"]>(friendsData);

  const [addAFriend, { data:_, loading, error }] = useMutation(ADD_A_FRIEND, {
    variables: {
      userId: loginUserId,
      user2Id: data._id,
      roomName: data.username,
    },
    
  });

    const {  refetch:refetchFriends } = useQuery(GET_FRIENDS, {
      variables: {
        userId: loginUserId,
      },
    });
  
     const updateFriendsData = ()=>{
    
          friendsData([...friends, data]);
      }

  const handleSubmit = async () => {
    try {
      const { data:_data } = await addAFriend();
      console.log(_data);
      toastSuccess(_data?.message || "Congrat!!!, you guys are now friends");
      updateFriendsData()
      refetch();

    } catch (error) {
      console.log(error);
      toastError(
        error?.message || "sorry an error occured while adding your new freind"
      );
    }
  };
  return (
    <div className="flex items-center justify-between coursor-pointer px-10  py-5 hover:bg-[#153145] hover:border-y transition-all ease h-20 duration-300 backdrop-blur-lg cursor-pointer">
      <div className="flex items-center flex-1/2 gap-5">
        <div className="rounded-full bg-accent w-10 h-10  overflow-hidden">
          <Image
            src={`/person1.webp`}
            alt="friend image"
            height={50}
            width={50}
            className="rounded-full"
          />
        </div>
        <div className="text-xl capitalize">{data?.username}</div>
      </div>

      <div className="flex-1/2 justify-end flex">
        <Button
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          onClick={() => handleSubmit()}
          className="border w-30 bg-green-400 hover:bg-green-300 border-none cursor-pointer hover:ring rounded-full "
        >
          {loading ? <Spinner /> : <span>Add</span>}
        </Button>
      </div>
    </div>
  );
}
