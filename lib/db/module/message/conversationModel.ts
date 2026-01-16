import { IConversation } from "@/lib/types/generalTyps";
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema<IConversation>(
  {
    isGroup: { type: Boolean, default: false },
    name: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    participants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, default: "MEMBER" }, // admin, member
        joinedAt: { type: Date, default: Date.now },
      },
    ],
     messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Message"
  }]
  },
 
  { timestamps: true }
);

export const conversationModel =   mongoose.models.Conversation ||  mongoose.model<IConversation>("Conversation", conversationSchema);


