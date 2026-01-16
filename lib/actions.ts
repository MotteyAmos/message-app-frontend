"use server"
import { revalidatePath } from "next/cache"


export  const revalidateFriendsPath =async ()=>{
    revalidatePath("/Users")
}

