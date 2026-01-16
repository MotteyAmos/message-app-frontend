"use client";

import { gql } from "@apollo/client";

export const GET_ALL_CHATROOMS = gql`
  query Messages($userId: ID!) {
    chatRooms(userId: $userId) {
      isGroup
      name
      _id
      participants {
        user {
          _id
          username
        }
      }
    }
  }
`;

export const GET_SINGLE_CHATROOM = gql`
query ChatRoom($chatRoomRoomId2: ID!) {
  chatRoom(roomId: $chatRoomRoomId2) {
    content
    sender
  }
}`;

export const GET_CHATROOM_MESSAGES_SUBSCRIPTION = gql`
subscription Subscription($roomId: ID!) {
  messageCreated(roomId: $roomId) {
    content
    editedAt
    isDeleted
  }
}
`;

export const GET_LOGGED_IN_USER = gql`
  query GetLoggedInUser {
    loggedInUser @client {
      _id
      username
    }
  }
`;

export const GET_NOT_FRIENDS = gql`
    query GetNotFriends($userId:ID!){
        notFriends(userId: $userId){
            _id
            username
            profilePicture
        }
        
    }
`

export const GET_FRIENDS = gql`
    query GetFriends($userId:ID!){
        friends(userId: $userId){
            _id
            username
            profilePicture
        }
        
    }
`
