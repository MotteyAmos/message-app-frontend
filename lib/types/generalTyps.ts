import { Role, Status } from "./enums";
import mongoose from "mongoose";

export interface IUserBase {
  _id: string;
  username: string;
  email: string;
  status: Status;
  lastSeen: Date;
  profilePicture: string;
}
export interface IUser extends IUserBase {
  friends: mongoose.Types.ObjectId[];
  password: string;
}

export interface INotfriends {
  notFriends: {
    _id: string;
    username: string;
    profilepicture: string;
  }[];
}

export interface IRemoveUserResponse {
  removeUser: {
    message: string;
  };
}
export interface Ifriends {
  friends: {
    _id: string;
    username: string;
    profilepicture: string;
  }[];
}

export interface IUserRegisterDTO {
  username: string;
  email: string;
  password: string;
}

export interface IConversation extends mongoose.Document {
  isGroup: boolean;
  name: string;
  createdBy: mongoose.Types.ObjectId;
  participants: {
    user: mongoose.Types.ObjectId;
    role: Role;
    joinedAt: Date;
  }[];
  messages: mongoose.Types.ObjectId[];
}

export interface ILoginDTO {
  username: string;
  password: string;
}

export interface ILoginUser {
  login: {
    profile: string;
    status: Status;
    username: string;
    _id: string;
  };
}

export interface IChatRooms {
  chatRooms: {
    _id: string;
    isGroup: boolean;
    name: string;
    createdBy: IUserBase;
    participants: IUserBase[];
  }[];
}

export interface IMessage {
  _id: string;
  content: string;
  senderId: string;
  createdAt: string;
}

export interface IChatRoomMessages {
  chatRoom: IMessage[];
}
