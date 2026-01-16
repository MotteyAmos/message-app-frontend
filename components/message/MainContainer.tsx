import Image from "next/image";
import React from "react";
import MessageInputBox from "./MessageInputBox";

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

export default function MainContainer() {
  return (
    <div className="flex-9/12  relative border border-muted overflow-y-auto  h-[83%] bg-red-600 ">
      <div className="flex flex-col-reverse h-full  p-4 gap-3  ">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${
              message.isMine ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full border overflow-hidden
              `}
            >
              <Image
                src={
                  message.isMine
                    ? `https://t4.ftcdn.net/jpg/15/53/90/79/240_F_1553907997_dfGSUjhXwmVZX16jvwQ8a1cQIpfTR48z.jpg`
                    : "https://img.freepik.com/free-photo/serious-young-african-man-standing-isolated_171337-9633.jpg"
                }
                height={100}
                width={100}
                alt="profile pic"
                unoptimized
                className=" object-cover object-center h-full "
              />
            </div>

            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                message.isMine
                  ? "bg-[#098ab5] text-white rounded-br-md"
                  : "bg-[#17334a] text-white-800 rounded-bl-md"
              }`}
            >
              <p className="text-sm break-words">{message.text}</p>

              <div
                className={`flex items-center gap-1 mt-1 ${
                  message.isMine ? "justify-end" : "justify-start"
                }`}
              >
                <span
                  className={`text-xs ${
                    message.isMine ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                {/* Message Status Indicator */}
                {message.isMine && (
                  <span className="text-xs text-blue-100">
                    {message.status === "read"
                      ? "✓✓"
                      : message.status === "delivered"
                      ? "✓✓"
                      : "✓"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <MessageInputBox />
      </div>
    </div>
  );
}
