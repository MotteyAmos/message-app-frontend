

export const MessageTypeDef = `#graphql

    type Conversation{
        _id: ID!
        isGroup:Boolean
        name: String
        createdBy: User
        participants:[Participant]
        messages:[Message]
    }

    enum ROLE{
        MEMBER
        ADMIN 
    }

    type Participant{
        user: User 
        role: ROLE
        joinedAt: DateTime
    }
    type Message{
        sender: ID
        content:String!
        replyTo: ID
        isDeleted: Boolean
        editedAt: DateTime
    }

    input MessageInput{
        content:String!
        senderId:ID!
        roomId:ID!
    }

    type Query{
   
        chatRooms(userId:ID!): [Conversation]
        chatRoom(roomId:ID!): [Message]

    }
    type Mutation{
        createMessage(messageInput: MessageInput): Message!
    }

    type Subscription{
        messageCreated(roomID:ID!): Message
    }
`