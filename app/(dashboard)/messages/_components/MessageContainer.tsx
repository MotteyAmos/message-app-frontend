import Image from "next/image";
import React, { useEffect } from "react";
import MessageInputBox from "@/components/message/MessageInputBox";
// import { useSubscription } from "@apollo/client";
import { GET_CHATROOM_MESSAGES_SUBSCRIPTION, GET_SINGLE_CHATROOM } from "@/lib/apolloClient/clientQuerys";
import { useQuery } from "@apollo/client/react";
const messages = [
  {
    id: 1,
    text: "Hey! How's it going?",
    sender: "friend",
    timestamp: "2024-01-15T10:30:00Z",
    isMine: false,
    status: "delivered",
    image:
      "https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg",
  },
  {
    id: 2,
    text: "I'm good! Just finished that project we were talking about",
    sender: "me",
    timestamp: "2024-01-15T10:31:15Z",
    isMine: true,
    status: "read",
  },
  {
    id: 3,
    text: "That's awesome! How did it turn out?",
    sender: "friend",
    timestamp: "2024-01-15T10:32:00Z",
    isMine: false,
    status: "delivered",
  },
  {
    id: 4,
    text: "Really well! The client loved the design. Want to see some screenshots?",
    sender: "me",
    timestamp: "2024-01-15T10:32:45Z",
    isMine: true,
    status: "read",
  },
  {
    id: 5,
    text: "Yes please! I'd love to see them",
    sender: "friend",
    timestamp: "2024-01-15T10:33:20Z",
    isMine: false,
    status: "delivered",
  },
  {
    id: 6,
    text: "Here's the dashboard design I was working on",
    sender: "me",
    timestamp: "2024-01-15T10:34:00Z",
    isMine: true,
    status: "read",
    attachment: {
      type: "image",
      url: "/screenshots/dashboard.png",
      name: "dashboard-design.png",
    },
  },
  {
    id: 7,
    text: "Wow, that looks amazing! The color scheme is perfect",
    sender: "friend",
    timestamp: "2024-01-15T10:35:30Z",
    isMine: false,
    status: "delivered",
  },
  {
    id: 8,
    text: "Thanks! I was thinking we could collaborate on the next phase",
    sender: "me",
    timestamp: "2024-01-15T10:36:10Z",
    isMine: true,
    status: "read",
  },
  {
    id: 9,
    text: "Definitely! When are you free to discuss?",
    sender: "friend",
    timestamp: "2024-01-15T10:36:45Z",
    isMine: false,
    status: "delivered",
  },
  {
    id: 10,
    text: "How about tomorrow at 2 PM?",
    sender: "me",
    timestamp: "2024-01-15T10:37:20Z",
    isMine: true,
    status: "sent",
  },
  {
    id: 11,
    text: "How about tomorrow at 2 PM?",
    sender: "me",
    timestamp: "2024-01-15T10:37:20Z",
    isMine: true,
    status: "sent",
  },
  {
    id: 12,
    text: "How about tomorrow at 2 PM?",
    sender: "me",
    timestamp: "2024-01-15T10:37:20Z",
    isMine: true,
    status: "sent",
  },
];

interface props{
    roomId:string
}
export default function MessageContainer({roomId}:props) {
  //   const { data, loading } = useSubscription(GET_CHATROOM_MESSAGES_SUBSCRIPTION , {
  //   variables: { roomId },
  // });

   const { subscribeToMore, ...result } = useQuery(GET_SINGLE_CHATROOM, {
    variables: { roomId},
  });


  useEffect(() => {
    // This assumes you want to wait to start the subscription
    // after the query has loaded.
    if (result.data) {
      const unsubscribe = subscribeToMore({
        document:GET_CHATROOM_MESSAGES_SUBSCRIPTION,
        variables: {roomId },
        updateQuery: (prev, { subscriptionData }: any) => {
          if (!subscriptionData.data) return prev;

          const newFeedItem = subscriptionData.data.messageCreated;
          console.log("New message received via subscription:", newFeedItem);
          // return Object.assign({}, prev, {
          //   me: {
          //     comments: [newFeedItem, ...prev.post.comments],
          //   },
          // });
        },
      });
      return () => {
        unsubscribe();
      };
    }
  }, [result.data, roomId, subscribeToMore]);

  return (
    <div className=" grow basis-9/13 min-h-[calc(100vh-15.5vh)] shrink flex flex-col relative  overflow-y-auto    ">
      <div className="flex grow flex-col-reverse basis-4/5   p-4 gap-3  ">
     
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.isMine ? "justify-end" : "justify-start"
            }`}
          >
            {/* Friend avatar (left side only) */}
            {!msg.isMine && msg.image && (
              <img
                src={msg.image}
                alt="avatar"
                className="w-8 h-8 rounded-full mr-2 self-end"
              />
            )}

            {/* Message bubble */}
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm ${
                msg.isMine
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>

              {/* Timestamp + status */}
              <div
                className={`mt-1 text-[10px] flex justify-end gap-1 ${
                  msg.isMine ? "text-blue-100" : "text-gray-400"
                }`}
              >
                <span>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {msg.isMine && <span>✓✓</span>}
              </div>
            </div>
          </div>
        ))}
      
      </div>

      <div className="w-full basis-1/5 flex justify-center items-center">
        <MessageInputBox />
      </div>
    </div>
  );
}
