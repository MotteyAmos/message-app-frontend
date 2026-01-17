'use client'

import { ApolloClient, HttpLink, InMemoryCache,ApolloLink, gql } from "@apollo/client";
import { OperationTypeNode } from "graphql";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { makeVar } from "@apollo/client";
import { Ifriends, INotfriends } from "../types/generalTyps";



console.log(process.env.SERVER_URL)
const httpLink = new HttpLink({
  uri: `http://localhost:4500/graphql`,
  credentials: "include",
});


const wsLink = new GraphQLWsLink(
  createClient({
    url:  `ws://localhost:4500/graphql`,
    connectionParams: {
      authToken: "user token goes here",
    },
    
  })
);

const splitLink = ApolloLink.split(
  ({ operationType }) => {
    return operationType === OperationTypeNode.SUBSCRIPTION;
  },
  wsLink,
  httpLink
);


const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),

});

export default apolloClient;


export const loginUserVar = makeVar("");

export const chatRoomsVar = makeVar("");

export const friendsData = makeVar<Ifriends["friends"]>([]);

export const notFriendsData = makeVar<INotfriends["notFriends"]>([]);