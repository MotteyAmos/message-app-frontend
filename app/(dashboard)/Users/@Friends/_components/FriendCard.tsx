"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IloginInUser } from "../../@NotFriends/page";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client/react";
import {
  GET_LOGGED_IN_USER,
  GET_NOT_FRIENDS,
} from "@/lib/apolloClient/clientQuerys";
import {
  ADD_A_FRIEND,
  REMOVE_A_FRIEND,
} from "@/lib/apolloClient/clientMutations";
import { toastError, toastSuccess } from "@/lib/utils";
import { INotfriends, IRemoveUserResponse } from "@/lib/types/generalTyps";
import { revalidateFriendsPath } from "@/lib/actions";
import { loginUserVar } from "@/lib/apolloClient/apolloClient";
import { notFriendsData as _notFriendsData } from "@/lib/apolloClient/apolloClient";

interface IProps {
 data: {
    _id: string;
    username: string;
    profilepicture: string;
};
  refetch: () => void;
}
export default function FriendCard({ data, refetch }: IProps) {
   const loginUserId = useReactiveVar(loginUserVar);
  const notFriends = useReactiveVar<INotfriends["notFriends"]>(_notFriendsData);

  const [removeAFriend, { data:_, loading, error }] = useMutation(
    REMOVE_A_FRIEND,
    {
      variables: {
        userId:  loginUserId,
        user2Id: data._id,
      },
    }
  );

  const { refetch: refetchNotFreinds } = useQuery(GET_NOT_FRIENDS, {
    variables: {
      userId:  loginUserId,
    },
  });

  const updateNotFriendsData = ()=>{

      _notFriendsData([...notFriends, data]);
  }

  const handleSubmit = async () => {
    try {
      const { data:_data } = await removeAFriend();
      const response = _data as IRemoveUserResponse;

     updateNotFriendsData();
      toastSuccess(
        response?.removeUser?.message || "Congrat!!!, you guys are now friends"
      );
      
      refetch();
      await revalidateFriendsPath()

    } catch (error) {
      console.log(error);
      toastError(
        error?.message || "sorry an error occured while adding your new freind"
      );
    }
  };
  return (
    <div className="flex items-center justify-between coursor-pointer px-10 border-y  py-5 hover:bg-[#153145] hover:border-y transition-all ease h-20 duration-300 backdrop-blur-lg cursor-pointer">
      <div className="flex items-center flex-1/2 gap-2">
        <div className="rounded-full bg-accent w-10 h-10  overflow-hidden">
          <Image
            src={`/person1.webp`}
            alt="friend image"
            height={50}
            width={50}
            className="rounded-full"
          />
        </div>
        <div className="text-xl ">{data.username}</div>
      </div>

      <div className="flex-1/2 justify-end flex">
        <Button
          onClick={() => handleSubmit()}
          className="border  bg-red-400 border-none cursor-pointer hover:ring rounded-full "
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
