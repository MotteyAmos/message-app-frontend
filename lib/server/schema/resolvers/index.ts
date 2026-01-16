import { mergeResolvers } from "@graphql-tools/merge";
import { IResolvers } from "@graphql-tools/utils";
import { DateScalar, TimeScalar, DateTimeScalar } from "graphql-date-scalars";
import {userResolver} from "./auth/user"
import { messageResolver } from "./message/message";



export const mergedResolvers: IResolvers = mergeResolvers([
  {
    Date: DateScalar,
    Time: TimeScalar,
    DateTime: DateTimeScalar,
  },
 userResolver,
 messageResolver
]);
