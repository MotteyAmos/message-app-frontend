import UserModel from "@/lib/db/module/auth/User";
import { conversationModel } from "@/lib/db/module/message/conversationModel";
import { AppError } from "@/lib/server/util/AppError";
import { comparePassword, hashPassword } from "@/lib/server/util/passWordHash";
import { ErrorCode } from "@/lib/types/enums";
import { ILoginDTO, IUserRegisterDTO } from "@/lib/types/generalTyps";
import { GraphQLError } from "graphql";

export const userResolver = {
  Query: {
    users: async () => {
      try {
        const users = await UserModel.find();
        return users;
      } catch (error) {
        console.log(error);
        throw new GraphQLError("an error occured while fetching users");
      }
    },

    notFriends: async (_: unknown, { userId }: { userId: string }) => {
      try {
        const user = await UserModel.findById(userId);
        const friends = user?.friends ?? [];
        const notFriends = await UserModel.find({
          _id: { $nin: [...friends, userId] },
        });
        return notFriends;
      } catch (error) {
        console.log(error);

        throw new GraphQLError("an error occured while fetching users");
      }
    },
    friends: async (_: unknown, { userId }: { userId: string }) => {
      try {
        const user = await UserModel.findById(userId);
        const friends = user?.friends ?? [];
        const _friends = await UserModel.find({
          _id: { $in: [...friends] },
        });
        console.log(_friends);
        return _friends;
      } catch (error) {
        console.log(error);

        throw new GraphQLError("an error occured while fetching users");
      }
    },
  },
  Mutation: {
    registerUser: async (_: unknown, { user }: { user: IUserRegisterDTO }) => {
      const password = await hashPassword(user.password);

      const newUser = await UserModel.insertOne({
        username: user.username,
        email: user.email,
        password,
      });
      console.log(newUser);

      return {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.username,
      };
    },

    addUser: async (
      _: unknown,
      { userId, user2Id,roomName }: { userId: string; user2Id: string, roomName:string }
    ) => {
      try {


        const addUser = await UserModel.findOneAndUpdate(
          { _id: userId },
          {
            $push: { friends: user2Id },
          }
        );

        if (!addUser) {
          throw new AppError("User not found", ErrorCode.NOT_FOUND);
        }

        const newConversation = await conversationModel.create({
          createdBy: userId,
           name:roomName,
          participants: [
            {
              user: user2Id
             
            },
            {
              user: userId,
            },
          ],
        });
        return {
          message: "Congrate!!!, You guys are now friends",
        };
      } catch (error) {
        console.log(error);
        throw new AppError(
          "Sorry an error occured on the server",
          ErrorCode.INTERNAL_SERVER_ERROR
        );
      }
    },
    removeUser: async (
      _: unknown,
      { userId, user2Id }: { userId: string; user2Id: string }
    ) => {
      try {
        const removedUser = await UserModel.findOneAndUpdate(
          { _id: userId },
          {
            $pull: { friends: user2Id },
          }
        );

        if (!removedUser) {
          throw new AppError("User not found", ErrorCode.NOT_FOUND);
        }
        // const deleteConversation = await conversationModel.deleteOne({
        //   createdBy: userId,
        //   participants:{
        //     user:user2Id
        //   }
        // })

        return {
          message: "Sorry, You guys are no longer friends",
        };
      } catch (error) {
        console.log(error);
        throw new AppError(
          "Sorry an error occured on the server",
          ErrorCode.INTERNAL_SERVER_ERROR
        );
      }
    },

    login: async (_: unknown, { user }: { user: ILoginDTO }) => {
      const userExist = await UserModel.findOne({ username: user.username });

      if (!userExist) {
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }

      const isCorrectPassword = await comparePassword(
        user.password,
        userExist.password
      );

      if (!isCorrectPassword) {
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }

      console.log(userExist);
      return {
        _id: userExist._id,
        username: userExist.username,
        email: userExist.email,
        status: userExist.status,
        profilePicture: userExist?.profilePicture || "",
      };
    },
  },
};
