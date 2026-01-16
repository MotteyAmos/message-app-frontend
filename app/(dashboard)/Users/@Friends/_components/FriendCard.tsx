"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IloginInUser } from "../../@NotFriends/page";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  GET_LOGGED_IN_USER,
  GET_NOT_FRIENDS,
} from "@/lib/apolloClient/clientQuerys";
import {
  ADD_A_FRIEND,
  REMOVE_A_FRIEND,
} from "@/lib/apolloClient/clientMutations";
import { toastError, toastSuccess } from "@/lib/utils";
import { IRemoveUserResponse } from "@/lib/types/generalTyps";
import { revalidateFriendsPath } from "@/lib/actions";


interface IProps {
  username: string;
  _id: string;
  profile?: string;
  refetch: () => void;
}
export default function FriendCard({ username, _id, refetch }: IProps) {
  const { data: loginUser } = useQuery(GET_LOGGED_IN_USER);
  const _loginUser = loginUser as IloginInUser;
  const loginUserId = localStorage.getItem("loginUserId");


  const [removeAFriend, { data, loading, error }] = useMutation(
    REMOVE_A_FRIEND,
    {
      variables: {
        userId: _loginUser?.loggedInUser?._id || loginUserId,
        user2Id: _id,
      },
    }
  );

  const { refetch: refetchNotFreinds } = useQuery(GET_NOT_FRIENDS, {
    variables: {
      userId: _loginUser?.loggedInUser?._id || loginUserId,
    },
  });

  const handleSubmit = async () => {
    try {
      const { data } = await removeAFriend();
      console.log(data);
      const response = data as IRemoveUserResponse;
      toastSuccess(
        response?.removeUser?.message || "Congrat!!!, you guys are now friends"
      );
      refetchNotFreinds();
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
        <div className="text-xl ">{username}</div>
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
