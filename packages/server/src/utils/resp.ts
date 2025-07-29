import { Result } from "@come/common";

export function okRes<T = unknown>(data?: T): Result<T> {
  return {
    success: true,
    data,
  };
}

export function errRes<T = unknown>(
  err?: string | object,
  data?: T,
): Result<T> {
  let errMsg: string | undefined;
  if (typeof err === "string") {
    errMsg = err;
  } else if (typeof err === "object") {
    errMsg = err.toString();
  } else {
    errMsg = undefined;
  }

  return {
    success: false,
    err_msg: errMsg,
    data: data,
  };
}
