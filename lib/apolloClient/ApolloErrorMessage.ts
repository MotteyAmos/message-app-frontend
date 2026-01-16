import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
  LocalStateError,
  ServerError,
  ServerParseError,
  UnconventionalError,
} from "@apollo/client/errors";


export function getErrorMessage(error: unknown ) {

  if (CombinedGraphQLErrors.is(error)) {
    console.log("1",error)
    return {error}?.error?.errors?.[0]?.message|| 'Something went wrong'
    // Handle GraphQL errors
  } else if (CombinedProtocolErrors.is(error)) {
    console.log("1", error)
    return "Sorry an error occured"
    // Handle multipart subscription protocol errors
  } else if (LocalStateError.is(error)) {
    console.log("2", error)
    return "Sorry an error occured"
    // Handle errors thrown by the `LocalState` class
  } else if (ServerError.is(error)) {
    console.log("3", error)
    return "Sorry an error occured"
    // Handle server HTTP errors
  } else if (ServerParseError.is(error)) {
    console.log("4", error)
    return "Sorry an error occured"
    // Handle JSON parse errors
  } else if (UnconventionalError.is(error)) {
    console.log("5", error)
    return "Sorry an error occured"
    // Handle errors thrown by irregular types
  } else {
    console.log("6", error)

    return "Check your internet connection and try again"
    // Handle other errors
  }
}