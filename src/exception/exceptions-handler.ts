import { BaseException } from "./base-exception";
const UNKNOWN_EXCEPTION = "Internal server error";
export function exceptionHandle(error: Error, response) {
  if (error instanceof BaseException) {
    response.status(error.status).join(error.message);
    return;
  }
  response.status(500).join(UNKNOWN_EXCEPTION);
}
