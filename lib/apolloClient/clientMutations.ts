"use client";

import { gql } from "@apollo/client";
export const REGISTER_USER = gql`
  mutation RegisterUser($user: UserDTO!) {
    registerUser(user: $user) {
      _id
      username
      status
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($user: LoginDTO) {
    login(user: $user) {
      _id
      username
      status
      profilePicture
    }
  }
`;


export const ADD_A_FRIEND = gql`
  mutation ADD_FRIEND($userId:ID!, $user2Id:ID!,$roomName:String){
    addUser(userId:$userId, user2Id:$user2Id, roomName:$roomName){
      message
    }
  }
`


export const REMOVE_A_FRIEND = gql`
  mutation REMOVE_FRIEND($userId:ID!, $user2Id:ID!){
    removeUser(userId:$userId, user2Id:$user2Id){
      message
    }
  }
`

export const CREATE_MESSAGE = gql`
mutation Mutation($messageInput: MessageInput) {
  createMessage(messageInput: $messageInput) {
    content
  
  }
} `;