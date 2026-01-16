import { ErrorCode } from "@/lib/types/enums";
import { GraphQLError } from "graphql";


export class AppError extends GraphQLError {
    constructor(message:string, code:ErrorCode, details?:Record<string, unknown>){
        super(message,{
            extensions:{
                code,
                details
            }
        })
    }
}


