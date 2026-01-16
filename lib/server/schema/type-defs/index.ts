import { mergeTypeDefs } from "@graphql-tools/merge";
import { UsertypeDef } from "./auth/user";
import { MessageTypeDef } from "./message/message";


export const mergedTypeDefs = mergeTypeDefs([
  UsertypeDef,
 MessageTypeDef
]);
