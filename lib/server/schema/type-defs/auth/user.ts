

export const UsertypeDef = `#graphql
    scalar Date
    scalar DateTime
    scalar Time
    enum Status {
        ONLINE
        OFFLINE
    }
    type User{
        _id: ID!
        username: String!
        email: String!
        status: Status
        lastSeen: DateTime
        profilePicture: String
    }

    input UserDTO{
        username: String!
        email: String!
        password: String!
    }

    input LoginDTO{
        username:String!
        password:String!
    }

    type SuccessMessage{
        message: String!

    }
    
    type Query{
        user(userId:ID!):User
        users: [User]
        notFriends(userId:ID!): [User]
        friends(userId:ID!): [User]
    }

    
    type Mutation{
        registerUser(user: UserDTO!): User
        login(user:LoginDTO):User
        addUser(userId:ID!, user2Id:ID!,roomName:String): SuccessMessage
        removeUser(userId:ID!, user2Id:ID!): SuccessMessage
    }

   

`