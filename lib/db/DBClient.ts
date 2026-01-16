import mongoose from "mongoose";


// Moving on passing of DBClient connection to context

export const DBClient =async ()=>{

    try{
        await mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);
        console.log("Connected to mongo db");
    }catch(error){
        console.log("Error connecting to the db", error);
        process.exit(1)
    }
}