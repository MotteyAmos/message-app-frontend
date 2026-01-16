import { PubSub, PubSubEngine } from "graphql-subscriptions";
import MessageModel from "../../../../db/module/message/message";
import { GraphQLError } from "graphql/error";
import { conversationModel } from "@/lib/db/module/message/conversationModel";

interface MessageArgument {
  messageInput: {
    content: string;
    senderId: string;
    roomId: string;
  };
}

const pubsub = new PubSub() as PubSubEngine;

export const messageResolver = {
  Query: {
    chatRooms: async (_: unknown, { userId }: { userId: string }) => {
      try {
  
       
        const chatRooms = await conversationModel.find({
          "participants.user": userId,
        }).populate("participants.user")
        .sort({ createdAt: -1 });
   
        return chatRooms;
      } catch (error) {
        console.log(error);
        throw new GraphQLError("Sorry an error occured on the server");
      }
    },
    chatRoom: async (_: unknown, { roomId }: { roomId: string }) => {
      try {
        const chatRoomMessages = await MessageModel.find({
            conversationId: roomId
        }).sort({createdAt:-1})

        return chatRoomMessages;

      } catch (error) {
        console.log(error);
        throw new GraphQLError("Sorry an error occured on the server");
      }
    },
  },

  Mutation: {
    createMessage: async (
      _: unknown,
      { messageInput: { content, senderId, roomId } }: MessageArgument
    ) => {
      try {
        const msg = await MessageModel.create({
          conversationId: roomId,
          senderId,
          content: content,
          messageType: "text",
        });

        if (!msg) {
          throw new GraphQLError(
            "Sorry an error occured while sending the message"
          );
        }

        pubsub.publish(`${roomId}`, {
          messageCreated: {
            content,
          },
        });

        return msg;
      } catch (error) {
        console.log(error);
        throw new GraphQLError("Sorry an error occured on the server");
      }
    },
  },

  Subscription: {
    messageCreated: {
      subscribe: (_: unknown, { roomId }: { roomId: string }) =>
        pubsub.asyncIterableIterator(`${roomId}`),
    },
  },
};
