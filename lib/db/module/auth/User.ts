import { Status } from "@/lib/types/enums"
import { IUser } from "@/lib/types/generalTyps"
import mongoose, {Schema} from "mongoose"




const userSchema = new Schema<IUser>({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require: true,
        unique:true
    },
    status:{
        type: String,
        enum:  Object.values(Status),
        default: Status.ONLINE
    },
    password:{
        type:String,
        required:true
    },
    lastSeen:{
        type: Date
    },
    profilePicture: {
        type:String
    },
    friends: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"         
        }
    ]
},
{
    timestamps:true
})


const UserModel =  mongoose.models.User ||  mongoose.model<IUser>("User", userSchema);



export default UserModel;