import { ErrorMessage } from "@client/types";

export const getErrorMessage = (errorMessage: ErrorMessage) => {
  switch (errorMessage) {
    case "LOGIN_INVALID":
      return "Invalid email or password";
    default:
      return "";
  }
};
